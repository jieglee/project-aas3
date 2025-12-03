import { db } from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { userId } = await params;

        console.log("=== FETCHING LOANS FOR USER ===");
        console.log("User ID:", userId);

        const [loans] = await db.query(
            `SELECT 
                p.id,
                p.user_id,
                p.buku_id,
                p.tanggal_pinjam,
                p.tanggal_kembali,
                p.status,
                p.alasan_penolakan,
                p.tanggal_ditolak,
                p.denda,
                p.denda_dibayar,
                b.judul as judulBuku,
                b.penulis,
                b.img,
                u.nama as peminjam
            FROM peminjaman p
            JOIN buku b ON p.buku_id = b.id
            JOIN users u ON p.user_id = u.id
            WHERE p.user_id = ?
            ORDER BY p.created_at DESC`,
            [userId]
        );

        console.log(`✅ Found ${loans.length} loans for user ${userId}`);
        console.log("Loans data:", loans);
        
        return NextResponse.json(loans);

    } catch (error) {
        console.error("❌ Error fetching user loans:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}