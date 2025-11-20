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
        <div className="flex gap-3 mt-6">
            <Link
                href={`/user/borrow/${id}`}
                className="bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-sm"
            >
                Pinjam
            </Link>


            <button
                onClick={addWishlist}
                className="group border border-red-300 hover:border-red-600 
                transition-all px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-sm"
            >
                <FaHeart className="text-base text-red-400 group-hover:text-red-600 transition-all" />
                <span className="text-red-500 group-hover:text-red-700 transition-all">
                    Wishlist
                </span>
            </button>
        </div>
    );
}
