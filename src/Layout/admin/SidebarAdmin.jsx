"use client";
import { Home, Heart, History, User, FileWarning } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function SidebarAdmin({ isOpen }) {
  const pathname = usePathname();

  const menus = [
    { name: "Beranda", icon: <Home size={20} />, path: "/Admin" },
    { name: "Manajemen Buku", icon: <Heart size={20} />, path: "/Admin/Book" },
    { name: "Manajemen Pengguna", icon: <History size={20} />, path: "/Admin/UserSetting" },
    { name: "Peminjaman", icon: <User size={20} />, path: "/Admin/Peminjaman" },

    { name: "Laporan", icon: <FileWarning size={20} />, path: "/Admin/Reports" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r border-blue-200 shadow-sm flex flex-col z-40 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header logo */}
      <div
        className={`flex items-center ${
          isOpen ? "justify-start px-6" : "justify-center"
        } py-5`}
      >
        <Image src="/logo-2.png" alt="Logo" width={32} height={32} />
        {isOpen && (
          <h1 className="text-lg font-bold text-[#1E3A8A] ml-3">PusTBaka</h1>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-4">
        {menus.map((menu, index) => {
          const isActive = pathname === menu.path;
          return (
            <Link
              key={index}
              href={menu.path}
              className={`flex items-center ${
                isOpen ? "justify-start px-4" : "justify-center"
              } gap-3 rounded-lg py-2 mb-1 transition font-medium ${
                isActive
                  ? "bg-[#1E3A8A] text-white shadow-sm"
                  : "text-[#1E3A8A] hover:bg-blue-100"
              }`}
            >
              {menu.icon}
              {isOpen && <span className="text-sm">{menu.name}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
