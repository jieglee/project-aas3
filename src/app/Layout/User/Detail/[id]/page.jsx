"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { FaHeart, FaPlus } from "react-icons/fa";
import { BsArrowLeftShort } from "react-icons/bs";

export default function Detail() {
  const router = useRouter();
  const { id } = useParams();
  const [book, setBook] = useState(null);

  const books = [
    {
      id: 1,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      cover: "/psychology.png",
      description:
        "Buku ini menjelaskan bagaimana pola pikir dan perilaku memengaruhi keputusan keuangan seseorang...",
      publisher: "Harper Business",
      year: 2020,
      category: "Finance",
      pages: 256,
    },
    {
      id: 2,
      title: "How Innovation Works",
      author: "Matt Ridley",
      cover: "/innovation.png",
      description:
        "Buku ini membahas bagaimana inovasi muncul dari kombinasi ide, percobaan, dan keberanian untuk gagal.",
      publisher: "HarperCollins",
      year: 2021,
      category: "Science",
      pages: 320,
    },
  ];

  useEffect(() => {
    const foundBook = books.find((b) => b.id === Number(id));
    setBook(foundBook);
  }, [id]);

  const handleAddWishlist = () => {
    toast.success(`${book.title} added to wishlist ❤️`);
  };

  if (!book)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading book details...
      </div>
    );

  return (
    <>
      <Toaster position="top-center" />

      <motion.div
        className="p-6 md:p-10 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Tombol Kembali */}
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-800 mb-6 flex items-center gap-2 text-sm font-medium"
        >
          <BsArrowLeftShort size={20} /> Kembali
        </button>

        {/* Detail Buku */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
          {/* Gambar Buku */}
          <motion.div
            className="flex justify-center items-center"
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <Image
              src={book.cover}
              alt={book.title}
              width={300}
              height={420}
              className="rounded-xl shadow-md"
            />
          </motion.div>

          {/* Informasi Buku */}
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-gray-800">{book.title}</h1>

            <p className="text-gray-500 text-sm">by {book.author}</p>

            <p className="text-gray-700 text-sm leading-relaxed mt-3">
              {book.description}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-gray-600">
              <p>
                <span className="font-semibold">Penerbit:</span>{" "}
                {book.publisher}
              </p>
              <p>
                <span className="font-semibold">Tahun:</span> {book.year}
              </p>
              <p>
                <span className="font-semibold">Kategori:</span>{" "}
                {book.category}
              </p>
              <p>
                <span className="font-semibold">Halaman:</span> {book.pages}
              </p>
            </div>

            {/* Tombol */}
            <div className="flex gap-3 mt-6">
              {/* PINJAM */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={() =>
                  router.push(`/Layout/User/Borrow?id=${id}`)
                }
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-sm"
              >
                <FaPlus /> Pinjam
              </motion.button>

              {/* WISHLIST */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleAddWishlist}
                className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-sm"
              >
                <FaHeart className="text-red-500" /> Wishlist
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
