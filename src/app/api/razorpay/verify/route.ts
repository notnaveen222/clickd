import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import crypto from "crypto";
import { confirmUploadedPhotos } from "@/lib/supabase-actions";
import { readSessionId } from "@/lib/session";
import { sendConfirmationMail } from "@/lib/nodemailer-actions";

export const runtime = "nodejs";

function verifySignature(orderId: string, paymentId: string, signature: string) {
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const expectedBuf = Buffer.from(expected, "hex");
  const signatureBuf = Buffer.from(signature, "hex");
  if (expectedBuf.length !== signatureBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, signatureBuf);
}

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      client_order_id,
      email,
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const verified = verifySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

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

    // Update the order's payment status first — this must succeed regardless
    // of whether the confirmation email goes out afterwards.
    const { error } = await supabaseAdmin
      .from("orders")
      .update(update)
      .eq("razorpay_order_id", razorpay_order_id);

    if (error) {
      return NextResponse.json({ error: "DB update failed" }, { status: 500 });
    }

    let emailError: string | null = null;
    if (verified) {
      const sid = await readSessionId();
      if (sid) {
        const res = await confirmUploadedPhotos({
          sessionId: sid,
          clientOrderId: client_order_id,
        });
        if (res.success && email) {
          try {
            await sendConfirmationMail(email, client_order_id);
          } catch (err) {
            console.error("Failed to send confirmation mail:", err);
            emailError = "Order confirmed, but the confirmation email failed to send";
          }
        }
      }
    }

    return NextResponse.json({ ok: verified, emailError });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
