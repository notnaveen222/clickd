import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { generateClientOrderId, getLayoutPrice } from "@/lib/supabase-actions";
import { serverOrderSchema } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export const runtime = "nodejs";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = serverOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid order data",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
    const {
      name,
      email,
      phone,
      address,
      city,
      state,
      zipcode,
      additional_instructions,
      layout,
      quantity,
    } = parsed.data;
    const dbInr = await getLayoutPrice(layout.id);
    const total_inr_rs = Number(dbInr) * Number(quantity);
    const client_order_id = await generateClientOrderId();
    const orderPayload = {
      name,
      email,
      phone,
      address,
      city,
      state,
      zipcode,
      additional_instructions,
      quantity,
      layout: layout.name,
      total_inr: total_inr_rs,
      client_order_id: client_order_id,
      status: "ORDER_CREATED",
    };

    const { data: sbData, error: sbError } = await supabaseAdmin
      .from("orders")
      .insert([orderPayload])
      .select();

    if (sbError) {
      return NextResponse.json(
        {
          error: "Supabase DB Insert Failed",
        },
        { status: 500 }
      );
    }
    const sbOrderId = sbData ? sbData[0].id : null;
    const rpOrder = await razorpay.orders.create({
      amount: Math.round(total_inr_rs * 100),
      currency: "INR",
    });
    await supabaseAdmin
      .from("orders")
      .update({ razorpay_order_id: rpOrder.id, status: "PENDING_PAYMENT" })
      .eq("id", sbOrderId);
    return NextResponse.json({
      orderId: sbOrderId,
      client_order_id: client_order_id,
      razorpayOrderId: rpOrder.id,
      amount: Math.round(total_inr_rs * 100),
      currency: "INR",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
