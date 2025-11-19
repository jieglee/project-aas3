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

        await db.query(
            `UPDATE buku 
                SET img=?, judul=?, penulis=?, deskripsi=?, penerbit=?, tahun_terbit=?, stok=?, kategori=?
                WHERE id=?`,
            [img, judul, penulis, deskripsi, penerbit, tahun_terbit, stok, kategori, id]
        );

        return NextResponse.json({ message: "Buku berhasil diperbarui" }, { status: 200 });
    } catch (err) {
        console.error("ERROR UPDATE BUKU:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
