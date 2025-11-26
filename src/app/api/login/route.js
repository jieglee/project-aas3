import { db } from "../../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this-in-production";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        // Validasi input
        if (!email || !password) {
            return NextResponse.json(
                { message: "Email dan password harus diisi!" },
                { status: 400 }
            );
        }

        // Cari user berdasarkan email
        const [rows] = await db.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return NextResponse.json(
                { message: "Email tidak ditemukan!" },
                { status: 400 }
            );
        }

        const user = rows[0];

        // Cek password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return NextResponse.json(
                { message: "Password salah!" },
                { status: 400 }
            );
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email,
                role: user.role 
            },
            JWT_SECRET,
            { expiresIn: '7d' } // Token berlaku 7 hari
        );

        // Login berhasil
        return NextResponse.json(
            {
                message: "Login berhasil!",
                token: token,
                user: {
                    id: user.id,
                    nama: user.nama,
                    email: user.email,
                    role: user.role,
                    kelas: user.kelas,
                    phone: user.phone
                },
            },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error login:", err);
        return NextResponse.json(
            { message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}