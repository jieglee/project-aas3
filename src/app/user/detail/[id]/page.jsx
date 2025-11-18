"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function DetailPage() {
    const { id } = useParams(); // ✅ INI YANG BENAR UNTUK CLIENT COMPONENT
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBook() {
            try {
                const res = await fetch(`/api/buku/${id}`);

                if (!res.ok) {
                    setBook(null);
                    return;
                }

                const data = await res.json();
                setBook(data);
            } catch (err) {
                console.error("Error fetching:", err);
            } finally {
                setLoading(false);
            }
        }

        if (id) fetchBook(); // ⛔ jangan fetch sebelum id ada
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-600">
                Loading buku...
            </div>
        );
    }

    if (!book) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-gray-600 p-4">
                <h2 className="text-xl font-bold mb-4">Buku Tidak Ditemukan</h2>
                <p className="text-center mb-4">
                    Buku dengan ID <strong>{id}</strong> tidak ditemukan.
                </p>
                <Link 
                    href="/user/home"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                    Kembali ke Home
                </Link>
            </div>
        );
    }

    return (
        <>
            <Toaster />
            <div className="p-6 md:p-10 max-w-5xl mx-auto">
                <button 
                    onClick={() => window.history.back()}
                    className="text-blue-600 hover:text-blue-800 mb-6 flex items-center gap-2 text-sm font-medium"
                >
                    ← Kembali
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
                    <div className="flex justify-center items-center">
                        <img 
                            src={book.img ? `/buku/${book.img}` : "/placeholder.png"}
                            alt={book.judul}
                            className="rounded-xl shadow-md max-w-[300px] w-full"
                        />
                    </div>

                    <div>
                        <div className="space-y-3">
                            <h1 className="text-2xl font-bold text-gray-800">{book.judul}</h1>
                            <p className="text-gray-700 text-sm">
                                <span className="font-semibold">Penulis:</span> {book.penulis}
                            </p>
                            <p className="text-gray-700 text-sm leading-relaxed">{book.deskripsi}</p>
                            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                                <p><span className="font-semibold">Penerbit:</span> {book.penerbit}</p>
                                <p><span className="font-semibold">Tahun Terbit:</span> {book.tahun_terbit}</p>
                                <p><span className="font-semibold">Stok:</span> {book.stok}</p>
                                <p><span className="font-semibold">Kategori:</span> {book.kategori}</p>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => window.location.href = `/Layout/User/Borrow?id=${id}`}
                                className="bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-sm"
                            >
                                Pinjam
                            </button>

                            <button
                                onClick={() => alert(`${book.judul} ditambahkan ke wishlist ❤️`)}
                                className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-sm"
                            >
                                ❤️ Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
