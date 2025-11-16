"use client";
import { BookOpen, Calendar, Clock, Info } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Riwayat() {
    // Data dummy untuk contoh
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
                <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
                    <BookOpen size={60} className="mb-4 text-blue-400" />
                    <p className="text-lg font-medium">Belum ada riwayat peminjaman</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {riwayat.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 hover:shadow-md transition"
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-20 overflow-hidden rounded-md">
                                    <Image
                                        src={item.gambar}
                                        alt={item.judul}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-gray-800 text-sm">
                                        {item.judul}
                                    </h2>
                                    <div className="flex items-center text-gray-500 text-xs mt-1 gap-1">
                                        <Calendar size={14} />
                                        <span>{formatTanggal(item.tanggalPinjam)}</span>
                                    </div>
                                    <div className="flex items-center text-gray-500 text-xs mt-1 gap-1">
                                        <Clock size={14} />
                                        <span>Kembali: {formatTanggal(item.tanggalKembali)}</span>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`mt-3 flex items-center gap-2 text-sm font-medium ${item.status === "Dipinjam"
                                        ? "text-yellow-600"
                                        : "text-green-600"
                                    }`}
                            >
                                <Info size={16} />
                                <span>{item.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
