"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { FaHeart } from "react-icons/fa";

export default function DetailPage() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [wishlistLoading, setWishlistLoading] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const user_id = 1; // TODO: ganti sesuai user login

    // Ambil detail buku
    useEffect(() => {
        async function fetchBook() {
            try {
                const res = await fetch(`/api/buku/${id}`);
                if (!res.ok) return setBook(null);
                const data = await res.json();
                setBook(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        async function checkWishlist() {
            try {
                const res = await fetch("/api/wishlist");
                const data = await res.json();
                if (Array.isArray(data)) {
                    const exists = data.some(
                        (item) => item.buku_id === Number(id) && item.user_id === user_id
                    );
                    setIsWishlisted(exists);
                }
            } catch (err) {
                console.log(err);
            }
        }

        if (id) {
            fetchBook();
            checkWishlist();
        }
    }, [id]);

    // Tambah ke wishlist
    async function addWishlist() {
        if (wishlistLoading) return;

        setWishlistLoading(true);
        try {
            const res = await fetch("/api/wishlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ buku_id: Number(id), user_id }),
            });
            const data = await res.json();

            if (data.success) {
                toast.success(`${book.judul} berhasil ditambahkan ke wishlist`);
                setIsWishlisted(true);
            } else {
                toast.error("Gagal menambahkan wishlist");
            }
        } catch (err) {
            console.error(err);
            toast.error("Terjadi kesalahan server");
        } finally {
            setWishlistLoading(false);
        }
    }

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
                <Link href="/user/home" className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                    Kembali ke Home
                </Link>
            </div>
        );
    }

    return (
        <>
            <Toaster position="top-right" />
            <div className="p-6 md:p-10 max-w-5xl mx-auto">
                <button
                    onClick={() => window.history.back()}
                    className="text-blue-600 hover:text-blue-800 mb-6 flex items-center gap-2 text-sm font-medium"
                >
                    ← Kembali
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
                    {/* Gambar Buku */}
                    <div className="flex justify-center items-center">
                        <img
                            src={book.img ? `/buku/${book.img}` : "/placeholder.png"}
                            alt={book.judul}
                            className="rounded-xl shadow-md max-w-[300px] w-full"
                        />
                    </div>

                    {/* Detail Buku */}
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

                        {/* Tombol */}
                        <div className="flex gap-3 mt-6">
                            <Link
                                href={`/Layout/User/Borrow?id=${id}`}
                                className="bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-sm"
                            >
                                Pinjam
                            </Link>

                            <button
                                onClick={addWishlist}
                                disabled={isWishlisted || wishlistLoading}
                                className={`group border px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-sm
                                    ${isWishlisted ? 'border-gray-400 text-gray-400 cursor-not-allowed' : 'border-red-300 text-red-500 hover:border-red-600 hover:text-red-700'}
                                `}
                            >
                                <FaHeart className={`text-base transition-all ${isWishlisted ? 'text-gray-400' : 'text-red-400 group-hover:text-red-600'}`} />
                                {isWishlisted ? "Sudah di Wishlist" : "Wishlist"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
