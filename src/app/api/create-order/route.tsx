import { supabase } from "@/lib/supabase";
import { generateClientOrderId } from "@/lib/supabase-actions";
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
    const { layout, quantity } = body;
    const total_inr_rs = Number(layout.price) * Number(quantity);
    const client_order_id = await generateClientOrderId();
    const orderPayload = {
      ...body,
      layout: layout.name,
      total_inr: total_inr_rs,
      client_order_id: client_order_id,
    };

    const { data: sbData, error: sbError } = await supabase
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
      //   receipt: String(sbData[0].id),
      //   notes: { layout: layout.name, qty: String(quantity) },
    });
    await supabase
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
