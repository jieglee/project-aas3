"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BookCard({ book }) {
  if (!book) return <p>Buku tidak ditemukan</p>;

  // ---- FIX PALING AMAN ----
  // Cek apakah img adalah URL lengkap (http/https)
  const isValidUrl = (url) => {
    if (!url || typeof url !== "string") return false;
    return url.startsWith("http://") || url.startsWith("https://");
  };

  // Tentukan URL gambar yang pasti valid
  const imageSrc = isValidUrl(book.img)
    ? book.img
    : "/placeholder-book.jpg"; // fallback aman

  return (
    <motion.div
      className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative w-full h-64">
        <Image
          src={imageSrc}
          alt={book.judul || "Book Image"}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold">{book.judul}</h2>
        <p className="text-gray-600">{book.penulis}</p>
        <p className="mt-2 text-sm text-gray-500">{book.deskripsi}</p>
      </div>
    </motion.div>
  );
}
