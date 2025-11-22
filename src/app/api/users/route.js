import { db } from "../../../lib/db"; 
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search");

        let query = "SELECT id, nama, kelas, email, phone, role, created_at FROM users";
        let params = [];

        if (search) {
            query += " WHERE nama LIKE ? OR email LIKE ? OR kelas LIKE ?";
            const searchTerm = `%${search}%`;
            params = [searchTerm, searchTerm, searchTerm];
        }

        query += " ORDER BY id DESC";

        const [rows] = await db.query(query, params);
        return NextResponse.json(rows);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const data = await req.json();
        const { nama, kelas = "", email, phone = "", password = "", role = "user" } = data;

        if (!nama || !email) 
            return NextResponse.json({ error: "Nama & email wajib diisi" }, { status: 400 });

        // Validasi email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Format email tidak valid" }, { status: 400 });
        }

        // Cek apakah email sudah terdaftar
        const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
        if (existing.length > 0) {
            return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 });
        }

        // Hash password jika ada
        let hashed = null;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashed = await bcrypt.hash(password, salt);
        }

        await db.query(
            "INSERT INTO users (nama, kelas, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)",
            [nama, kelas, email, phone, hashed || "", role]
        );

        return NextResponse.json({ message: "User berhasil ditambahkan" });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}