"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState([
        {
            title: "The Psychology of Money",
            author: "Morgan Housel",
            cover: "/psychology.png",
        },
        {
            title: "The Bees",
            author: "Laline Paull",
            cover: "/bees.png",
        },
        {
            title: "Real Help",
            author: "Ayodeji Awosika",
            cover: "/realhelp.png",
        },
    ]);

    const removeBook = (title) => {
        setWishlist((prev) => prev.filter((book) => book.title !== title));
    };

    return (
        <div className="min-h-screen bg-gray-50 px-8 py-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">My Wishlist</h2>

            {wishlist.length === 0 ? (
                <p className="text-gray-500 text-center mt-20">Belum ada buku di wishlist.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {wishlist.map((book, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
                        >
                            {/* Cover */}
                            <div className="flex justify-center p-4">
                                <Image
                                    src={book.cover}
                                    alt={book.title}
                                    width={150}
                                    height={200}
                                    className="rounded-md object-cover"
                                />
                            </div>

                            {/* Info */}
                            <div className="px-4 pb-4 flex flex-col flex-1 justify-between">
                                <div className="text-center">
                                    <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                                        {book.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">{book.author}</p>
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-col gap-2 mt-4">
                                    <Link
                                        href="#"
                                        className="w-full text-center px-4 py-2 bg-[#1E3A8A] text-white rounded-lg text-xs font-medium hover:bg-[#0E2565] transition"
                                    >
                                        Lihat Detail
                                    </Link>
                                    <button
                                        onClick={() => removeBook(book.title)}
                                        className="w-full text-center px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
