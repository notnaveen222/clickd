import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const SESSION_COOKIE = "order_session_id";

export async function readSessionId() {
  const jar = await cookies();
  return jar.get(SESSION_COOKIE)?.value;
}

export async function setNewSessionCookie(res: NextResponse, sid: string) {
  const jar = await cookies();
  if (jar.get(SESSION_COOKIE)) {
    jar.delete(SESSION_COOKIE);
  }
  res.cookies.set({
    name: SESSION_COOKIE,
    value: sid,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}
