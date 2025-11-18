import { db } from "../../../../lib/db";

export async function GET(req, { params }) {
    const { id } = params;
    try {
        const [rows] = await db.query("SELECT * FROM buku WHERE id = ?", [id]);
        if (!rows.length)
            return new Response(JSON.stringify({ message: "Buku tidak ditemukan" }), { status: 404 });

        return new Response(JSON.stringify(rows[0]), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Gagal mengambil data" }), { status: 500 });
    }
}
