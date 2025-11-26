import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this-in-production";

export async function GET(req) {
    try {
        // Coba ambil token dari header Authorization
        const authHeader = req.headers.get('authorization');
        
        // Jika ada token, verify
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            
            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                
                // Ambil data user dari database berdasarkan decoded token
                const [rows] = await db.execute(
                    "SELECT id, nama, kelas, email, phone, role, created_at FROM users WHERE id = ?",
                    [decoded.userId]
                );

                if (rows.length === 0) {
                    return NextResponse.json(
                        { error: "User tidak ditemukan" },
                        { status: 404 }
                    );
                }

                return NextResponse.json(rows[0]);
            } catch (err) {
                console.error("Token verification failed:", err);
                // Jika token invalid, fallback ke userId
            }
        }

        // Fallback: gunakan userId dari query parameter
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        
        if (!userId) {
            return NextResponse.json(
                { error: "UserId atau token tidak ditemukan" },
                { status: 401 }
            );
        }

        // Ambil data user berdasarkan userId
        const [rows] = await db.execute(
            "SELECT id, nama, kelas, email, phone, role, created_at FROM users WHERE id = ?",
            [userId]
        );

        if (rows.length === 0) {
            return NextResponse.json(
                { error: "User tidak ditemukan" },
                { status: 404 }
            );
        }

        return NextResponse.json(rows[0]);

    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}