import { db } from "../../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const body = await req.json();
        const { nama, kelas, email, phone, password } = body;

        // Cek email sudah ada
        const [cek] = await db.execute(
            "SELECT email FROM users WHERE email = ?",
            [email]
        );

        if (cek.length > 0) {
            return new Response(
                JSON.stringify({ error: "Email sudah terdaftar" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Hash password
        const hashed = await bcrypt.hash(password, 10);

        // Insert ke database
        await db.execute(
            "INSERT INTO users (nama, kelas, email, phone, password) VALUES (?, ?, ?, ?, ?)",
            [nama, kelas, email, phone, hashed]
        );

        return new Response(
            JSON.stringify({ success: true, message: "Registrasi berhasil!" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (err) {
        console.error(err);
        return new Response(
            JSON.stringify({ error: "Server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
