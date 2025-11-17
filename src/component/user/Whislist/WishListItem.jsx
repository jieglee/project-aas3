"use client";

import Image from "next/image";
import Link from "next/link";

export default function WishlistItem({ book, remove }) {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="flex justify-center p-4">
                <Image
                    src={book.cover}
                    alt={book.title}
                    width={150}
                    height={200}
                    className="rounded-md object-cover"
                />
            </div>

            <div className="px-4 pb-4 flex flex-col flex-1 justify-between">
                <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                        {book.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{book.author}</p>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                    <Link
                        href="#"
                        className="w-full text-center px-4 py-2 bg-[#1E3A8A] text-white rounded-lg text-xs font-medium hover:bg-[#0E2565] transition"
                    >
                        Lihat Detail
                    </Link>

                    <button
                        onClick={() => remove(book.title)}
                        className="w-full text-center px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}
