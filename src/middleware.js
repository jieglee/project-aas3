import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export function middleware (req) {
    const token = req.cookies.get("token");
    const path = req.nextUrl.pathname;

    const isLoginPage = path.startsWith("/login");

    const isProtected =
    path.startsWith("/Admin") ||
    path.startsWith("/user");

    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token && isLoginPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    const value = jwt.decode(token.value);

    if (path.startsWith("/Admin") && value.role !== 'admin') {
        console.log(token.role)
        return NextResponse.redirect(new URL("/user/home", req.url));
    }

    if (path.startsWith("/user") && value.role !== 'user') {
        console.log(token.role)
        return NextResponse.redirect(new URL("/Admin/Dashboard", req.url));
    }

    return NextResponse.next();

}

export const config = {
    matcher: [
    '/Admin/:path*',
    '/user/:path*',
],
}
