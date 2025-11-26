import { db } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "userId is required" }, { status: 400 });
        }

        // Get total books borrowed
        const [totalBorrowed] = await db.execute(
            "SELECT COUNT(*) as total FROM peminjaman WHERE user_id = ?",
            [userId]
        );

        // Get currently borrowed books (status = 'Dipinjam')
        const [currentlyBorrowed] = await db.execute(
            "SELECT COUNT(*) as total FROM peminjaman WHERE user_id = ? AND status = 'Dipinjam'",
            [userId]
        );

        // Get returned books (status = 'Dikembalikan')
        const [returned] = await db.execute(
            "SELECT COUNT(*) as total FROM peminjaman WHERE user_id = ? AND status = 'Dikembalikan'",
            [userId]
        );

        // Get pending requests (status = 'Menunggu')
        const [pending] = await db.execute(
            "SELECT COUNT(*) as total FROM peminjaman WHERE user_id = ? AND status = 'Menunggu'",
            [userId]
        );

        // Get rejected requests (status = 'Ditolak')
        const [rejected] = await db.execute(
            "SELECT COUNT(*) as total FROM peminjaman WHERE user_id = ? AND status = 'Ditolak'",
            [userId]
        );

        // Get wishlist count
        const [wishlist] = await db.execute(
            "SELECT COUNT(*) as total FROM wishlist WHERE user_id = ?",
            [userId]
        );

        return NextResponse.json({
            totalBorrowed: totalBorrowed[0].total,
            currentlyBorrowed: currentlyBorrowed[0].total,
            returned: returned[0].total,
            pending: pending[0].total,
            rejected: rejected[0].total,
            wishlist: wishlist[0].total
        });
    } catch (err) {
        console.error("Error GET user stats:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}