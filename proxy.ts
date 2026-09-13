import { auth } from "@/auth";

export default auth((request) => {
  const pathname = request.nextUrl.pathname;

  // Login page must remain publicly accessible.
  if (pathname === "/admin/login") {
    return;
  }

  const isLoggedIn = !!request.auth;
  const isAdmin = request.auth?.user?.role === "ADMIN";

  if (!isLoggedIn || !isAdmin) {
    const loginUrl = new URL("/admin/login", request.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);

    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};