import { NextResponse } from "next/server";
import { db } from "../../../lib/db"; // pastikan koneksi db sudah benar

// GET WISHLIST
export async function GET() {
    try {
        const [rows] = await db.query(`
      SELECT 
        w.id AS wishlist_id,
        w.user_id,
        w.buku_id,
        b.judul,
        b.penulis,
        b.img,
        b.kategori,
        b.stok,
        b.penerbit,
        b.tahun_terbit,
        w.created_at
      FROM wishlist w
      JOIN buku b ON w.buku_id = b.id
      ORDER BY w.created_at DESC
    `);

        return NextResponse.json(rows);
    } catch (err) {
        console.error("GET /api/wishlist error:", err);
        return NextResponse.json([], { status: 500 });
    }
}

// POST WISHLIST
export async function POST(req) {
    try {
        const { buku_id, user_id } = await req.json();

        // Cek apakah buku sudah ada di wishlist user
        const [exist] = await db.query(
            "SELECT * FROM wishlist WHERE user_id = ? AND buku_id = ?",
            [user_id, buku_id]
        );

        if (exist.length > 0) {
            return NextResponse.json({ success: false, message: "Buku sudah ada di wishlist" }, { status: 400 });
        }

        await db.query("INSERT INTO wishlist (user_id, buku_id) VALUES (?, ?)", [user_id, buku_id]);
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("POST /api/wishlist error:", err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

// DELETE WISHLIST
export async function DELETE(req) {
    try {
        const { wishlist_id } = await req.json();

        await db.query("DELETE FROM wishlist WHERE id = ?", [wishlist_id]);
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("DELETE /api/wishlist error:", err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
