import { NextResponse } from "next/server";

export function middleware (req) {
    const token = req.cookies.get("user");
    const path = req.nextUrl.pathname;

    const isLoginPage = path.startsWith("/login");

    const isProtected =
    path.startsWith("/admin") ||
    path.startsWith("/user");

    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token && isLoginPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (path.startsWith("/admin") && token.role !== 'admin') {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();

}

export const config = {
    matcher: [
    '/admin/:path*',
    '/user/:path*',
],
}
