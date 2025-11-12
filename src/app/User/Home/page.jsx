"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  // ===== DATA =====
  const recommended = [
    {
      title: "The Psychology of Money",
      author: "Morgan Housel",
      cover: "/psychology.png",
    },
    {
      title: "How Innovation Works",
      author: "Matt Ridley",
      cover: "/innovation.png",
    },
    {
      title: "Company of One",
      author: "Paul Jarvis",
      cover: "/company.png",
    },
    {
      title: "Stupore E Tremori",
      author: "Amelie Nothomb",
      cover: "/stupore.png",
    },
  ];

  const categories = [
    "All",
    "Sci-Fi",
    "Fantasy",
    "Drama",
    "Business",
    "Education",
    "Geography",
  ];

  const books = [
    {
      title: "The Bees",
      author: "Laline Paull",
      cover: "/bees.png",
      category: "Fantasy",
    },
    {
      title: "Real Help",
      author: "Ayodeji Awosika",
      cover: "/realhelp.png",
      category: "Business",
    },
    {
      title: "The Fact of a Body",
      author: "Alexandria Marzano",
      cover: "/fact.png",
      category: "Drama",
    },
    {
      title: "The Room",
      author: "Jonas Karlsson",
      cover: "/room.png",
      category: "Drama",
    },
    {
      title: "Through the Breaking",
      author: "Cate Emond",
      cover: "/breaking.png",
      category: "Sci-Fi",
    },
  ];

  // ===== STATE =====
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBooks =
    activeCategory === "All"
      ? books
      : books.filter((book) => book.category === activeCategory);

  // ===== RENDER =====
  return (
    <div className="min-h-screen bg-gray-50 px-10 py-10">
      {/* ===== SECTION: RECOMMENDED ===== */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recommended</h2>
          <Link
            href="#"
            className="text-blue-600 font-medium hover:underline flex items-center gap-1"
          >
            See All →
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {recommended.map((book, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="min-w-[180px] bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col items-center"
            >
              <Image
                src={book.cover}
                alt={book.title}
                width={120}
                height={180}
                className="rounded-md mb-3"
              />
              <h3 className="font-semibold text-gray-800 text-center">
                {book.title}
              </h3>
              <p className="text-gray-500 text-sm text-center">
                {book.author}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== SECTION: CATEGORIES ===== */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Categories</h2>

        {/* Filter Buttons */}
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

        {/* Book Cards */}
        <div className="flex gap-6 flex-wrap justify-center">
          {filteredBooks.map((book, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-4 flex flex-col items-center w-[180px]"
            >
              <div className="relative">
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={130}
                  height={190}
                  className="rounded-md mb-3"
                />
                {/* Example Rating Badge */}
                {book.title === "The Fact of a Body" && (
                  <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                    ★ 4.8
                  </span>
                )}
              </div>

              <h3 className="font-semibold text-gray-800 text-center">
                {book.title}
              </h3>
              <p className="text-gray-500 text-sm text-center">
                {book.author}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
