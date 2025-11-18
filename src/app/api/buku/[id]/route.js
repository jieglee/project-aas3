import { db } from "../../../../lib/db";

export async function GET(req, { params }) {
    const { id } = params;

    const [rows] = await db.query("SELECT * FROM buku WHERE id = ?", [id]);

    if (rows.length === 0) {
        return new Response(JSON.stringify({ error: "Buku tidak ditemukan" }), {
            status: 404,
        });
    }

    return new Response(JSON.stringify(rows[0]), { status: 200 });
}
