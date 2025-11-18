import { db } from "../../../../lib/db";

export async function GET(req, { params }) {
    try {
        const { id } = params;

        const [rows] = await db.query("SELECT * FROM buku WHERE id = ?", [id]);

        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: "Buku tidak ditemukan" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify(rows[0]), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
