import { NextResponse } from "next/server";

export async function POST(req) {
    const response = NextResponse.json(
        { message: "Logout berhasil" },
        { status: 200 }
    );

    // Hapus cookie token
    response.cookies.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0, // Expire immediately
        path: "/",
    });

    return response;
}