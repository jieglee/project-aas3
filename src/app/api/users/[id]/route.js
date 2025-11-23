import { db } from "../../../../../lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(req, { params }) {
    try {
        const { id } = params;
        const [rows] = await db.execute(
            "SELECT id, nama, kelas, email, phone, role, created_at FROM users WHERE id = ?", 
            [id]
        );
        
        if (rows.length === 0) {
            return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
        }
        
        return NextResponse.json(rows[0]);
    } catch (err) {
        console.error("Error GET user by id:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const body = await req.json();
        const { nama, kelas = "", email, phone = "", password, role = "user" } = body;

        if (!nama || !email) {
            return NextResponse.json({ error: "Nama & email wajib diisi" }, { status: 400 });
        }

        // Validasi email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Format email tidak valid" }, { status: 400 });
        }

        // Cek apakah email sudah digunakan user lain
        const [existing] = await db.execute(
            "SELECT id FROM users WHERE email = ? AND id != ?", 
            [email, id]
        );
        if (existing.length > 0) {
            return NextResponse.json({ error: "Email sudah digunakan oleh user lain" }, { status: 400 });
        }

        // Hash password jika diisi
        let hashed = null;
        if (password && password.trim() !== "") {
            hashed = await bcrypt.hash(password, 10);
        }

        // Update dengan atau tanpa password
        if (hashed) {
            await db.execute(
                "UPDATE users SET nama = ?, kelas = ?, email = ?, phone = ?, password = ?, role = ? WHERE id = ?",
                [nama, kelas, email, phone, hashed, role, id]
            );
        } else {
            await db.execute(
                "UPDATE users SET nama = ?, kelas = ?, email = ?, phone = ?, role = ? WHERE id = ?",
                [nama, kelas, email, phone, role, id]
            );
        }

        // Jika user yang diupdate adalah user yang sedang login, update localStorage
        return NextResponse.json({ 
            message: "User berhasil diupdate",
            user: {
                id: parseInt(id),
                nama,
                kelas,
                email,
                phone,
                role
            }
        });
    } catch (err) {
        console.error("Error PUT user:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        
        // Cek apakah user ada
        const [user] = await db.execute("SELECT id, role FROM users WHERE id = ?", [id]);
        if (user.length === 0) {
            return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
        }

        // Cegah penghapusan admin terakhir (opsional)
        if (user[0].role === 'admin') {
            const [adminCount] = await db.execute("SELECT COUNT(*) as total FROM users WHERE role = 'admin'");
            if (adminCount[0].total <= 1) {
                return NextResponse.json({ error: "Tidak dapat menghapus admin terakhir" }, { status: 400 });
            }
        }

        await db.execute("DELETE FROM users WHERE id = ?", [id]);
        return NextResponse.json({ message: "User berhasil dihapus" });
    } catch (err) {
        console.error("Error DELETE user:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}