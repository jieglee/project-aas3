"use client";

import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function ActionButtons({ book, id }) {

    async function addWishlist() {
        const res = await fetch("/api/wishlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                buku_id: Number(id),
                user_id: 1, // nanti ganti user login
            }),
        });

        const data = await res.json();

        if (data.success) {
            toast.success(`${book.judul} berhasil ditambahkan ke wishlist!`);
        } else {
            toast.error("Gagal menambahkan wishlist.");
        }
    }

    return (
        <div className="border-t pt-6 mt-6">
            <div className="flex flex-col sm:flex-row gap-3">
                <Link
                    href={`/user/borrow/${id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-center transition-colors shadow-sm hover:shadow-md"
                >
                    Pinjam Buku
                </Link>

                <button
                    onClick={addWishlist}
                    className="flex-1 sm:flex-initial border-2 border-red-300 hover:border-red-500 hover:bg-red-50 px-6 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                    <FaHeart className="text-red-500" />
                    <span className="text-red-600">Wishlist</span>
                </button>
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Informasi Peminjaman</p>
                        <p>Masa peminjaman maksimal 7 hari. Keterlambatan pengembalian dikenakan denda.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}