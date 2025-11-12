"use client";
import { useSidebar } from "../contexts/SidebarContextUser";
import { Home, Heart, BookOpen, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar();
  const pathname = usePathname();

  const menus = [
    { name: "Beranda", icon: <Home size={20} />, path: "/user/home" },
    { name: "Wishlist", icon: <Heart size={20} />, path: "/wishlist" },
    { name: "Peminjaman", icon: <BookOpen size={20} />, path: "/peminjaman" },
    { name: "Profil", icon: <User size={20} />, path: "/profile" },
  ];

  return (
    <>
      {/* Backdrop untuk mobile */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg border-r z-50 transition-all duration-300
        ${isOpen ? "w-64" : "w-20"} 
        `}
      >
        {/* Logo */}
        <div
          className={`p-6 border-b flex items-center justify-center ${
            isOpen ? "justify-start px-6" : "px-0"
          }`}
        >
          <h2
            className={`text-xl font-bold text-blue-700 transition-all duration-300 overflow-hidden ${
              isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
            }`}
          >
            📚 PusTBaka
          </h2>
          {!isOpen && (
            <span className="text-2xl text-blue-700">📚</span>
          )}
        </div>

        {/* Menu Navigasi */}
        <nav className="flex flex-col gap-2 p-4">
          {menus.map((menu, i) => {
            const isActive = pathname === menu.path;
            return (
              <Link
                key={i}
                href={menu.path}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50"
                } ${!isOpen ? "justify-center" : ""}`}
              >
                {menu.icon}
                <span
                  className={`transition-all duration-300 ${
                    isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
                  }`}
                >
                  {menu.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
