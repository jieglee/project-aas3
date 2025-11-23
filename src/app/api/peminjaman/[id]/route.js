import { db } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = params;
        const [rows] = await db.execute(
            `SELECT 
                p.*,
                u.nama as peminjam,
                b.judul as judulBuku,
                b.penulis,
                b.img,
                b.kategori
            FROM peminjaman p
            JOIN users u ON p.user_id = u.id
            JOIN buku b ON p.buku_id = b.id
            WHERE p.id = ?`,
            [id]
        );
        
        if (rows.length === 0) {
            return NextResponse.json({ error: "Peminjaman tidak ditemukan" }, { status: 404 });
        }
        
        return NextResponse.json(rows[0]);
    } catch (err) {
        console.error("Error GET peminjaman by id:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const body = await req.json();
        const { status, denda_dibayar } = body;

        // Jika status diubah menjadi "Dipinjam", kurangi stok buku
        if (status === "Dipinjam") {
            const [peminjaman] = await db.execute(
                "SELECT buku_id FROM peminjaman WHERE id = ?",
                [id]
            );

            if (peminjaman.length > 0) {
                await db.execute(
                    "UPDATE buku SET stok = stok - 1 WHERE id = ? AND stok > 0",
                    [peminjaman[0].buku_id]
                );
            }
        }

        // Jika status diubah menjadi "Dikembalikan", tambah stok buku
        if (status === "Dikembalikan") {
            const [peminjaman] = await db.execute(
                "SELECT buku_id FROM peminjaman WHERE id = ?",
                [id]
            );

            if (peminjaman.length > 0) {
                await db.execute(
                    "UPDATE buku SET stok = stok + 1 WHERE id = ?",
                    [peminjaman[0].buku_id]
                );
            }
        }

        // Update status peminjaman
        let query = "UPDATE peminjaman SET status = ?";
        let params = [status];

        if (denda_dibayar !== undefined) {
            query += ", denda_dibayar = ?";
            params.push(denda_dibayar);
        }

        query += " WHERE id = ?";
        params.push(id);

        await db.execute(query, params);

        return NextResponse.json({ message: "Status peminjaman berhasil diupdate" });
    } catch (err) {
        console.error("Error PUT peminjaman:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        
        // Cek apakah peminjaman ada
        const [peminjaman] = await db.execute(
            "SELECT id FROM peminjaman WHERE id = ?",
            [id]
        );
        
        if (peminjaman.length === 0) {
            return NextResponse.json({ error: "Peminjaman tidak ditemukan" }, { status: 404 });
        }

        await db.execute("DELETE FROM peminjaman WHERE id = ?", [id]);
        return NextResponse.json({ message: "Peminjaman berhasil dihapus" });
    } catch (err) {
        console.error("Error DELETE peminjaman:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}