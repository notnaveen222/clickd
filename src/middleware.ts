import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

export function middleware(req: NextRequest) {
  const auth = req.headers.get("authorization") ?? "";
  const expected =
    "Basic " + btoa(`${process.env.ADMIN_USER}:${process.env.ADMIN_PASS}`);

  if (auth !== expected) {
    return new NextResponse("Auth required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
    });
  }
  return NextResponse.next();
}
