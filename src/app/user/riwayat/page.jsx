"use client";

import { useState } from "react";

import RiwayatList from "../../../component/user/Riwayat/RiwayatList";
import RiwayatItem from "../../../component/user/Riwayat/RiwayatItem";
import EmptyRiwayat from "../../../component/user/Riwayat/EmptyRiwayat";

export default function RiwayatPage() {
    const [riwayat, setRiwayat] = useState([
        {
            id: 1,
            judul: "Belajar React dari Nol",
            gambar: "/books/book1.jpg",
            tanggalPinjam: "2025-10-01",
            tanggalKembali: "2025-10-10",
            status: "Dikembalikan",
        },
        {
            id: 2,
            judul: "Pemrograman JavaScript Lanjut",
            gambar: "/books/book2.jpg",
            tanggalPinjam: "2025-11-01",
            tanggalKembali: "2025-11-15",
            status: "Dipinjam",
        },
    ]);

    const formatTanggal = (tanggal) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(tanggal).toLocaleDateString("id-ID", options);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-[#1E3A8A] mb-6">
                Riwayat Peminjaman
            </h1>

            {riwayat.length === 0 ? (
                <EmptyRiwayat />
            ) : (
                <RiwayatList data={riwayat} formatTanggal={formatTanggal} />
            )}
        </div>
    );
}
