import { NextResponse } from "next/server";
import { db } from "../../../lib/db"; 

// GET WISHLIST + JOIN BUKU
export async function GET() {
    try {
        const [rows] = await db.query(`
            SELECT 
                w.id AS wishlist_id,
                w.user_id,
                b.id AS buku_id,
                b.judul,
                b.penulis,
                b.img
            FROM wishlist w
            JOIN buku b ON w.buku_id = b.id
        `);
        return NextResponse.json(rows);
    } catch (err) {
        console.log(err);
        return NextResponse.json([], { status: 500 });
    }
}

// POST WISHLIST
export async function POST(req) {
    try {
        const body = await req.json();
        const { buku_id, user_id } = body;

        await db.query(
            "INSERT INTO wishlist (buku_id, user_id) VALUES (?, ?)",
            [buku_id, user_id]
        );

        return NextResponse.json({ success: true });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

// DELETE WISHLIST
export async function DELETE(req) {
    try {
        const { id } = await req.json();
        await db.query("DELETE FROM wishlist WHERE id = ?", [id]);
        return NextResponse.json({ success: true });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
