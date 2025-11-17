import { db } from "../../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0) {
            return new Response(JSON.stringify({ message: "Email tidak ditemukan!" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const user = rows[0];

        // cek password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return new Response(JSON.stringify({ message: "Password salah!" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(
            JSON.stringify({
                message: "Login berhasil!",
                user: {
                    id: user.id,
                    nama: user.nama,
                    email: user.email,
                    role: user.role,
                },
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Terjadi kesalahan server" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
