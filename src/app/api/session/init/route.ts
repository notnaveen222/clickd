import { NextResponse } from "next/server";
import { setNewSessionCookie } from "@/lib/session";
import { randomUUID } from "crypto";

export async function GET() {
  const res = NextResponse.json({});
  const sid = randomUUID();
  await setNewSessionCookie(res, sid);
  return res;
}
