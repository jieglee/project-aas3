import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function GET() {
    try {
        const [rows] = await db.query(`
            SELECT 
                p.id,
                u.nama AS peminjam,
                b.judul AS judulBuku,
                p.tanggal_pinjam,
                p.tanggal_kembali,
                p.status,
                p.denda,
                p.denda_dibayar
            FROM peminjaman p
            JOIN users u ON p.user_id = u.id
            JOIN buku b ON p.buku_id = b.id
            ORDER BY p.id DESC
        `);

        return NextResponse.json(rows);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
