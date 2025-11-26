import { db } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { status, denda_dibayar } = body;

        console.log("=== UPDATE PEMINJAMAN ===");
        console.log("ID:", id);
        console.log("New Status:", status);

        // Ambil data peminjaman lama
        const [oldData] = await db.execute(
            "SELECT buku_id, status FROM peminjaman WHERE id = ?",
            [id]
        );

        if (oldData.length === 0) {
            return NextResponse.json(
                { error: "Peminjaman tidak ditemukan" },
                { status: 404 }
            );
        }

        const oldStatus = oldData[0].status;
        const buku_id = oldData[0].buku_id;

        // Jika status berubah dari "Menunggu" ke "Dipinjam", kurangi stok
        if (oldStatus !== "Dipinjam" && status === "Dipinjam") {
            await db.execute(
                "UPDATE buku SET stok = stok - 1 WHERE id = ? AND stok > 0",
                [buku_id]
            );
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

        if (denda_dibayar !== undefined) {
            query += ", denda_dibayar = ?";
            queryParams.push(denda_dibayar);
        }

        query += " WHERE id = ?";
        queryParams.push(id);

        await db.execute(query, queryParams);

        return NextResponse.json({ message: "Status peminjaman berhasil diupdate" });
    } catch (err) {
        console.error("=== ERROR UPDATE PEMINJAMAN ===");
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
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
                { error: "Peminjaman tidak ditemukan" },
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

        return NextResponse.json({ message: "Peminjaman berhasil dihapus" });
    } catch (err) {
        console.error("Error DELETE peminjaman:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}