"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

export default function WishlistItem({ book, remove }) {
    return (
        <div className="relative">
            {/* Tombol hapus wishlist */}
            <button
                onClick={() => remove(book.wishlist_id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-600 z-10 transition"
            >
                <FaHeart size={20} />
            </button>

            {/* Klik menuju detail buku */}
            <Link href={`/user/detail/${book.buku_id}`}>
                <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer">
                    {/* Cover */}
                    <div className="flex justify-center p-4">
                        <Image
                            src={book.img ? `/buku/${book.img}` : "/placeholder.png"}
                            alt={book.judul}
                            width={150}
                            height={200}
                            className="rounded-md object-cover"
                        />
                    </div>

                    {/* Info */}
                    <div className="px-4 pb-4 flex flex-col flex-1 justify-between text-center">
                        <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                            {book.judul}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">{book.penulis}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
