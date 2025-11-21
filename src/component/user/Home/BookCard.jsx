"use client";

import { BookOpen } from "lucide-react";

export default function BookCard({ book }) {
    const imgSrc = book.img ? `/buku/${book.img}` : "/api/placeholder/200/280";

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
            <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
                <img
                    src={imgSrc}
                    alt={book.judul}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Kategori */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-900">
                    {book.kategori}
                </div>

                {/* Stok Habis */}
                {book.stok === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                            Stok Habis
                        </span>
                    </div>
                )}
            </div>

            <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                    {book.judul}
                </h3>

                <p className="text-gray-500 text-xs flex items-center gap-1 mb-2">
                    <BookOpen className="w-3 h-3" />
                    {book.penulis}
                </p>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">{book.penerbit}</span>

                    <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            book.stok > 0
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        Stok: {book.stok}
                    </span>
                </div>
            </div>
        </div>
    );
}
