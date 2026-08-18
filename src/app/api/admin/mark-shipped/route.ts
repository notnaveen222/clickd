import { logAudit } from "@/lib/audit-log";
import { sendShippedMail } from "@/lib/nodemailer-actions";
import { markOrderShipped } from "@/lib/supabase-actions";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const { orderId, toEmail } = await request.json();
    if (!orderId) {
      return NextResponse.json({
        message: "Order ID Required to mark it shipped",
      });
    }
    const result = await markOrderShipped(orderId);
    if (!result?.ok) {
      return NextResponse.json(
        { ok: false, message: "Failed to mark shipped" },
        { status: 500 }
      );
    }

    await logAudit({
      action: "order.shipped",
      actor: "admin",
      target: orderId,
      metadata: { toEmail },
    });

    try {
      await sendShippedMail(toEmail, orderId);
    } catch (error) {
      console.error("Failed to send shipped email:", error);
      return NextResponse.json({
        ok: true,
        message: "Marked shipped, but email failed to send",
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON body", error: err },
      { status: 400 }
    );
  }
}
