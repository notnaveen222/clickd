import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const SESSION_COOKIE = "order_session_id";

export async function readSessionId() {
  const jar = await cookies();
  return jar.get(SESSION_COOKIE)?.value;
}

export async function setSessionCookie(res: NextResponse, sid: string) {
  res.cookies.set({
    name: SESSION_COOKIE,
    value: sid,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    // maxAge: 60 * 60 * 24, // optional: 1 day
  });
}
