import db from "../../../../lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET() {
    try {
        const [rows] = await db.query("SELECT id, nama, kelas, email, phone, role, created_at FROM users ORDER BY id DESC");
        return NextResponse.json(rows);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const data = await req.json();
        const { nama, kelas = "", email, phone = "", password = "", role = "user" } = data;

        if (!nama || !email) return NextResponse.json({ error: "nama & email required" }, { status: 400 });

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
