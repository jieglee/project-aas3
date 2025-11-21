"use client";

import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import BookCard from "../../../component/user/Home/BookCard";

export default function WishlistItem({ book, remove }) {
    if (!book) return null;

    // Normalisasi bentuk data
    const data = book?.buku ? book.buku : book;

    if (!data) {
        console.warn("DATA BUKU TIDAK VALID:", book);
        return null;
    }

    const bukuId = data?.buku_id || data?.id;

    return (
        <div className="relative">
            {/* tombol hapus */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    remove(book.wishlist_id);
                }}
                className="absolute -top-2 -right-2 z-20 bg-white rounded-full p-2.5 shadow-lg hover:scale-110"
            >
                <FaHeart className="text-red-500" size={18} />
            </button>

            {bukuId ? (
                <Link href={`/user/detail/${bukuId}`}>
                    <BookCard book={data} />
                </Link>
            ) : (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                    Data buku tidak valid
                </div>
            )}
        </div>
    );
}
