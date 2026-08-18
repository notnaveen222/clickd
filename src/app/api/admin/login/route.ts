import { NextRequest, NextResponse } from "next/server";
import { setAdminSessionCookie, verifyAdminCredentials } from "@/lib/admin-auth";
import { logAudit } from "@/lib/audit-log";

function getClientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const username = body?.username ?? "";
  const password = body?.password ?? "";
  const ip = getClientIp(req);

  if (!verifyAdminCredentials(username, password)) {
    await logAudit({
      action: "admin.login_failed",
      actor: username || "unknown",
      metadata: { ip },
    });
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await logAudit({
    action: "admin.login_success",
    actor: username,
    metadata: { ip },
  });

  const res = NextResponse.json({ ok: true });
  await setAdminSessionCookie(res);
  return res;
}
