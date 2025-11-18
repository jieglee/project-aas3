"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

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

  if (loading) {
    return (
      <section className="w-full py-20 bg-gray-50 px-6 md:px-20 text-center">
        <div className="text-gray-500">Memuat buku...</div>
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

      {/* Grid 4 buku - Hanya foto, judul, dan penulis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {books.map((book) => {
          const imgSrc = book.img ? `/buku/${book.img}` : "/placeholder.png";
          
          return (
            <Link key={book.id} href="/login" className="w-full max-w-[200px]">
              <div className="bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col cursor-pointer overflow-hidden h-full w-full">
                {/* Cover */}
                <div className="relative w-full h-70">
                  <Image
                    src={imgSrc}
                    alt={book.judul}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info - Hanya judul dan penulis */}
                <div className="p-4 flex flex-col items-center text-center">
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                    {book.judul}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">{book.penulis}</p>
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
          className="text-blue-700 font-medium hover:underline transition text-sm"
        >
          Lihat Semua Koleksi →
        </Link>
      </div>
    </section>
  );
}