import { db } from "../../../../lib/db";

export async function GET(req, { params }) {
    const { id } = params;

    const [rows] = await db.query("SELECT * FROM wishlist WHERE id = ?", [id]);

    if (rows.length === 0) {
        return new Response(JSON.stringify({ message: "Wishlist tidak ditemukan" }), {
            status: 404,
        });
    }

    return new Response(JSON.stringify(rows[0]), { status: 200 });
}

export async function DELETE(req, { params }) {
    const { id } = params;

    await db.query("DELETE FROM wishlist WHERE id = ?", [id]);

    return new Response(JSON.stringify({ message: "Wishlist dihapus" }), { status: 200 });
}

export async function PUT(req, { params }) {
    const { id } = params;
    const body = await req.json();

    await db.query("UPDATE wishlist SET ? WHERE id = ?", [body, id]);

    return new Response(JSON.stringify({ message: "Wishlist diperbarui" }), { status: 200 });
}
