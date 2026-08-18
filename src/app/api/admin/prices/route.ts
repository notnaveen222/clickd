import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getLayoutPrices, updateLayoutPrice } from "@/lib/supabase-actions";
import { logAudit } from "@/lib/audit-log";

export const runtime = "nodejs";

const patchSchema = z.object({
  layoutId: z.string().min(1),
  layoutPrice: z.number().positive(),
});

export async function PATCH(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { layoutId, layoutPrice } = parsed.data;
  const existing = await getLayoutPrices();
  const before = existing.find((p) => p.layoutId === layoutId);
  if (!before) {
    return NextResponse.json({ error: "Unknown layoutId" }, { status: 404 });
  }

  const result = await updateLayoutPrice(layoutId, layoutPrice);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  await logAudit({
    action: "price.updated",
    actor: "admin",
    target: layoutId,
    metadata: { oldPrice: before.layoutPrice, newPrice: layoutPrice },
  });

  return NextResponse.json({ ok: true, price: result.price });
}
