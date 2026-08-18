import { NextResponse } from "next/server";

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_MESSAGE = "admin-authenticated";
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

async function hmacHex(secret: string, message: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getExpectedToken() {
  return hmacHex(process.env.ADMIN_PASS ?? "", SESSION_MESSAGE);
}

export function verifyAdminCredentials(username: string, password: string) {
  return (
    username === (process.env.ADMIN_USER ?? "") &&
    password === (process.env.ADMIN_PASS ?? "")
  );
}

export async function isValidAdminSessionToken(token: string | undefined) {
  if (!token) return false;
  return token === (await getExpectedToken());
}

export async function setAdminSessionCookie(res: NextResponse) {
  res.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: await getExpectedToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export function clearAdminSessionCookie(res: NextResponse) {
  res.cookies.delete(ADMIN_SESSION_COOKIE);
}
