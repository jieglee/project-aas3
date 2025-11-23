"use client";
import { Home, Heart, History, User, BookCopy } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Sidebar({ isOpen }) {
  const pathname = usePathname();

  const menus = [
    { name: "Beranda", icon: <Home size={20} />, path: "/user/home" },
    { name: "Wishlist", icon: <Heart size={20} />, path: "/user/wishlist" },
    { name: "Katalog", icon: <BookCopy size={20} />, path: "/user/katalog" }, 
    { name: "Peminjaman", icon: <History size={20} />, path: "/user/peminjam" },
    { name: "Profil", icon: <User size={20} />, path: "/user/profile" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen transition-all duration-300 flex flex-col
        ${isOpen ? "w-64 bg-white shadow-lg" : "w-20 bg-white shadow-lg"}`}
    >
      {/* Logo */}
      <div className={`flex items-center ${isOpen ? "justify-start px-6" : "justify-center"} py-5 border-b border-gray-200`}>
        <Image src="/logo-2.png" alt="Logo" width={32} height={32} />
        {isOpen && <h1 className="ml-3 text-xl font-bold text-blue-900">PusTBaka</h1>}
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-4">
        {menus.map((menu, idx) => {
          const isActive = pathname === menu.path;
          return (
            <Link
              key={idx}
              href={menu.path}
              title={!isOpen ? menu.name : ""}
              className={`group flex items-center gap-4 rounded-xl p-3 transition-all duration-200
                ${isActive ? "bg-blue-900 text-white shadow border-l-4 border-blue-900" : "text-blue-900 hover:bg-blue-50"}
                ${!isOpen ? "justify-center" : "justify-start"}
              `}
            >
              {menu.icon}
              {isOpen && <span className="group-hover:translate-x-1 transition-transform duration-200">{menu.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-gray-200 text-center text-sm text-gray-500">
        &copy; 2025 PusTBaka
      </div>
    </aside>
  );
}
