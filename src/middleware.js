import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function authMiddleware(req) {
  const path = req.nextUrl.pathname;
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (session) {
    if (path === "/login") {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  } else {
    if (path === "/login") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * - any png files
   */
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
