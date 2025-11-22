"use client";
import Image from "next/image";
import { BookOpen, User, Building2 } from "lucide-react";

export default function BookCard({ book }) {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-2xl p-6 border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl group">
      {book ? (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Book Cover */}
          <div className="relative flex-shrink-0">
            <div className="relative w-40 h-56 mx-auto md:mx-0">
              <Image
                src={`/buku/${book.img}`}
                width={160}
                height={224}
                className="rounded-xl shadow-lg object-cover group-hover:shadow-2xl transition-shadow duration-300"
                alt={book.judul || "Book cover"}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            {/* Category Badge */}
            {book.kategori && (
              <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                {book.kategori}
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="flex-1 space-y-4">
            {/* Title & Author */}
            <div>
              <div className="flex items-start gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <h2 className="text-2xl font-bold text-blue-900 leading-tight group-hover:text-blue-700 transition-colors">
                  {book.judul}
                </h2>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <User className="w-4 h-4" />
                <p className="font-medium">{book.penulis}</p>
              </div>
              
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Building2 className="w-4 h-4" />
                <p>{book.penerbit} • {book.tahun_terbit}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                {book.deskripsi}
              </p>
            </div>

            {/* Stock Info */}
            <div className="flex items-center gap-3 pt-2">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md">
                <p className="text-xs font-semibold">Stok Tersedia</p>
                <p className="text-2xl font-bold">{book.stok}</p>
              </div>
              
              {book.stok > 0 ? (
                <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200">
                  <p className="text-xs font-semibold">✓ Tersedia</p>
                  <p className="text-sm">Siap Dipinjam</p>
                </div>
              ) : (
                <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg border border-red-200">
                  <p className="text-xs font-semibold">✗ Tidak Tersedia</p>
                  <p className="text-sm">Sedang Dipinjam</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">Buku tidak ditemukan</p>
        </div>
      )}
    </div>
  );
}