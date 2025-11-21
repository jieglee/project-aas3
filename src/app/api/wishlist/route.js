import { NextResponse } from "next/server";
import { db } from "../../../lib/db"; 

// GET WISHLIST (ADMIN & USER)
export async function GET() {
    try {
        const [rows] = await db.query(`
            SELECT 
                w.id AS id,
                w.user_id,
                w.buku_id,
                b.judul,
                b.penulis,
                b.img,
                w.created_at
            FROM wishlist w
            JOIN buku b ON w.buku_id = b.id
            ORDER BY w.created_at DESC
        `);

        return NextResponse.json(rows);
    } catch (err) {
        console.log(err);
        return NextResponse.json([], { status: 500 });
    }
}

// POST
export async function POST(req) {
    try {
        const { buku_id, user_id } = await req.json();
        await db.query("INSERT INTO wishlist (buku_id, user_id) VALUES (?, ?)", [
            buku_id,
            user_id,
        ]);
        return NextResponse.json({ success: true });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

// DELETE
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
