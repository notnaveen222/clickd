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
    //domain then enable
    // try {
    //   await sendShippedMail(toEmail, orderId);
    // } catch (error) {
    //   return NextResponse.json(
    //     {
    //       ok: false,
    //       message: "Marked shipped, but email failed to send",
    //       error,
    //     },
    //     { status: 502 }
    //   );
    // }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON body" },
      { status: 400 }
    );
  }
}
