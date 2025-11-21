"use client";

import { Pencil, Trash2 } from "lucide-react";
import Badge from "../../ui/Badge";

export default function TabelBuku({ books, reload }) {
    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus buku ini?")) {
            reload(id);
        }
    };

    return (
        <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    {/* Header */}
                    <thead>
                        <tr className="bg-blue-900 text-white">
                            <th className="px-6 py-4">Gambar</th>
                            <th className="px-6 py-4">Judul Buku</th>
                            <th className="px-6 py-4">Penulis</th>
                            <th className="px-6 py-4">Kategori</th>
                            <th className="px-6 py-4 text-center">Stok</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4 text-center">Aksi</th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {books.length === 0 && (
                            <tr>
                                <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                    Tidak ada buku ditemukan...
                                </td>
                            </tr>
                        )}

                        {books.map((buku, i) => {
                            const stokColor =
                                buku.stok > 5 ? "success" : buku.stok > 0 ? "yellow" : "error";

                            return (
                                <tr
                                    key={buku.id || i}
                                    className="border-b hover:bg-blue-50 transition-all duration-200"
                                >
                                    {/* Gambar */}
                                    <td className="px-6 py-4">
                                        {buku.img && (
                                            <img
                                                src={buku.img}
                                                alt={buku.judul}
                                                className="w-14 h-20 object-cover rounded-lg shadow-sm"
                                            />
                                        )}
                                    </td>

                                    {/* Judul */}
                                    <td className="px-6 py-4 font-semibold text-gray-800">
                                        {buku.judul}
                                        <div className="text-xs text-gray-500 mt-1">
                                            {buku.penerbit} • {buku.tahun_terbit}
                                        </div>
                                    </td>

                                    {/* Penulis */}
                                    <td className="px-6 py-4 text-gray-700">{buku.penulis}</td>

                                    {/* Kategori */}
                                    <td className="px-6 py-4">
                                        <Badge color="blue">{buku.kategori}</Badge>
                                    </td>

                                    {/* Stok */}
                                    <td
                                        className={`px-6 py-4 text-center font-bold ${buku.stok > 5
                                                ? "text-green-600"
                                                : buku.stok > 0
                                                    ? "text-yellow-600"
                                                    : "text-red-600"
                                            }`}
                                    >
                                        {buku.stok}
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4 text-center">
                                        <Badge color={stokColor}>
                                            {buku.stok > 0 ? "Tersedia" : "Habis"}
                                        </Badge>
                                    </td>

                                    {/* Aksi */}
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 transition shadow-sm">
                                                <Pencil size={18} className="text-yellow-700" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(buku.id)}
                                                className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition shadow-sm"
                                            >
                                                <Trash2 size={18} className="text-red-700" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
