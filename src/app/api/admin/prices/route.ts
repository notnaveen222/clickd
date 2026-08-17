import { NextRequest, NextResponse } from "next/server";
import { listPrices, updatePrice } from "@/lib/supabase-actions";

export const runtime = "nodejs";

export async function GET() {
  try {
    const prices = await listPrices();
    return NextResponse.json({ prices });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load prices" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const layoutId = typeof body?.layoutId === "string" ? body.layoutId : "";
  if (!layoutId) {
    return NextResponse.json({ error: "layoutId required" }, { status: 400 });
  }

  const fields: { layoutPrice?: number; name?: string; description?: string } = {};

  if (body.layoutPrice !== undefined) {
    const n = Number(body.layoutPrice);
    if (!Number.isFinite(n) || n <= 0) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }
    fields.layoutPrice = n;
  }
  if (typeof body.name === "string" && body.name.trim()) fields.name = body.name.trim();
  if (typeof body.description === "string") fields.description = body.description;

  if (Object.keys(fields).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  try {
    const price = await updatePrice(layoutId, fields);
    return NextResponse.json({ price });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update price" }, { status: 500 });
  }
}
