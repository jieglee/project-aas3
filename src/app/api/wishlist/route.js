import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

// GET WISHLIST - Filter by user_id
export async function GET(request) {
    try {
        // Ambil user_id dari query params atau localStorage di frontend
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { error: "User ID diperlukan" },
                { status: 400 }
            );
        }

        console.log("Fetching wishlist for user:", userId);

        const [rows] = await db.query(
            `SELECT 
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
            WHERE w.user_id = ?
            ORDER BY w.created_at DESC`,
            [userId]
        );

        console.log(`Found ${rows.length} wishlist items for user ${userId}`);
        return NextResponse.json(rows);

    } catch (err) {
        console.error("GET /api/wishlist error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// POST WISHLIST - Tambah ke wishlist
export async function POST(req) {
    try {
        const { buku_id, user_id } = await req.json();

        console.log("Adding to wishlist:", { user_id, buku_id });

        if (!user_id || !buku_id) {
            return NextResponse.json(
                { success: false, message: "User ID dan Buku ID diperlukan" },
                { status: 400 }
            );
        }

        // Cek apakah buku sudah ada di wishlist user
        const [exist] = await db.query(
            "SELECT * FROM wishlist WHERE user_id = ? AND buku_id = ?",
            [user_id, buku_id]
        );

        if (exist.length > 0) {
            return NextResponse.json(
                { success: false, message: "Buku sudah ada di wishlist" },
                { status: 400 }
            );
        }

        await db.query(
            "INSERT INTO wishlist (user_id, buku_id) VALUES (?, ?)",
            [user_id, buku_id]
        );

        console.log(`✅ Successfully added book ${buku_id} to wishlist for user ${user_id}`);
        return NextResponse.json({ success: true, message: "Berhasil ditambahkan ke wishlist" });

    } catch (err) {
        console.error("POST /api/wishlist error:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

// DELETE WISHLIST - Hapus dari wishlist
export async function DELETE(req) {
    try {
        const { wishlist_id } = await req.json();

        console.log("Deleting wishlist item:", wishlist_id);

        if (!wishlist_id) {
            return NextResponse.json(
                { success: false, message: "Wishlist ID diperlukan" },
                { status: 400 }
            );
        }

        await db.query("DELETE FROM wishlist WHERE id = ?", [wishlist_id]);

        console.log(`✅ Successfully deleted wishlist item ${wishlist_id}`);
        return NextResponse.json({ success: true, message: "Berhasil dihapus dari wishlist" });

    } catch (err) {
        console.error("DELETE /api/wishlist error:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}