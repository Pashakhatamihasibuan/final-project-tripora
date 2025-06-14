import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  // Jika tidak ada token, redirect ke login dengan callbackUrl
  if (!token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Melindungi halaman profil, keranjang, dan booking
  matcher: ["/profile/:path*", "/cart/:path*", "/activities/:id/book"],
};
