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

        const [rows] = await db.execute(query, params);
        return NextResponse.json(rows);
    } catch (err) {
        console.error("Error GET users:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        
        console.log("=== RECEIVED DATA ===");
        console.log("Raw body:", body);
        
        // Destructure dengan default values
        let { nama, kelas, email, phone, password, role } = body;
        
        // Validasi dan clean data
        nama = typeof nama === 'string' ? nama.trim() : '';
        kelas = typeof kelas === 'string' ? kelas.trim() : '';
        email = typeof email === 'string' ? email.trim() : '';
        phone = typeof phone === 'string' ? phone.trim() : '';
        password = typeof password === 'string' ? password.trim() : '';
        role = (role === 'admin' || role === 'user') ? role : 'user';

        console.log("=== CLEANED DATA ===");
        console.log({ nama, kelas, email, phone, password: "***", role });

        // Validasi field wajib
        if (!nama) {
            return NextResponse.json({ error: "Nama wajib diisi" }, { status: 400 });
        }

        if (!email) {
            return NextResponse.json({ error: "Email wajib diisi" }, { status: 400 });
        }

        // Validasi email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Format email tidak valid" }, { status: 400 });
        }

        // Validasi password
        if (!password) {
            return NextResponse.json({ error: "Password wajib diisi" }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ error: "Password minimal 6 karakter" }, { status: 400 });
        }

        // Cek apakah email sudah terdaftar
        const [existing] = await db.execute("SELECT id FROM users WHERE email = ?", [email]);
        if (existing.length > 0) {
            return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 });
        }

        // Hash password
        const hashed = await bcrypt.hash(password, 10);

        // Prepare final values - CRITICAL: use null for empty optional fields
        const finalNama = nama;
        const finalKelas = kelas === '' ? null : kelas;
        const finalEmail = email;
        const finalPhone = phone === '' ? null : phone;
        const finalRole = role;

        console.log("=== FINAL VALUES TO INSERT ===");
        console.log({ finalNama, finalKelas, finalEmail, finalPhone, finalRole });

        // Insert user
        const [result] = await db.execute(
            "INSERT INTO users (nama, kelas, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)",
            [finalNama, finalKelas, finalEmail, finalPhone, hashed, finalRole]
        );

        console.log("=== INSERT SUCCESS ===");
        console.log("Inserted ID:", result.insertId);

        return NextResponse.json({ 
            message: "User berhasil ditambahkan",
            userId: result.insertId 
        }, { status: 201 });
    } catch (err) {
        console.error("=== ERROR POST USER ===");
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}