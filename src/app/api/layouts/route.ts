import { NextResponse } from "next/server";
import { listPrices } from "@/lib/supabase-actions";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const prices = await listPrices();
    const layouts = prices.map((p) => ({
      id: p.layoutId,
      name: p.name ?? p.layoutId,
      description: p.description ?? "",
      price: Number(p.layoutPrice),
      photos: p.photos ?? 0,
    }));
    return NextResponse.json({ layouts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load layouts" }, { status: 500 });
  }
}
