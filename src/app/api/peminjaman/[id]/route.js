import { db } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        
        const [rows] = await db.execute(
            `SELECT 
                p.id,
                p.user_id,
                p.buku_id,
                p.tanggal_pinjam,
                p.tanggal_kembali,
                p.status,
                p.denda,
                p.denda_dibayar,
                p.alasan_penolakan,
                p.tanggal_ditolak,
                p.created_at,
                u.nama AS peminjam,
                b.judul AS judulBuku,
                b.img,
                b.penulis,
                b.kategori
            FROM peminjaman p
            JOIN users u ON p.user_id = u.id
            JOIN buku b ON p.buku_id = b.id
            WHERE p.id = ?`,
            [id]
        );

        if (rows.length === 0) {
            return NextResponse.json(
                { success: false, error: "Peminjaman tidak ditemukan" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: rows[0] });
    } catch (err) {
        console.error("Error GET peminjaman by ID:", err);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { status, alasan_penolakan } = body;

        console.log("=== UPDATE PEMINJAMAN ===");
        console.log("ID:", id);
        console.log("New Status:", status);
        console.log("Alasan Penolakan:", alasan_penolakan);

        // Validasi status
        const validStatuses = ['Menunggu', 'Dipinjam', 'Dikembalikan', 'Terlambat', 'Ditolak'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { success: false, error: "Status tidak valid" },
                { status: 400 }
            );
        }

        // Ambil data peminjaman lama
        const [oldData] = await db.execute(
            "SELECT buku_id, status FROM peminjaman WHERE id = ?",
            [id]
        );

        if (oldData.length === 0) {
            return NextResponse.json(
                { success: false, error: "Peminjaman tidak ditemukan" },
                { status: 404 }
            );
        }

        const oldStatus = oldData[0].status;
        const buku_id = oldData[0].buku_id;

        // Jika status berubah dari "Menunggu" ke "Dipinjam", kurangi stok
        if (oldStatus !== "Dipinjam" && status === "Dipinjam") {
            const [updateResult] = await db.execute(
                "UPDATE buku SET stok = stok - 1 WHERE id = ? AND stok > 0",
                [buku_id]
            );
            
            if (updateResult.affectedRows === 0) {
                return NextResponse.json(
                    { success: false, error: "Stok buku habis atau tidak cukup" },
                    { status: 400 }
                );
            }
            console.log("✅ Stok dikurangi (status: Menunggu → Dipinjam)");
        }

        // Jika status berubah ke "Dikembalikan", tambah stok
        if (oldStatus !== "Dikembalikan" && status === "Dikembalikan") {
            await db.execute(
                "UPDATE buku SET stok = stok + 1 WHERE id = ?",
                [buku_id]
            );
            console.log("✅ Stok ditambah (status → Dikembalikan)");
        }

        // Update status peminjaman
        let query = "UPDATE peminjaman SET status = ?";
        let queryParams = [status];

        // Jika ditolak, simpan alasan dan timestamp
        if (status === "Ditolak") {
            if (!alasan_penolakan || alasan_penolakan.trim() === "") {
                return NextResponse.json(
                    { success: false, error: "Alasan penolakan wajib diisi" },
                    { status: 400 }
                );
            }
            query += ", alasan_penolakan = ?, tanggal_ditolak = NOW()";
            queryParams.push(alasan_penolakan.trim());
        }

        query += " WHERE id = ?";
        queryParams.push(id);

        const [result] = await db.execute(query, queryParams);

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { success: false, error: "Gagal mengupdate peminjaman" },
                { status: 400 }
            );
        }

        console.log("✅ Status berhasil diupdate");

        return NextResponse.json({ 
            success: true,
            message: "Status peminjaman berhasil diupdate" 
        });

    } catch (err) {
        console.error("=== ERROR UPDATE PEMINJAMAN ===");
        console.error(err);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = await params;

        // Cek apakah peminjaman ada dan ambil data buku_id serta status
        const [peminjaman] = await db.execute(
            "SELECT buku_id, status FROM peminjaman WHERE id = ?",
            [id]
        );

        if (peminjaman.length === 0) {
            return NextResponse.json(
                { success: false, error: "Peminjaman tidak ditemukan" },
                { status: 404 }
            );
        }

        // Jika status masih "Dipinjam", kembalikan stok buku saat dihapus
        if (peminjaman[0].status === "Dipinjam") {
            await db.execute(
                "UPDATE buku SET stok = stok + 1 WHERE id = ?",
                [peminjaman[0].buku_id]
            );
            console.log("✅ Stok dikembalikan karena peminjaman dihapus");
        }

        // Hapus peminjaman
        await db.execute("DELETE FROM peminjaman WHERE id = ?", [id]);

        return NextResponse.json({ 
            success: true,
            message: "Peminjaman berhasil dihapus" 
        });

    } catch (err) {
        console.error("Error DELETE peminjaman:", err);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}