"use client";
import { useEffect, useState } from "react";

export default function Statistik() {
  const [books, setBooks] = useState(0);
  const [borrowed, setBorrowed] = useState(0);
  const [types, setTypes] = useState(0);

  useEffect(() => {
    const animateValue = (setter, target, duration) => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        setter(Math.floor(start));
      }, 16);
    };

    animateValue(setBooks, 150, 4000);
    animateValue(setBorrowed, 300, 4000);
    animateValue(setTypes, 50, 4000);
  }, []);

  return (
    <section className="relative z-10 -mt-16 w-full flex flex-col md:flex-row items-center justify-center gap-8 px-6">
      <div className="bg-white rounded-2xl shadow-md w-64 h-36 flex flex-col items-center justify-center transition-transform hover:scale-105">
        <span className="material-symbols-outlined text-blue-700 text-5xl mb-2">menu_book</span>
        <h2 className="text-3xl font-bold text-blue-800">{books}+</h2>
        <p className="text-gray-700 font-medium">Buku tersedia</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-blue-300 w-72 h-40 flex flex-col items-center justify-center scale-105 hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-blue-700 text-5xl mb-2">auto_stories</span>
        <h2 className="text-3xl font-bold text-blue-800">{borrowed}+</h2>
        <p className="text-gray-700 font-medium">Buku telah terpinjam</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md w-64 h-36 flex flex-col items-center justify-center transition-transform hover:scale-105">
        <span className="material-symbols-outlined text-blue-700 text-5xl mb-2">menu_book</span>
        <h2 className="text-3xl font-bold text-blue-800">{types}+</h2>
        <p className="text-gray-700 font-medium">Jenis Buku</p>
      </div>
    </section>
  );
}
