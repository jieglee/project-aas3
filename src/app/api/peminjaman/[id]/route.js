import { db } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();
        const { status, alasan_penolakan } = body;

        console.log("\n========================================");
        console.log("🔥 PUT /api/peminjaman/[id] - START");
        console.log("========================================");
        console.log("📝 ID:", id);
        console.log("📝 Status:", status);
        console.log("📝 Alasan Penolakan:", alasan_penolakan);

        // Validasi input
        if (!status) {
            return NextResponse.json(
                { success: false, error: "Status wajib diisi" },
                { status: 400 }
            );
        }

        // Jika status Ditolak, alasan_penolakan WAJIB ada
        if (status === "Ditolak" && !alasan_penolakan?.trim()) {
            return NextResponse.json(
                { success: false, error: "Alasan penolakan wajib diisi" },
                { status: 400 }
            );
        }

        // Cek apakah peminjaman ada
        const [existing] = await db.execute(
            "SELECT * FROM peminjaman WHERE id = ?",
            [id]
        );

        if (existing.length === 0) {
            return NextResponse.json(
                { success: false, error: "Peminjaman tidak ditemukan" },
                { status: 404 }
            );
        }

        const currentLoan = existing[0];
        console.log("📚 Current loan status:", currentLoan.status);

        // Update berdasarkan status
        let updateQuery = "";
        let updateParams = [];

        if (status === "Ditolak") {
            console.log("🔴 Processing DITOLAK status");
            updateQuery = `
                UPDATE peminjaman 
                SET status = ?, 
                    alasan_penolakan = ?,
                    tanggal_ditolak = NOW()
                WHERE id = ?
            `;
            updateParams = [status, alasan_penolakan.trim(), id];
            
        } else if (status === "Dipinjam") {
            console.log("✅ Processing DIPINJAM status - reducing stock");
            
            // Kurangi stok buku
            const [result] = await db.execute(
                "UPDATE buku SET stok = stok - 1 WHERE id = ? AND stok > 0",
                [currentLoan.buku_id]
            );

            if (result.affectedRows === 0) {
                return NextResponse.json(
                    { success: false, error: "Stok buku tidak mencukupi" },
                    { status: 400 }
                );
            }

            updateQuery = "UPDATE peminjaman SET status = ? WHERE id = ?";
            updateParams = [status, id];
            
        } else if (status === "Dikembalikan") {
            console.log("📥 Processing DIKEMBALIKAN status - restoring stock");
            
            // Kembalikan stok buku
            await db.execute(
                "UPDATE buku SET stok = stok + 1 WHERE id = ?",
                [currentLoan.buku_id]
            );

            updateQuery = "UPDATE peminjaman SET status = ? WHERE id = ?";
            updateParams = [status, id];
            
        } else {
            // Status lainnya (Terlambat, dll)
            updateQuery = "UPDATE peminjaman SET status = ? WHERE id = ?";
            updateParams = [status, id];
        }

        console.log("🔧 Executing query:", updateQuery);
        console.log("🔧 With params:", updateParams);

        const [updateResult] = await db.execute(updateQuery, updateParams);

        console.log("📊 Update result:", {
            affectedRows: updateResult.affectedRows,
            changedRows: updateResult.changedRows
        });

        if (updateResult.affectedRows === 0) {
            return NextResponse.json(
                { success: false, error: "Gagal mengupdate peminjaman" },
                { status: 500 }
            );
        }

        // Fetch updated data untuk konfirmasi
        const [updated] = await db.execute(
            `SELECT 
                p.*,
                u.nama as peminjam,
                b.judul as judulBuku,
                b.penulis,
                b.img
            FROM peminjaman p
            JOIN users u ON p.user_id = u.id
            JOIN buku b ON p.buku_id = b.id
            WHERE p.id = ?`,
            [id]
        );

        console.log("✅ Updated successfully!");
        console.log("✅ Alasan tersimpan:", updated[0].alasan_penolakan);
        console.log("========================================\n");

        return NextResponse.json({
            success: true,
            message: `Status berhasil diubah menjadi ${status}`,
            data: updated[0],
            alasan_penolakan: updated[0].alasan_penolakan
        });

    } catch (error) {
        console.error("❌ Error PUT peminjaman:", error);
        return NextResponse.json(
            { 
                success: false, 
                error: "Gagal mengupdate peminjaman", 
                details: error.message 
            },
            { status: 500 }
        );
    }
}