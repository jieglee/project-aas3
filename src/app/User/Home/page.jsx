"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Home,
  Layers,
  Heart,
  Bell,
  BookOpen,
  LogOut,
  User,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [active, setActive] = useState("beranda");

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const menu = [
    { name: "beranda", label: "Beranda", icon: <Home size={20} /> },
    { name: "kategori", label: "Kategori", icon: <Layers size={20} /> },
    { name: "wishlist", label: "Wishlist", icon: <Heart size={20} /> },
    { name: "notif", label: "Notifikasi", icon: <Bell size={20} /> },
    { name: "riwayat", label: "Riwayat", icon: <BookOpen size={20} /> },
  ];

  const stats = [
    { title: "Total Buku", value: 210, color: "bg-blue-100 text-blue-700" },
    { title: "Sedang Dipinjam", value: 5, color: "bg-yellow-100 text-yellow-700" },
    { title: "Riwayat Peminjaman", value: 41, color: "bg-green-100 text-green-700" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* ===== Sidebar ===== */}
      <aside className="w-64 bg-white shadow-lg flex flex-col justify-between fixed left-0 top-0 bottom-0">
        <div>
          <div className="flex flex-col items-center py-8 border-b">
            <Image
              src="/user.jpg"
              alt="User"
              width={70}
              height={70}
              className="rounded-full border-2 border-blue-400"
            />
            <h2 className="mt-3 text-lg font-semibold text-blue-800">
              Pengguna
            </h2>
            <p className="text-sm text-gray-500">Siswa Perpustakaan</p>
          </div>

          <nav className="mt-6 space-y-1">
            {menu.map((item) => (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`flex items-center w-full px-6 py-3 text-sm font-medium transition-all ${
                  active === item.name
                    ? "bg-blue-100 text-blue-800 border-r-4 border-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="px-6 py-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-red-600 font-medium hover:bg-red-50 px-3 py-2 rounded-lg transition-all"
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="ml-64 flex-1 p-8 space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
            <BookOpen className="text-blue-700" size={28} />
            PusTBaka
          </h1>
          <User className="text-gray-600" size={24} />
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-2">
            Selamat Datang Kembali, Pengguna! 👋
          </h2>
          <p className="text-sm opacity-90">
            Temukan buku favoritmu dan lanjutkan perjalanan bacamu hari ini.
          </p>
        </motion.div>

        {/* Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-xl shadow-md ${item.color}`}
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-3xl font-bold mt-2">{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Buku Section */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            📚 Buku Populer Minggu Ini
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Laskar Pelangi", author: "Andrea Hirata", cover: "/laskar.png" },
              { title: "Hujan", author: "Tere Liye", cover: "/hujan.png" },
              { title: "Koala Kumal", author: "Raditya Dika", cover: "/koala.png" },
            ].map((book, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
              >
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={300}
                  height={400}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-gray-800">{book.title}</h3>
                  <p className="text-gray-500 text-sm">{book.author}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
