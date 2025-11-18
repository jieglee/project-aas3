import { db } from "../../../lib/db";

export async function GET() {
    const [rows] = await db.query("SELECT * FROM buku");
    return new Response(JSON.stringify(rows), { status: 200 });
}
