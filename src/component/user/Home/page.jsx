"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const recommended = [
    {
      id: 1,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      cover: "/psychology.png",
    },
    {
      id: 2,
      title: "How Innovation Works",
      author: "Matt Ridley",
      cover: "/innovation.png",
    },
    {
      id: 3,
      title: "Company of One",
      author: "Paul Jarvis",
      cover: "/company.png",
    },
    {
      id: 4,
      title: "Stupore E Tremori",
      author: "Amelie Nothomb",
      cover: "/stupore.png",
    },
  ];

  const categories = [
    "All",
    "Fantasi",
    "PKL",
    "Horor",
    "Business",
    "Education",
    "Bahasa",
    "Pelajaran",
  ];

  const books = [
    {
      id: 5,
      title: "The Bees",
      author: "Laline Paull",
      cover: "/bees.png",
      category: "Fantasi",
    },
    {
      id: 6,
      title: "Real Help",
      author: "Ayodeji Awosika",
      cover: "/realhelp.png",
      category: "Business",
    },
    {
      id: 7,
      title: "The Fact of a Body",
      author: "Alexandria Marzano",
      cover: "/fact.png",
      category: "Horor",
    },
    {
      id: 8,
      title: "The Room",
      author: "Jonas Karlsson",
      cover: "/room.png",
      category: "PKL",
    },
    {
      id: 9,
      title: "Through the Breaking",
      author: "Cate Emond",
      cover: "/breaking.png",
      category: "Education",
    },
    {
      id: 10,
      title: "Learn Bahasa",
      author: "John Doe",
      cover: "/bahasa.png",
      category: "Bahasa",
    },
    {
      id: 11,
      title: "Matematika Dasar",
      author: "Jane Doe",
      cover: "/pelajaran.png",
      category: "Pelajaran",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBooks =
    activeCategory === "All"
      ? books
      : books.filter((book) => book.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 px-10 py-10">
      {/* ===== RECOMMENDED ===== */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recommended</h2>
          <Link
            href="/Layout/User/BookPage"
            className="text-blue-600 font-medium hover:underline flex items-center gap-1"
          >
            See All →
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {recommended.map((book) => (
            <motion.div
              key={book.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="min-w-[200px] bg-white rounded-2xl shadow-md hover:shadow-lg transition flex flex-col"
            >
              <div className="relative w-full h-56 overflow-hidden rounded-t-2xl">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">{book.author}</p>
                </div>

                <Link
                  href={`/Layout/User/Detail/${book.id}`}
                  className="mt-3 text-center text-sm bg-[#1E3A8A] text-white py-1.5 rounded-lg hover:bg-[#0E2565] transition"
                >
                  Lihat Detail
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Categories</h2>

        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredBooks.map((book) => (
            <motion.div
              key={book.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition flex flex-col"
            >
              <div className="relative w-full h-56 overflow-hidden rounded-t-2xl">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">{book.author}</p>
                </div>

                <Link
                  href={`/Layout/User/Detail/${book.id}`}
                  className="mt-3 text-center text-sm bg-[#1E3A8A] text-white py-1.5 rounded-lg hover:bg-[#0E2565] transition"
                >
                  Lihat Detail
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
