"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { LogOut, ChevronDown, User, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileDropdownAdmin() {
    const [open, setOpen] = useState(false);
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);
    const dropdownRef = useRef(null);
    const router = useRouter();

    // Fetch data admin yang sedang login
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                // Ambil userId dari localStorage
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');
                
                if (!userId) {
                    console.error('UserId tidak ditemukan di localStorage');
                    setLoading(false);
                    return;
                }

                // Fetch dengan userId sebagai query parameter
                const response = await fetch(`/api/auth/profile?userId=${userId}`, {
                    headers: {
                        'Authorization': token ? `Bearer ${token}` : '',
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Gagal mengambil data admin');
                }
                
                const data = await response.json();
                console.log('Admin data:', data);
                
                // Mapping sesuai struktur database users
                const admin = {
                    id: data.id,
                    name: data.nama,
                    email: data.email,
                    phone: data.phone,
                    kelas: data.kelas,
                    role: data.role === 'admin' ? 'Administrator' : 'User',
                    avatar: null // Atau gunakan path avatar jika ada
                };
                
                setAdminData(admin);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching admin data:", error);
                
                // Fallback data untuk development
                const userId = localStorage.getItem('userId');
                if (userId) {
                    const admin = {
                        id: parseInt(userId),
                        name: "Admin",
                        email: "admin@gmail.com",
                        phone: "-",
                        kelas: "-",
                        role: "Administrator",
                        avatar: null
                    };
                    setAdminData(admin);
                }
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    const handleToggle = () => setOpen(!open);

    const handleLogout = async () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
        try {
            // Panggil API logout untuk hapus cookie
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            
            // Clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userRole');
            localStorage.removeItem('profileData');
            
            // Redirect ke login
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
            // Tetap redirect meskipun error
            router.push('/login');
        }
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
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold border-2 border-blue-300">
                        {adminData?.name?.charAt(0).toUpperCase() || 'A'}
                    </div>
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
                    <ChevronDown size={18} className="text-[#1E3A8A]" />
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
                                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl border-2 border-blue-300">
                                    {adminData?.name?.charAt(0).toUpperCase() || 'A'}
                                </div>
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
                            {adminData?.phone && adminData.phone !== '-' && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Shield size={16} className="text-blue-600" />
                                    <span className="text-gray-700">
                                        <span className="font-medium">Phone:</span> {adminData.phone}
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