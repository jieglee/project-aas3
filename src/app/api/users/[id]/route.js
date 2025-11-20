import db from "../../../../../lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(req, { params }) {
    try {
        const { id } = params;
        const [rows] = await db.query("SELECT id, nama, kelas, email, phone, role, created_at FROM users WHERE id = ?", [id]);
        return NextResponse.json(rows[0] || {});
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const body = await req.json();
        const { nama, kelas = "", email, phone = "", password, role = "user" } = body;

        if (!nama || !email) return NextResponse.json({ error: "nama & email required" }, { status: 400 });

        let hashed = null;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashed = await bcrypt.hash(password, salt);
        }

        if (hashed) {
            await db.query(
                "UPDATE users SET nama = ?, kelas = ?, email = ?, phone = ?, password = ?, role = ? WHERE id = ?",
                [nama, kelas, email, phone, hashed, role, id]
            );
        } else {
            await db.query(
                "UPDATE users SET nama = ?, kelas = ?, email = ?, phone = ?, role = ? WHERE id = ?",
                [nama, kelas, email, phone, role, id]
            );
        }

        return NextResponse.json({ message: "User berhasil diupdate" });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        await db.query("DELETE FROM users WHERE id = ?", [id]);
        return NextResponse.json({ message: "User berhasil dihapus" });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
