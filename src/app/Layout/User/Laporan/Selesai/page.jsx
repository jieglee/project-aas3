"use client";

import { CheckCircle, Home } from "lucide-react";
import Link from "next/link";

export default function LaporanSelesai() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-blue-100">

                <CheckCircle className="text-green-600 mx-auto mb-4" size={70} />

                <h1 className="text-2xl font-bold text-gray-800 mb-3">
                    Laporan Berhasil Dikirim
                </h1>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Terima kasih!
                    Laporanmu sudah kami terima dan akan segera diproses oleh petugas perpustakaan.
                </p>

                <div className="space-y-3">
                    <Link
                        href="/Layout/User/Home"
                        className="w-full block bg-blue-700 text-white font-semibold text-sm py-3 rounded-xl hover:bg-blue-800 transition"
                    >
                        Kembali ke Beranda
                    </Link>

                    <Link
                        href="/Layout/User/Riwayat"
                        className="w-full block bg-gray-200 text-gray-700 font-medium text-sm py-3 rounded-xl hover:bg-gray-300 transition"
                    >
                        Lihat Riwayat Peminjaman
                    </Link>
                </div>

            </div>
        </div>
    );
}
