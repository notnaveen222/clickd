import { readSessionId, setSessionCookie } from "@/lib/session";
import { BUCKET, supabaseAdmin } from "@/lib/supabaseAdmin";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

function sanitize(name: string) {
  const parts = name.split(".");
  const ext = parts.length > 1 ? parts.pop()!.toLowerCase() : "jpg";
  const base = parts
    .join(".")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base || "file"}.${ext || "jpg"}`;
}

export async function POST(request: NextRequest) {
  try {
    const { filename } = (await request.json()) as { filename: string };
    if (!filename)
      return NextResponse.json({ error: "filename required" }, { status: 400 });

    let sid = await readSessionId();
    const createdNow = !sid;
    if (!sid) sid = randomUUID();

    const path = `temp/${sid}/${randomUUID().slice(0, 8)}_${sanitize(
      filename
    )}`;
    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET)
      .createSignedUploadUrl(path);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    const res = NextResponse.json({
      path: data.path,
      token: data.token,
      expiresInSeconds: 7200,
    });
    if (createdNow) await setSessionCookie(res, sid);
    return res;
  } catch (e: unknown) {
    return NextResponse.json(
      {
        error:
          e && typeof e === "object" && "message" in e
            ? String((e as { message: string }).message)
            : "Error when creating temporary storage in bucket",
      },
      { status: 500 }
    );
  }
}
