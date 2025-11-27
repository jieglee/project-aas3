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
        console.log("📥 Data yang diterima:", body);

        const { img, judul, penulis, penerbit, tahun_terbit, kategori, stok, deskripsi } = body;

        // Validasi field wajib
        if (!judul || !penulis || !penerbit || !tahun_terbit || !kategori || !deskripsi) {
            return NextResponse.json(
                { error: "Semua field wajib harus diisi!" },
                { status: 400 }
            );
        }

        // List kategori yang valid (sesuaikan dengan ENUM di database Anda)
        const validKategori = [
            'Fiksi',
            'Non-Fiksi',
            'Pelajaran',
            'Komik',
        ];

        // Validasi kategori
        const kategoriTrimmed = kategori.trim();
        if (!validKategori.includes(kategoriTrimmed)) {
            console.log("❌ Kategori tidak valid:", kategoriTrimmed);
            return NextResponse.json(
                { 
                    error: "Kategori tidak valid!", 
                    validKategori: validKategori,
                    received: kategoriTrimmed
                },
                { status: 400 }
            );
        }

        console.log("📝 Menyimpan ke database...");
        console.log("Kategori yang akan disimpan:", kategoriTrimmed);

        const [result] = await db.query(
            `INSERT INTO buku (img, judul, penulis, penerbit, tahun_terbit, kategori, stok, deskripsi)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                img || null, 
                judul.trim(), 
                penulis.trim(), 
                penerbit.trim(), 
                parseInt(tahun_terbit), 
                kategoriTrimmed,  // Gunakan yang sudah di-trim
                parseInt(stok) || 0, 
                deskripsi.trim()
            ]
        );

        console.log("✅ Berhasil! Insert ID:", result.insertId);

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
        
        // Error handling yang lebih spesifik
        if (err.message.includes('Data truncated')) {
            return NextResponse.json(
                { 
                    error: "Format data tidak sesuai dengan database. Periksa kategori yang dipilih.",
                    detail: err.message
                },
                { status: 400 }
            );
        }
        
        return NextResponse.json(
            { error: "Gagal menambahkan buku: " + err.message },
            { status: 500 }
        );
    }
}