import { db } from "../../../../lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(req, { params }) {
    try {
        // PERBAIKAN: await params
        const { id } = await params;
        
        const [rows] = await db.execute(
            "SELECT id, nama, kelas, email, phone, role, created_at FROM users WHERE id = ?", 
            [id]
        );
        
        if (rows.length === 0) {
            return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
        }
        
        return NextResponse.json(rows[0]);
    } catch (error) {
        console.error("🔥 ERROR GET USER:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        // PERBAIKAN: await params
        const { id } = await params;
        const body = await req.json();
        
        console.log("=== RECEIVED UPDATE DATA ===");
        console.log("User ID:", id);
        console.log("Raw body:", body);
        
        // Clean dan validasi
        const cleanNama = (body.nama && typeof body.nama === 'string') ? body.nama.trim() : '';
        const cleanKelas = (body.kelas && typeof body.kelas === 'string') ? body.kelas.trim() : '';
        const cleanEmail = (body.email && typeof body.email === 'string') ? body.email.trim() : '';
        const cleanPhone = (body.phone && typeof body.phone === 'string') ? body.phone.trim() : '';
        const cleanPassword = (body.password && typeof body.password === 'string') ? body.password.trim() : '';
        const cleanRole = (body.role === 'admin' || body.role === 'user') ? body.role : 'user';

        // Validasi
        if (!cleanNama) {
            return NextResponse.json({ error: "Nama wajib diisi" }, { status: 400 });
        }

        if (!cleanEmail) {
            return NextResponse.json({ error: "Email wajib diisi" }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanEmail)) {
            return NextResponse.json({ error: "Format email tidak valid" }, { status: 400 });
        }

        // Cek email duplikat
        const [existing] = await db.execute(
            "SELECT id FROM users WHERE email = ? AND id != ?", 
            [cleanEmail, id]
        );
        if (existing.length > 0) {
            return NextResponse.json({ error: "Email sudah digunakan oleh user lain" }, { status: 400 });
        }

        // Prepare values - PASTIKAN tidak ada undefined
        const finalNama = cleanNama;
        const finalKelas = cleanKelas || null;
        const finalEmail = cleanEmail;
        const finalPhone = cleanPhone || null;
        const finalRole = cleanRole;

        console.log("=== FINAL VALUES ===");
        console.log({ finalNama, finalKelas, finalEmail, finalPhone, finalRole });

        // Update
        if (cleanPassword && cleanPassword.length > 0) {
            if (cleanPassword.length < 6) {
                return NextResponse.json({ error: "Password minimal 6 karakter" }, { status: 400 });
            }

            const hashed = await bcrypt.hash(cleanPassword, 10);
            
            await db.execute(
                "UPDATE users SET nama = ?, kelas = ?, email = ?, phone = ?, password = ?, role = ? WHERE id = ?",
                [finalNama, finalKelas, finalEmail, finalPhone, hashed, finalRole, id]
            );
            console.log("✅ UPDATE SUCCESS (with password)");
        } else {
            await db.execute(
                "UPDATE users SET nama = ?, kelas = ?, email = ?, phone = ?, role = ? WHERE id = ?",
                [finalNama, finalKelas, finalEmail, finalPhone, finalRole, id]
            );
            console.log("✅ UPDATE SUCCESS (without password)");
        }

        return NextResponse.json({ 
            message: "User berhasil diupdate",
            user: {
                id: parseInt(id),
                nama: finalNama,
                kelas: finalKelas,
                email: finalEmail,
                phone: finalPhone,
                role: finalRole
            }
        });
    } catch (err) {
        console.error("=== ERROR PUT USER ===");
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        // PERBAIKAN: await params
        const { id } = await params;
        
        const [user] = await db.execute("SELECT id, role FROM users WHERE id = ?", [id]);
        if (user.length === 0) {
            return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
        }

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