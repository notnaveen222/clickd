import { NextResponse } from "next/server";
import { getLayoutPrices } from "@/lib/supabase-actions";

export const runtime = "nodejs";
export const revalidate = 0;

export async function GET() {
  const prices = await getLayoutPrices();
  const map = Object.fromEntries(prices.map((p) => [p.layoutId, p.layoutPrice]));
  return NextResponse.json({ prices: map });
}
