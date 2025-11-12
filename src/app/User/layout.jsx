"use client";
import { SidebarProvider } from "../contexts/SidebarContextUser";
import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";

export default function UserLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar kiri */}
        <Sidebar />

        {/* Konten utama */}
        <div className="flex-1 flex flex-col lg:ml-64">
          <Topbar />
          <main className="p-6 flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
