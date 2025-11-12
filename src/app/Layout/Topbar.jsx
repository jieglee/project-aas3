"use client";
import { Menu, Bell, UserCircle } from "lucide-react";
import { useSidebar } from "../contexts/SidebarContextUser";

export default function Topbar() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-30 bg-white border-b shadow-sm flex items-center justify-between px-6 py-4">
      {/* Tombol sidebar untuk mobile */}
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
      >
        <Menu size={24} />
      </button>

      {/* Judul halaman */}
      <h1 className="font-semibold text-lg text-gray-700 hidden lg:block">
        Dashboard
      </h1>

      {/* Bagian kanan */}
      <div className="flex items-center gap-6">
        <button className="relative hover:text-blue-700">
          <Bell size={24} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <UserCircle size={28} className="text-gray-700" />
          <span className="font-medium text-gray-700">Runa</span>
        </div>
      </div>
    </header>
  );
}
