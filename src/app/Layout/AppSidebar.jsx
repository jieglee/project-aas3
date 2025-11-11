"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Home,
  Layers,
  Heart,
  Bell,
  BookOpen,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";

export default function AppSidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [active, setActive] = useState("beranda");

  const menu = [
    { name: "beranda", label: "Beranda", icon: <Home size={20} /> },
    { name: "kategori", label: "Kategori", icon: <Layers size={20} /> },
    { name: "wishlist", label: "Wishlist", icon: <Heart size={20} /> },
    { name: "notif", label: "Notifikasi", icon: <Bell size={20} /> },
    { name: "riwayat", label: "Riwayat", icon: <BookOpen size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <>
      {/* Tombol Menu untuk layar kecil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md lg:hidden"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg flex flex-col justify-between transition-all duration-300 z-40
          ${isOpen ? "w-64" : "w-0 overflow-hidden"} lg:w-64`}
      >
        {/* Profil */}
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

          {/* Menu */}
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

        {/* Logout */}
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
    </>
  );
}
