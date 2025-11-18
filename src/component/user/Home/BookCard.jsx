"use client";

import Image from "next/image";

export default function BookCard({ book }) {
    const imgSrc = book.img ? `/buku/${book.img}` : "/placeholder.png";

    return (
        <div className="bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col cursor-pointer overflow-hidden max-w-[200px] mx-auto">
            <div className="relative w-full h-70">
                <Image
                    src={imgSrc}
                    alt={book.judul}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-3 flex flex-col items-center text-center">
                <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                    {book.judul}
                </h3>
                <p className="text-gray-500 text-xs mt-1">{book.penulis}</p>
            </div>
        </div>
    );
}