import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const user_id = searchParams.get("user_id");

        let query = `
            SELECT 
                p.id,
                p.user_id,
                p.buku_id,
                p.tanggal_pinjam,
                p.tanggal_kembali,
                p.status,
                p.denda,
                p.denda_dibayar,
                p.created_at,
                u.nama AS peminjam,
                b.judul AS judulBuku,
                b.img,
                b.penulis,
                b.kategori
            FROM peminjaman p
            JOIN users u ON p.user_id = u.id
            JOIN buku b ON p.buku_id = b.id
        `;

        let params = [];

        // Filter by user_id jika ada
        if (user_id) {
            query += " WHERE p.user_id = ?";
            params.push(user_id);
        }

        query += " ORDER BY p.id DESC";

        const [rows] = await db.execute(query, params);

        return NextResponse.json(rows);
    } catch (err) {
        console.error("Error GET peminjaman:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { user_id, buku_id, tanggal_pinjam, tanggal_kembali } = body;

        console.log("=== CREATE PEMINJAMAN ===");
        console.log("Body:", body);

        // Validasi input
        if (!user_id || !buku_id || !tanggal_pinjam || !tanggal_kembali) {
            return NextResponse.json(
                { error: "Semua field wajib diisi" },
                { status: 400 }
            );
        }

        // Cek stok buku
        const [buku] = await db.execute(
            "SELECT id, judul, stok FROM buku WHERE id = ?",
            [buku_id]
        );

        if (buku.length === 0) {
            return NextResponse.json(
                { error: "Buku tidak ditemukan" },
                { status: 404 }
            );
        }

        if (buku[0].stok <= 0) {
            return NextResponse.json(
                { error: "Stok buku tidak tersedia" },
                { status: 400 }
            );
        }

        // Cek apakah user sudah meminjam buku yang sama dan belum dikembalikan
        const [existingLoan] = await db.execute(
            `SELECT id FROM peminjaman 
             WHERE user_id = ? AND buku_id = ? AND status IN ('Menunggu', 'Dipinjam')`,
            [user_id, buku_id]
        );

        if (existingLoan.length > 0) {
            return NextResponse.json(
                { error: "Anda masih memiliki peminjaman aktif untuk buku ini" },
                { status: 400 }
            );
        }

        // Insert peminjaman dengan status "Menunggu"
        const [result] = await db.execute(
                `INSERT INTO peminjaman 
                (user_id, buku_id, tanggal_pinjam, tanggal_kembali, status, denda, denda_dibayar) 
                VALUES (?, ?, ?, ?, 'Menunggu', 0, 0)`,
            [user_id, buku_id, tanggal_pinjam, tanggal_kembali]
        );

        console.log("✅ Peminjaman berhasil dibuat, ID:", result.insertId);

        return NextResponse.json(
            {
                message: "Peminjaman berhasil diajukan dan menunggu persetujuan admin",
                id: result.insertId
            },
            { status: 201 }
        );

    } catch (err) {
        console.error("=== ERROR CREATE PEMINJAMAN ===");
        console.error(err);
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}