
import { db } from "../../../lib/db"; // pastikan path ini sesuai

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM buku"); // misal wishlist sementara ambil semua buku
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Gagal mengambil wishlist" }), {
      status: 500,
    });
  }
}
