import { db } from "../../../lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const { nama, kelas, email, phone, password } = body;

        // Validasi input
        if (!nama || !kelas || !email || !phone || !password) {
            return NextResponse.json(
                { error: "Semua field wajib diisi!" },
                { status: 400 }
            );
        }

        // Cek email sudah ada
        const [rows] = await db.execute(
            "SELECT email FROM users WHERE email = ?",
            [email]
        );

        if (rows.length > 0) {
            return NextResponse.json(
                { error: "Email sudah terdaftar" },
                { status: 400 }
            );
        }

        // Hash password
        const hashed = await bcrypt.hash(password, 10);

        // Insert ke database
        await db.execute(
            "INSERT INTO users (nama, kelas, email, phone, password) VALUES (?, ?, ?, ?, ?)",
            [nama, kelas, email, phone, hashed]
        );

        return NextResponse.json(
            { success: true, message: "Registrasi berhasil!" },
            { status: 201 }
        );

    } catch (err) {
        console.error("Error registrasi:", err);
        return NextResponse.json(
            { error: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}