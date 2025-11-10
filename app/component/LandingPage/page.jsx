"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [books, setBooks] = useState(0);
  const [borrowed, setBorrowed] = useState(0);
  const [types, setTypes] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animasi angka berjalan
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
    <div className="flex flex-col items-center w-full overflow-hidden bg-white">
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

        {/* ===== Navbar ===== */}
        <nav
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50
          flex items-center justify-between w-[60%] max-w-5xl
          backdrop-blur-md bg-white/70 rounded-full px-8 py-3 shadow-md transition-all duration-500
          ${isScrolled ? "bg-white/90" : "bg-white/70"}`}
        >
          <h1 className="text-lg font-bold text-blue-700">PusTBaka</h1>
          <ul className="flex space-x-8 text-gray-800 font-medium">
            <li className="hover:text-blue-700 cursor-pointer">Beranda</li>
            <li className="hover:text-blue-700 cursor-pointer">Tentang</li>
            <li className="hover:text-blue-700 cursor-pointer">Koleksi</li>
            <li className="hover:text-blue-700 cursor-pointer">Fitur</li>
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
            <button className="px-6 py-3 rounded-full bg-white text-blue-700 font-semibold shadow hover:scale-105 transition-transform">
              Lihat Koleksi
            </button>
            <button className="px-6 py-3 rounded-full bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 hover:scale-105 transition-transform">
              Mulai Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* ===== Statistik Section (animated numbers) ===== */}
      <section className="relative z-10 -mt-16 w-full flex flex-col md:flex-row items-center justify-center gap-8 px-6">
        {/* Kartu 1 */}
        <div className="bg-white rounded-2xl shadow-md w-64 h-36 flex flex-col items-center justify-center transition-transform hover:scale-105">
          <div className="text-blue-700 text-5xl mb-2">
            <span className="material-symbols-outlined">menu_book</span>
          </div>
          <h2 className="text-3xl font-bold text-blue-800">{books}+</h2>
          <p className="text-gray-700 font-medium">Buku tersedia</p>
        </div>

        {/* Kartu 2 (tengah - lebih menonjol) */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-300 w-72 h-40 flex flex-col items-center justify-center scale-105 hover:scale-110 transition-transform">
          <div className="text-blue-700 text-5xl mb-2">
            <span className="material-symbols-outlined">auto_stories</span>
          </div>
          <h2 className="text-3xl font-bold text-blue-800">{borrowed}+</h2>
          <p className="text-gray-700 font-medium">Buku telah terpinjam</p>
        </div>

        {/* Kartu 3 */}
        <div className="bg-white rounded-2xl shadow-md w-64 h-36 flex flex-col items-center justify-center transition-transform hover:scale-105">
          <div className="text-blue-700 text-5xl mb-2">
            <span className="material-symbols-outlined">menu_book</span>
          </div>
          <h2 className="text-3xl font-bold text-blue-800">{types}+</h2>
          <p className="text-gray-700 font-medium">Jenis Buku</p>
        </div>
      </section>


      {/* ===== TENTANG SECTION ===== */}
      <section
        id="tentang"
        className="w-full bg-white py-20 px-8 md:px-20 flex flex-col items-center justify-center gap-10"
      >
        <h2 className="text-3xl font-bold text-center mb-10">
          <span className="text-gray-800">Tentang</span>{" "}
          <span className="text-blue-700">PusTBaka</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/tentang.png"
              alt="Ilustrasi PusTBaka"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left">
            <p className="text-gray-700 text-medium leading-relaxed text-justify">
              PusTBaka adalah sistem perpustakaan digital sekolah Taruna Bhakti
              yang memudahkan siswa untuk mencari, meminjam, dan membaca buku
              secara online dengan mudah dan efisien.
            </p>
          </div>
        </div>
      </section>

{/* ===== KOLEKSI BUKU POPULER ===== */}
<section className="w-full py-20 bg-gray-50 px-6 md:px-20 text-center">
  <h2 className="text-3xl font-bold mb-10">
    <span className="text-black">Koleksi Buku</span>{" "}
    <span className="text-blue-700">Populer</span>
  </h2>

  <div className="relative flex items-center justify-center">
    {/* Tombol panah kiri */}
    <button className="absolute left-0 bg-white shadow-lg rounded-full p-3 hover:bg-blue-100 transition">
      <span className="text-2xl text-gray-700">❮</span>
    </button>

    {/* Daftar buku */}
    <div className="flex space-x-6 overflow-x-auto scrollbar-hide px-12 py-4">
      {[1, 2, 3, 4].map((book) => (
        <div
          key={book}
          className="bg-white shadow-md rounded-xl p-5 flex flex-col items-center justify-between hover:shadow-xl transition-all duration-300 min-w-[200px]">

          <Image
            src="/hans.png"
            alt="Hans"
            width={150}
            height={220}
            className="rounded-md mb-4"
          />
          <h3 className="font-bold text-lg text-gray-800">Hans</h3>
          <p className="text-gray-500 text-sm mb-3">Risa Saraswati</p>
          <button className="bg-blue-700 text-white text-sm px-5 py-2 rounded-full hover:bg-blue-800 transition">
            Pinjam
          </button>
        </div>
      ))}
    </div>

    {/* Tombol panah kanan */}
    <button className="absolute right-0 bg-white shadow-lg rounded-full p-3 hover:bg-blue-100 transition">
      <span className="text-2xl text-gray-700">❯</span>
    </button>
  </div>

  {/* Tombol lihat semua koleksi */}
  <div className="mt-8">
    <a
      href="#"
      className="text-blue-700 font-medium hover:underline transition">
      Lihat Semua Koleksi
    </a>
  </div>
</section>

{/* ===== FITUR UNGGULAN ===== */}
<section className="w-full py-20 bg-gradient-to-b from-blue-100 to-white text-center">
  <h2 className="text-3xl font-bold mb-12">
    <span className="text-black">Fitur</span>{" "}
    <span className="text-blue-700">Unggulan</span>
  </h2>

  <div className="flex flex-col md:flex-row justify-center items-center gap-12 px-6 md:px-20">
    {/* Fitur 1 */}
    <div className="flex flex-col items-center max-w-xs text-center">
      <div className="text-blue-800 text-5xl mb-4">📱</div>
      <h3 className="font-bold text-lg text-blue-800 mb-2">
        Peminjaman Online
      </h3>
      <p className="text-gray-700">
        Pinjam buku dengan mudah melalui sistem kami
      </p>
    </div>

    {/* Fitur 2 */}
    <div className="flex flex-col items-center max-w-xs text-center">
      <div className="text-blue-800 text-5xl mb-4">🔔</div>
      <h3 className="font-bold text-lg text-blue-800 mb-2">
        Notifikasi Pengembalian
      </h3>
      <p className="text-gray-700">
        Dapatkan pengingat otomatis saat waktu pengembalian tiba
      </p>
    </div>

    {/* Fitur 3 */}
    <div className="flex flex-col items-center max-w-xs text-center">
      <div className="text-blue-800 text-5xl mb-4">🔁</div>
      <h3 className="font-bold text-lg text-blue-800 mb-2">
        Riwayat Buku Otomatis
      </h3>
      <p className="text-gray-700">
        Pantau semua riwayat peminjaman dengan mudah
      </p>
    </div>
  </div>
</section>


{/* ===== LOKASI & KONTAK ===== */}
<section className="w-full py-20 bg-white px-6 md:px-20 flex flex-col md:flex-row items-center justify-center gap-12">
  {/* MAP */}
  <div className="w-full md:w-1/2 rounded-xl shadow-lg overflow-hidden">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.073821305011!2d106.86741237355677!3d-6.3844738624455175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ebaff005f277%3A0x9fcd41028665eea8!2sSMK%20Taruna%20Bhakti%20Depok!5e0!3m2!1sid!2sid!4v1762756508632!5m2!1sid!2sid"
      width="100%"
      height="350"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>

  {/* INFO KONTAK */}
  <div className="w-full md:w-1/2 text-center md:text-left space-y-3">
    <h3 className="text-xl font-bold text-gray-800">
      Perpustakaan SMK TARUNA BHAKTI
    </h3>
    <p className="text-gray-700">
      Jl. Pekapuran, RT.02/RW.06, Curug, Kec. Cimanggis, Kota Depok, Jawa Barat
      16953
    </p>
    <p className="text-gray-700">Telp. (021) 8744810</p>
    <p className="text-gray-700">
      Email:{" "}
      <a
        href="mailto:taruna@smktarunabhakti.net"
        className="text-blue-700 underline hover:text-blue-900"
      >
        taruna@smktarunabhakti.net
      </a>
    </p>
  </div>
</section>

    </div>
  );
}
