import { db } from "../../../lib/db";
import { NextResponse } from "next/server";

// GET - Ambil semua buku
export async function GET() {
    try {
        const [rows] = await db.query("SELECT * FROM buku ORDER BY id DESC");
        return NextResponse.json(rows, { status: 200 });
    } catch (err) {
        console.error("ERROR GET BUKU:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// POST - Tambah buku baru
export async function POST(req) {
    try {
        const body = await req.json();
        console.log("📥 Data yang diterima:", body); // Debug

        const { img, judul, penulis, penerbit, tahun_terbit, kategori, stok, deskripsi } = body;

        // Validasi
        if (!judul || !penulis || !penerbit || !tahun_terbit || !kategori || !deskripsi) {
            return NextResponse.json(
                { error: "Semua field wajib harus diisi!" },
                { status: 400 }
            );
        }

        console.log("📝 Menyimpan ke database..."); // Debug

        const [result] = await db.query(
            `INSERT INTO buku (img, judul, penulis, penerbit, tahun_terbit, kategori, stok, deskripsi)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                img || null, 
                judul, 
                penulis, 
                penerbit, 
                parseInt(tahun_terbit), 
                kategori, 
                parseInt(stok) || 0, 
                deskripsi
            ]
        );

        console.log("✅ Berhasil! Insert ID:", result.insertId); // Debug

        return NextResponse.json(
            { 
                success: true, 
                message: "Buku berhasil ditambahkan!",
                id: result.insertId 
            },
            { status: 201 }
        );
    } catch (err) {
        console.error("❌ ERROR POST BUKU:", err);
        return NextResponse.json(
            { error: "Gagal menambahkan buku: " + err.message },
            { status: 500 }
        );
    }
}