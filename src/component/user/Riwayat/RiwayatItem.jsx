"use client";

import { Calendar, Clock, Info } from "lucide-react";
import Image from "next/image";

export default function RiwayatItem({ item, formatTanggal }) {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 hover:shadow-md transition">
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
                className={`mt-3 flex items-center gap-2 text-sm font-medium ${
                    item.status === "Dipinjam" ? "text-yellow-600" : "text-green-600"
                }`}
            >
                <Info size={16} />
                <span>{item.status}</span>
            </div>
        </div>
    );
}
