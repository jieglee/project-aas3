"use client";
import Image from "next/image";
import Link from "next/link";

export default function Koleksi() {
  const books = [
    { id: 1, title: "Hans", author: "Risa Saraswati", img: "/hans.png" },
    { id: 2, title: "Madre", author: "Dee Lestari", img: "/hans.png" },
    { id: 3, title: "Laskar Pelangi", author: "Andrea Hirata", img: "/hans.png" },
    { id: 4, title: "Negeri 5 Menara", author: "Ahmad Fuadi", img: "/hans.png" },
  ];

  return (
    <section
      id="koleksi"
      className="w-full py-20 bg-gray-50 px-6 md:px-20 text-center"
    >
      <h2 className="text-3xl font-bold mb-12">
        <span className="text-black">Koleksi Buku</span>{" "}
        <span className="text-[#1E3A8A]">Populer</span>
      </h2>

      {/* Grid 4 buku */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white shadow-lg rounded-2xl p-6 w-[230px] flex flex-col items-center justify-between transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <Image
              src={book.img}
              alt={book.title}
              width={160}
              height={200}
              className="rounded-md mb-4 object-cover"
            />

            <h3 className="font-bold text-lg text-gray-800">{book.title}</h3>
            <p className="text-gray-500 text-sm mb-4">{book.author}</p>

            <Link
              href="/login"
              className="bg-[#1E3A8A] text-white text-sm px-6 py-2 rounded-full hover:bg-blue-800 transition-transform transform hover:scale-105"
            >
              Pinjam
            </Link>
          </div>
        ))}
      </div>

      {/* Tombol lihat semua koleksi */}
      <div className="mt-12">
        <Link
          href="/login"
          className="text-blue-700 font-medium hover:underline transition"
        >
          Lihat Semua Koleksi
        </Link>
      </div>
    </section>
  );
}
