"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BookCard({ book }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white shadow-lg rounded-2xl p-5 flex flex-col md:flex-row items-center md:items-start gap-5 cursor-pointer transition-transform"
    >
      {book ? (
        <>
          <Image
            src={`/buku/${book.img}`}
            width={160}
            height={220}
            className="rounded-xl shadow-md"
            alt={book.judul || "Book cover"}
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1 text-blue-800">{book.judul}</h2>
            <p className="text-gray-600 mb-2">{book.penulis}</p>
            <p className="text-gray-700 text-sm ">{book.deskripsi}</p>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Buku tidak ditemukan</p>
      )}
    </motion.div>
  );
}
