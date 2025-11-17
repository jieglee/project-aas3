import { db } from "../../../lib/db";

export async function GET() {
    try {
        const [rows] = await db.query("SELECT * FROM buku ORDER BY created_at DESC");
        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Gagal mengambil data" }), { status: 500 });
    }
}
