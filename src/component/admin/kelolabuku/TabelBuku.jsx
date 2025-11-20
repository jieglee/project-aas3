"use client";

import { Pencil, Trash2 } from "lucide-react";
import Badge from "../../ui/Badge";

export default function TabelBuku({ books, reload }) {
    return (
        <div className="mt-6 bg-white rounded-xl shadow-md border">
            <div className="overflow-x-auto rounded-xl">
                <table className="w-full border-collapse text-sm">
                    {/* Header */}
                    <thead>
                        <tr className="bg-blue-600 text-white text-left">
                            <th className="p-4">Judul</th>
                            <th className="p-4">Kategori</th>
                            <th className="p-4">Penulis</th>
                            <th className="p-4 text-center">Stok</th>
                            <th className="p-4 text-center">Status</th>
                            <th className="p-4 text-center">Aksi</th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {books.length === 0 && (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="p-6 text-center text-gray-500"
                                >
                                    Tidak ada buku ditemukan...
                                </td>
                            </tr>
                        )}

                        {books.map((buku, i) => (
                            <tr
                                key={buku.id || i}
                                className={`border-b hover:bg-gray-50 transition ${
                                    i % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                                }`}
                            >
                                <td className="p-4 font-medium">{buku.judul}</td>
                                <td className="p-4">
                                    <Badge variant="outline">{buku.kategori}</Badge>
                                </td>
                                <td className="p-4">{buku.penulis}</td>
                                <td className="p-4 text-center">{buku.stok}</td>
                                <td className="p-4 text-center">
                                    <Badge
                                        variant={
                                            buku.stok > 0 ? "success" : "danger"
                                        }
                                    >
                                        {buku.stok > 0 ? "Tersedia" : "Habis"}
                                    </Badge>
                                </td>
                                <td className="p-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 transition">
                                            <Pencil size={18} className="text-yellow-700" />
                                        </button>

                                        <button className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition">
                                            <Trash2 size={18} className="text-red-700" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
