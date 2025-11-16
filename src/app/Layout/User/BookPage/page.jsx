"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export default function BooksPage() {
  const books = [
    { id: 1, title: "The Psychology of Money", author: "Morgan Housel", cover: "/psychology.png", rating: 4.9 },
    { id: 2, title: "How Innovation Works", author: "Matt Ridley", cover: "/innovation.png", rating: 4.8 },
    { id: 3, title: "Company of One", author: "Paul Jarvis", cover: "/company.png", rating: 4.7 },
    { id: 4, title: "Stupore E Tremori", author: "Amelie Nothomb", cover: "/stupore.png", rating: 4.6 },
    { id: 5, title: "The Bees", author: "Laline Paull", cover: "/bees.png", rating: 4.5 },
    { id: 6, title: "Real Help", author: "Ayodeji Awosika", cover: "/realhelp.png", rating: 4.8 },
    { id: 7, title: "The Fact of a Body", author: "Alexandria Marzano", cover: "/fact.png", rating: 4.9 },
    { id: 8, title: "The Room", author: "Jonas Karlsson", cover: "/room.png", rating: 4.3 },
    { id: 9, title: "Through the Breaking", author: "Cate Emond", cover: "/breaking.png", rating: 4.6 },
    { id: 10, title: "Learn Bahasa", author: "John Doe", cover: "/bahasa.png", rating: 4.2 },
    { id: 11, title: "Matematika Dasar", author: "Jane Doe", cover: "/pelajaran.png", rating: 4.4 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-10 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-[#1E3A8A]">All Books</h2>
        <Link
          href="/Layout/User/Home"
          className="text-sm text-blue-700 hover:underline font-medium flex items-center gap-1"
        >
          ← Back
        </Link>
      </div>

      {/* Grid Buku */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {books.map((book) => (
          <motion.div
            key={book.id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden flex flex-col group"
          >
            {/* Cover */}
            <div className="relative">
              <Image
                src={book.cover}
                alt={book.title}
                width={250}
                height={320}
                className="object-cover w-full h-[250px] transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Star size={12} fill="white" /> {book.rating}
              </div>
            </div>

            {/* Info Buku */}
            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 text-base leading-snug line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-gray-500 text-sm mb-3">{book.author}</p>
              </div>

              <Link
                href={`/Layout/User/Detail/${book.id}`} // ✅ path sudah benar
                className="mt-auto text-center px-4 py-2 text-sm bg-[#1E3A8A] text-white rounded-lg hover:bg-[#13296E] transition"
              >
                Lihat Detail
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
