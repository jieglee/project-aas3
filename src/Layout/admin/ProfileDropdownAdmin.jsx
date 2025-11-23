"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { LogOut, ChevronDown, User, Shield } from "lucide-react";

export default function ProfileDropdownAdmin() {
    const [open, setOpen] = useState(false);
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);
    const dropdownRef = useRef(null);

    // Fetch data admin yang sedang login
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                // TODO: Ganti dengan endpoint API Anda
                const response = await fetch('/api/auth/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                if (!response.ok) throw new Error('Gagal mengambil data admin');
                
                const data = await response.json();
                
                // Mapping sesuai struktur database users
                const admin = {
                    id: data.id,
                    name: data.nama,
                    email: data.email,
                    phone: data.phone,
                    kelas: data.kelas,
                    role: data.role === 'admin' ? 'Administrator' : 'User',
                    avatar: `/avatar-${data.id}.jpg` // atau null jika tidak ada
                };
                
                setAdminData(admin);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching admin data:", error);
                
                // Fallback data untuk development
                const admin = {
                    id: 7,
                    name: "Admin",
                    email: "admin@gmail.com",
                    phone: "0000000000",
                    kelas: "-",
                    role: "Administrator",
                    avatar: null
                };
                setAdminData(admin);
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    const handleToggle = () => setOpen(!open);

    const handleLogout = async () => {
        // TODO: Implementasi logout
        // await fetch('/api/auth/logout', { method: 'POST' });
        // router.push('/login');
        
        if (confirm("Apakah Anda yakin ingin keluar?")) {
            alert("Logout clicked - Implementasi logout di sini");
            // Redirect ke halaman login
        }
    };

    // Tutup dropdown saat klik di luar
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profil (foto + nama + role + panah) */}
            <div
                onClick={handleToggle}
                className="flex items-center gap-3 cursor-pointer hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
            >
                <div className="relative">
                    <Image
                        src={adminData?.avatar || "/admin.jpg"}
                        alt={adminData?.name || "Admin"}
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-blue-300 object-cover"
                        onError={(e) => {
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24'%3E%3Cpath fill='%231E3A8A' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";
                        }}
                    />
                    {/* Badge Admin */}
                    <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
                        <Shield size={10} className="text-white" />
                    </div>
                </div>

                <div className="text-left">
                    <p className="font-semibold text-[#1E3A8A] text-sm leading-tight">
                        {adminData?.name || "Admin"}
                    </p>
                    <p className="text-xs text-blue-600">
                        {adminData?.role || "Administrator"}
                    </p>
                </div>

                {/* Animated Arrow */}
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <ChevronDown
                        size={18}
                        className="text-[#1E3A8A]"
                    />
                </motion.div>
            </div>

            {/* Dropdown dengan animasi muncul/hilang */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 mt-3 w-72 bg-white border border-blue-200 rounded-lg shadow-xl p-4 z-40"
                    >
                        {/* Header dengan foto besar */}
                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-blue-100">
                            <div className="relative">
                                <Image
                                    src={adminData?.avatar || "/admin-avatar.jpg"}
                                    alt={adminData?.name || "Admin"}
                                    width={56}
                                    height={56}
                                    className="rounded-full border-2 border-blue-300 object-cover"
                                    onError={(e) => {
                                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 24 24'%3E%3Cpath fill='%231E3A8A' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";
                                    }}
                                />
                                <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1.5">
                                    <Shield size={14} className="text-white" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-blue-900 text-base">
                                    {adminData?.name || "Admin"}
                                </p>
                                <p className="text-xs text-blue-600 mt-0.5">
                                    {adminData?.email || "admin@example.com"}
                                </p>
                            </div>
                        </div>

                        {/* Info tambahan */}
                        <div className="space-y-2 mb-4 pb-4 border-b border-blue-100">
                            <div className="flex items-center gap-2 text-sm">
                                <User size={16} className="text-blue-600" />
                                <span className="text-gray-700">
                                    <span className="font-medium">Role:</span> {adminData?.role || "Administrator"}
                                </span>
                            </div>
                            {adminData?.nip && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Shield size={16} className="text-blue-600" />
                                    <span className="text-gray-700">
                                        <span className="font-medium">NIP:</span> {adminData.nip}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Tombol Logout */}
                        <button
                            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2.5 px-4 rounded-lg transition-colors font-medium text-sm shadow-sm"
                            onClick={handleLogout}
                        >
                            <LogOut size={16} />
                            Keluar dari Akun
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}