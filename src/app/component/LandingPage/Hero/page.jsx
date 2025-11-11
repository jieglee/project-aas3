"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"; // ini juga wajib ditambahkan, kamu lupa import Link!

export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center text-white w-full">
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden rounded-b-[60px]">
          <Image
            src="/FotoTB1.png"
            alt="Gedung TB"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>

        {/* Navbar */}
        <nav
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50
          flex items-center justify-between w-[60%] max-w-5xl
          backdrop-blur-md bg-white/70 rounded-full px-8 py-3 shadow-md transition-all duration-500
          ${isScrolled ? "bg-white/90" : "bg-white/70"}`}
        >
          <h1 className="text-lg font-bold text-[#1E3A8A]">PusTBaka</h1>
          <ul className="flex space-x-8 text-gray-800 font-medium">
            <li
              className="hover:text-blue-700 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Beranda
            </li>
            <li
              className="hover:text-blue-700 cursor-pointer"
              onClick={() =>
                document.getElementById("tentang")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Tentang
            </li>
            <li
              className="hover:text-blue-700 cursor-pointer"
              onClick={() =>
                document.getElementById("koleksi")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Koleksi
            </li>
            <li
              className="hover:text-blue-700 cursor-pointer"
              onClick={() =>
                document.getElementById("fitur")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Fitur
            </li>
          </ul>
        </nav>

        {/* Hero Text */}
        <div className="px-6 mt-20 z-10 transition-all duration-700 ease-in-out transform hover:scale-[1.01]">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Buku Ngumpul, Taruna Unggul!
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Temukan ilmu baru setiap klik di PusTBaka.
          </p>

          <div className="flex justify-center space-x-4">
            <button
  onClick={() =>
    document.getElementById("koleksi")?.scrollIntoView({ behavior: "smooth" })
  }
  className="px-6 py-3 rounded-full bg-white text-blue-700 font-semibold shadow hover:scale-105 transition-transform"
>
  Lihat Koleksi
</button>

            <Link
              href="/login"
              className="px-6 py-3 rounded-full bg-[#1E3A8A] text-white font-semibold shadow hover:bg-blue-800 hover:scale-105 transition-transform inline-block"
            >
              Mulai Sekarang
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
