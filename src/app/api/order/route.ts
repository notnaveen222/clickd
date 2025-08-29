import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { layout, quantity } = body;
  const total_inr = layout.price * quantity;

  const orderPayload = { ...body, layout: layout.name, total_inr: total_inr };
  const { data, error } = await supabase
    .from("orders")
    .insert([orderPayload])
    .select();

  if (error) {
    console.error("Error inserting order:", error);
    return null;
  }
  console.log(data?.[0]);
  return NextResponse.json({
    message: "Okay",
  });
}
