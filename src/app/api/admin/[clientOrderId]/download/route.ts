import { NextRequest } from "next/server";
import JSZip from "jszip";
import { supabaseAdmin, BUCKET } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ clientOrderId: string }> }
) {
  const { clientOrderId: rawClientOrderId } = await context.params;
  const clientOrderId = rawClientOrderId?.trim();
  if (!clientOrderId) {
    return new Response("Missing clientOrderId", { status: 400 });
  }

  const basePath = `orders/${clientOrderId}`;

  //list file
  const { data: items, error: listErr } = await supabaseAdmin.storage
    .from(BUCKET)
    .list(basePath, { sortBy: { column: "name", order: "asc" }, limit: 1000 });

  if (listErr) return new Response(listErr.message, { status: 500 });

  const files = (items ?? []).filter((i) => i.name && !i.name.endsWith("/"));
  if (files.length === 0) {
    return new Response("No files found for this order", { status: 404 });
  }

  //zip
  const zip = new JSZip();

  for (const f of files) {
    const path = `${basePath}/${f.name}`;
    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET)
      .download(path);

    if (error || !data) {
      // Put a tiny text file noting the failure; don't break the whole zip
      zip.file(
        `__error__/${f.name}.txt`,
        `Failed to fetch ${path}\n${error?.message ?? ""}`
      );
      continue;
    }

    const buf = Buffer.from(await data.arrayBuffer());
    zip.file(f.name, buf);
  }

  // 3) Return the zip
  const arrayBuffer = await zip.generateAsync({
    type: "arraybuffer",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  });

  return new Response(arrayBuffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${clientOrderId}-photos.zip"`,
      "Content-Length": String((arrayBuffer as ArrayBuffer).byteLength),
      "Cache-Control": "no-store",
    },
  });
}
