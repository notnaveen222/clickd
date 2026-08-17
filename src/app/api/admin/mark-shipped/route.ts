import { sendShippedMail } from "@/lib/nodemailer-actions";
import { markOrderShipped } from "@/lib/supabase-actions";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { orderId, toEmail } = await request.json();
    if (!orderId) {
      return NextResponse.json(
        { ok: false, message: "Order ID Required to mark it shipped" },
        { status: 400 }
      );
    }

    // Mark shipped in the DB first — this must succeed regardless of
    // whether the notification email goes out afterwards.
    const result = await markOrderShipped(orderId);
    if (!result?.ok) {
      return NextResponse.json(
        { ok: false, message: "Failed to mark shipped" },
        { status: 500 }
      );
    }

    let message = "Order marked as shipped";
    if (toEmail) {
      try {
        await sendShippedMail(toEmail, orderId);
      } catch (error) {
        console.error("Failed to send shipped mail:", error);
        message = "Marked shipped, but the notification email failed to send";
      }
    }

    return NextResponse.json({ ok: true, message });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON body" },
      { status: 400 }
    );
  }
}
