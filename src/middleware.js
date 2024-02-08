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
