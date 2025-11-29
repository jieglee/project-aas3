import { db } from "../../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // ✅ PERUBAHAN 1: Import jwt (sebelumnya tidak ada)
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this-in-production";

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
        // ✅ PERUBAHAN 2: Ambil insertId untuk mendapatkan user.id yang baru dibuat
        const [result] = await db.execute(
            "INSERT INTO users (nama, kelas, email, phone, password) VALUES (?, ?, ?, ?, ?)",
            [nama, kelas, email, phone, hashed]
        );

        const userId = result.insertId; // ID user yang baru dibuat

        // ✅ PERUBAHAN 3: Generate JWT token setelah registrasi berhasil
        // Ini membuat user langsung login setelah registrasi
        const token = jwt.sign(
            { 
                userId: userId,
                email: email,
                role: 'user' // Default role untuk user baru
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // ✅ PERUBAHAN 4: Buat response object dengan data user
        const response = NextResponse.json(
            { 
                success: true, 
                message: "Registrasi berhasil!",
                token: token, // Return token ke client
                user: {
                    id: userId,
                    nama: nama,
                    email: email,
                    role: 'user',
                    kelas: kelas,
                    phone: phone
                }
            },
            { status: 201 }
        );

        // ✅ PERUBAHAN 5: SET TOKEN DI COOKIE (sama seperti login)
        // Ini membuat user langsung bisa akses protected routes setelah register
        response.cookies.set({
            name: "token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 hari
            path: "/",
        });

        // ✅ PERUBAHAN 6: Return response yang sudah di-set cookie
        return response;

    } catch (err) {
        console.error("Error registrasi:", err);
        return NextResponse.json(
            { error: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}