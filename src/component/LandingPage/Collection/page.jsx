"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";

export default function Koleksi() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('/api/buku');
        const data = await response.json();
        // Ambil 4 buku pertama
        const fourBooks = data.slice(0, 4);
        setBooks(fourBooks);
      } catch (error) {
        console.error("Gagal mengambil data buku:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  // TAMBAHKAN: Function untuk clean image URL (konsisten dengan BookCard)
  const cleanImageUrl = (imgPath) => {
    if (!imgPath) {
      return "/api/placeholder/200/280";
    }
    
    // Handle corrupt data (ada URL yang digabung)
    const httpsIndex = imgPath.indexOf('https://');
    if (httpsIndex > 0) {
      console.log("🔧 Fixed corrupt URL in Koleksi:", imgPath);
      return imgPath.substring(httpsIndex);
    }
    
    const httpIndex = imgPath.indexOf('http://');
    if (httpIndex > 0) {
      console.log("🔧 Fixed corrupt URL in Koleksi:", imgPath);
      return imgPath.substring(httpIndex);
    }
    
    // Jika sudah URL lengkap (https:// atau http://)
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      return imgPath;
    }
    
    // Jika path relatif (mulai dengan /)
    if (imgPath.startsWith('/')) {
      return imgPath;
    }
    
    // Jika hanya nama file, tambahkan prefix /buku/
    return `/buku/${imgPath}`;
  };

  if (loading) {
    return (
      <section className="w-full py-20 bg-gray-50 px-6 md:px-20 text-center">
        <div className="inline-flex items-center gap-2 text-gray-500">
          <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          <span>Memuat buku...</span>
        </div>
      </section>
    );
  }

  return (
    <section
      id="koleksi"
      className="w-full py-20 bg-gray-50 px-6 md:px-20 text-center"
    >
      <h2 className="text-3xl font-bold mb-12">
        <span className="text-black">Koleksi Buku</span>{" "}
        <span className="text-[#1E3A8A]">Populer</span>
      </h2>

      {/* Grid 4 buku dengan style sama seperti HomePage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book) => {
          // PERBAIKAN: Gunakan cleanImageUrl function
          const imgSrc = cleanImageUrl(book.img);
          const kategori = book.kategori || "Tanpa Kategori";
          const stok = book.stok ?? 0;
          const penerbit = book.penerbit || "-";

          return (
            <Link key={book.id} href="/login">
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
                <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
                  {/* PERBAIKAN: Tambahkan error handling */}
                  <img
                    src={imgSrc}
                    alt={book.judul || "Book Cover"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      console.error("❌ Koleksi image failed to load:", imgSrc);
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="280"%3E%3Crect fill="%23e5e7eb" width="200" height="280"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%239ca3af" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
                    }}
                    onLoad={() => {
                      console.log("✅ Koleksi image loaded:", book.judul);
                    }}
                  />
                  
                  {/* Kategori Badge */}
                  <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                    {kategori}
                  </div>
                  
                  {/* Stok Habis Overlay */}
                  {stok === 0 && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        Stok Habis
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                    {book.judul || "-"}
                  </h3>
                  
                  <p className="text-gray-500 text-xs flex items-center gap-1 mb-2">
                    <BookOpen className="w-3 h-3" />
                    {book.penulis || "-"}
                  </p>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">{penerbit}</span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        stok > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      Stok: {stok}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Tombol lihat semua koleksi */}
      <div className="mt-12">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-blue-700 font-medium hover:text-blue-800 hover:gap-3 transition-all text-sm group"
        >
          <span>Lihat Semua Koleksi</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </section>
  );
}