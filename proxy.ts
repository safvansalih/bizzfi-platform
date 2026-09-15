import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((request) => {
  const pathname = request.nextUrl.pathname;

  // Admin login page must remain publicly accessible
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const isLoggedIn = !!request.auth;
  const isAdmin = request.auth?.user?.role === "ADMIN";

  if (!isLoggedIn || !isAdmin) {
    const loginUrl = new URL(
      "/admin/login",
      request.nextUrl.origin
    );

    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};