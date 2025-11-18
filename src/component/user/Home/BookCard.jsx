"use client";

import Image from "next/image";
import Link from "next/link";

export default function BookCard({ book }) {
    const imgSrc = book.img
        ? `/buku/${book.img}`   // 🔥 otomatis ambil gambar dari public/buku
        : "/placeholder.png";   // fallback

    return (
        <Link href={`/user/detail/${book.id}`}>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg flex flex-col cursor-pointer">
                {/* Cover */}
                <div className="relative w-full h-56 overflow-hidden rounded-t-2xl">
                    <Image
                        src={imgSrc}
                        alt={book.judul}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-grow text-center">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                        {book.judul}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">{book.penulis}</p>
                </div>
            </div>
        </Link>
    );
}
