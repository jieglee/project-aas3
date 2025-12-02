import { NextResponse } from "next/server";
import {db} from "../../../../../lib/db";

export async function GET(request, { params }) {
    try {
        // Coba dua cara
        let userId;
        
        if (params instanceof Promise) {
            const resolvedParams = await params;
            userId = resolvedParams.userId;
        } else {
            userId = params.userId;
        }

        console.log("=== API DASHBOARD CALLED ===");
        console.log("User ID:", userId);
        console.log("Type of userId:", typeof userId);

        if (!userId) {
            console.error("❌ User ID is missing!");
            return NextResponse.json({ error: "User ID diperlukan" }, { status: 400 });
        }

        // Query peminjaman
        const [stats] = await db.query(
            `SELECT 
                COUNT(CASE WHEN p.status = 'Dipinjam' THEN 1 END) as bukuDipinjam,
                COUNT(CASE WHEN p.status = 'Dipinjam' AND p.tanggal_kembali < CURDATE() THEN 1 END) as bukuTerlambat,
                COUNT(CASE WHEN p.status = 'Dikembalikan' THEN 1 END) as totalBukuPernahDipinjam
            FROM peminjaman p
            WHERE p.user_id = ?`,
            [userId]
        );

        // Query wishlist
        const [wishlist] = await db.query(
            `SELECT COUNT(*) as totalWishlist FROM wishlist WHERE user_id = ?`,
            [userId]
        );

        const result = {
            bukuDipinjam: parseInt(stats[0]?.bukuDipinjam) || 0,
            bukuTerlambat: parseInt(stats[0]?.bukuTerlambat) || 0,
            totalBukuPernahDipinjam: parseInt(stats[0]?.totalBukuPernahDipinjam) || 0,
            totalWishlist: parseInt(wishlist[0]?.totalWishlist) || 0
        };

        console.log("✅ Result:", result);
        return NextResponse.json(result);

    } catch (error) {
        console.error("❌ Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}