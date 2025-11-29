import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

// GET BUKU BY ID
export async function GET(req, context) {
    try {
        const params = await context.params;
        const { id } = params;

        const [rows] = await db.query("SELECT * FROM buku WHERE id = ?", [id]);

        if (rows.length === 0) {
            return NextResponse.json({ error: "Buku tidak ditemukan" }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (err) {  
        console.error("ERROR API BUKU:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// UPDATE BUKU
export async function PUT(req, context) {
    try {
        const params = await context.params;
        const { id } = params;

        const body = await req.json();
        const { img, judul, penulis, deskripsi, penerbit, tahun_terbit, stok, kategori } = body;

        // Validasi
        if (!judul || !penulis || !penerbit || !tahun_terbit || !kategori || !deskripsi) {
            return NextResponse.json(
                { error: "Semua field wajib harus diisi" },
                { status: 400 }
            );
        }

        const [result] = await db.query(
            `UPDATE buku 
             SET img=?, judul=?, penulis=?, deskripsi=?, penerbit=?, tahun_terbit=?, stok=?, kategori=?
             WHERE id=?`,
            [img, judul, penulis, deskripsi, penerbit, tahun_terbit, stok, kategori, id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: "Buku tidak ditemukan" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Buku berhasil diupdate!" }, { status: 200 });
    } catch (err) {
        console.error("ERROR UPDATE BUKU:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// DELETE BUKU
export async function DELETE(req, context) {
    try {
        const params = await context.params;
        const { id } = params;

        // Cek apakah buku sedang dipinjam
        const [checkPeminjaman] = await db.query(
            `SELECT COUNT(*) as count 
             FROM peminjaman 
             WHERE buku_id = ? AND status IN ('Diproses', 'Dipinjam')`,
            [id]
        );

        if (checkPeminjaman[0].count > 0) {
            return NextResponse.json(
                { error: "Tidak dapat menghapus buku yang sedang dipinjam!" },
                { status: 400 }
            );
        }

        // Hapus buku
        const [result] = await db.query("DELETE FROM buku WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: "Buku tidak ditemukan" }, { status: 404 });
        }

        return NextResponse.json(
            { success: true, message: "Buku berhasil dihapus!" },
            { status: 200 }
        );
    } catch (err) {
        console.error("ERROR DELETE BUKU:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}