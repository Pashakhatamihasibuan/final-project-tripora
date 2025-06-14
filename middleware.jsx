import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    // Jika tidak ada token dan mencoba akses /cart, redirect ke login
    // dengan callbackUrl agar bisa kembali setelah login
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart/:path*", "/profile/:path*"], // Daftar rute yang dilindungi
};
