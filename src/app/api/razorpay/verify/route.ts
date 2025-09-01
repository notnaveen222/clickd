import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";
import { confirmUploadedPhotos } from "@/lib/supabase-actions";
import { readSessionId } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      client_order_id,
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 1) compute HMAC(order_id|payment_id)
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(body)
      .digest("hex");

    const verified = crypto.timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(razorpay_signature, "hex")
    );

    // 2) update order row
    const sid = await readSessionId();
    const update = verified
      ? {
          razorpay_payment_id,
          razorpay_signature_client: razorpay_signature,
          signature_verified: true,
          status: "PAID",
          paid_at: new Date().toISOString(),
        }
      : {
          razorpay_payment_id,
          razorpay_signature_client: razorpay_signature,
          signature_verified: false,
          status: "FAILED",
        };
    if (verified && sid) {
      await confirmUploadedPhotos({
        sessionId: sid,
        clientOrderId: client_order_id,
      });
    }
    const { error } = await supabase
      .from("orders")
      .update(update)
      .eq("razorpay_order_id", razorpay_order_id);

    if (error) {
      return NextResponse.json({ error: "DB update failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: verified });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
