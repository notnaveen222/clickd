import { NextResponse } from "next/server";
import { readSessionId, setSessionCookie } from "@/lib/session";
import { randomUUID } from "crypto";

export async function GET() {
  let sid = await readSessionId();
  const res = NextResponse.json({ sessionId: sid ?? "" });
  if (!sid) {
    sid = randomUUID();
    setSessionCookie(res, sid);
  }
  return res;
}
