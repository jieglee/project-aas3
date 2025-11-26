"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import Badge from "../../ui/Badge";
import ModalEditBuku from "./Modaleditbuku";
import BookImage from "./BookImage";

export default function TabelBuku({ books, reload }) {
    const [editingBook, setEditingBook] = useState(null);

    const handleDelete = async (id, judul) => {
        const deletePromise = fetch(`/api/buku/${id}`, {
            method: "DELETE"
        })
        .then(async (res) => {
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Gagal menghapus buku");
            }
            await reload();
            return data;
        });

        toast.promise(deletePromise, {
            loading: `Menghapus buku "${judul}"...`,
            success: "Buku berhasil dihapus!",
            error: (err) => err.message || "Terjadi kesalahan saat menghapus buku",
        });
    };

    const handleEdit = (book) => {
        setEditingBook(book);
    };

    const closeEditModal = () => {
        setEditingBook(null);
    };

    return (
        <>
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
                                    if (!buku.img || buku.img === '') {
                                        console.log(`⚠️ Buku "${buku.judul}" tidak punya gambar`);
                                    } else {
                                        console.log(`📷 ${buku.judul}: ${buku.img}`);
                                    }

                                return (
                                    <tr
                                        key={buku.id || i}
                                        className="border-b hover:bg-blue-50 transition-all duration-200"
                                    >
                                        {/* Gambar */}
                                        <td className="px-6 py-4">
                                            {buku.img ? (
                                                <BookImage
                                                    src={buku.img}
                                                    alt={buku.judul}
                                                    className="w-14 h-20 object-cover rounded-lg shadow-sm"
                                                    onError={(e) => {
                                                        // Ganti dengan placeholder yang valid
                                                        e.target.onerror = null; // Prevent infinite loop
                                                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="56" height="80" viewBox="0 0 56 80"><rect fill="%23e5e7eb" width="56" height="80"/><text x="50%" y="50%" text-anchor="middle" fill="%239ca3af" font-family="sans-serif" font-size="10" dy=".3em">No Image</text></svg>';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-14 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-400">
                                                    No Image
                                                </div>
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
                                            className={`px-6 py-4 text-center font-bold ${
                                                buku.stok > 5
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
                                                <button
                                                    onClick={() => handleEdit(buku)}
                                                    className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 transition shadow-sm"
                                                    title="Edit Buku"
                                                >
                                                    <Pencil size={18} className="text-yellow-700" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(buku.id, buku.judul)}
                                                    className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition shadow-sm"
                                                    title="Hapus Buku"
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

            {/* Modal Edit */}
            {editingBook && (
                <ModalEditBuku
                    book={editingBook}
                    close={closeEditModal}
                    refresh={reload}
                />
            )}
        </>
    );
}