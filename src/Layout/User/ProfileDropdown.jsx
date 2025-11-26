"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { LogOut, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileDropdown() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState({
        nama: "Guest",
        email: "N/A",
    });
    const [userPhoto, setUserPhoto] = useState("/anjing emo.jpg");

    const dropdownRef = useRef(null);

    // Load profile data and photo from localStorage
    useEffect(() => {
        const loadProfile = () => {
            const stored = localStorage.getItem("profileData");
            if (stored) {
                const data = JSON.parse(stored);
                setProfile({
                    nama: data.nama || "Guest",
                    email: data.email || "N/A"
                });
            }

            // Load user photo
            const photo = localStorage.getItem("userPhoto");
            if (photo) {
                setUserPhoto(photo);
            }
        };

        loadProfile();

        // Listen for changes in localStorage (if updated from another tab)
        window.addEventListener('storage', loadProfile);
        
        return () => {
            window.removeEventListener('storage', loadProfile);
        };
    }, []);

    const handleToggle = () => setOpen(!open);

    const handleLogout = () => {
        // Remove all data from localStorage
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        localStorage.removeItem("profileData");
        localStorage.removeItem("userPhoto");
        
        // Redirect to login page
        router.push("/login");
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div onClick={handleToggle} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                <Image
                    src={userPhoto}
                    alt="User"
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                />

                {/* Dynamic name */}
                <span className="font-semibold text-[#1E3A8A] text-sm">
                    {profile.nama}
                </span>

                <motion.div 
                    animate={{ rotate: open ? 180 : 0 }} 
                    transition={{ duration: 0.25 }}
                >
                    <ChevronDown size={18} className="text-[#1E3A8A]" />
                </motion.div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="absolute right-0 mt-3 w-56 bg-white border border-blue-500 rounded-md shadow-lg p-4 z-40"
                    >
                        <div className="mb-3 pb-3 border-b border-blue-200">
                            <p className="font-semibold text-blue-800 text-sm truncate">
                                {profile.nama}
                            </p>
                            <p className="text-sm text-blue-600 truncate">
                                {profile.email}
                            </p>
                        </div>

                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-blue-700 hover:text-blue-900 hover:bg-blue-50 w-full p-2 rounded transition text-sm font-medium"
                        >
                            <LogOut size={16} />
                            Sign out
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}