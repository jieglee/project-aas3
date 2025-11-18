"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { LogOut, ChevronDown } from "lucide-react";

export default function ProfileDropdown() {
    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState({
        nama: "",
        email: "",
    });

    const dropdownRef = useRef(null);

    // Ambil data profile dari localStorage
    useEffect(() => {
        const stored = localStorage.getItem("profileData");
        if (stored) {
            setProfile(JSON.parse(stored));
        }
    }, []);

    const handleToggle = () => setOpen(!open);

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
            <div onClick={handleToggle} className="flex items-center gap-2 cursor-pointer">
                <Image
                    src="/anjing emo.jpg"
                    alt="User"
                    width={32}
                    height={32}
                    className="rounded-full"
                />

                {/* Nama dinamis */}
                <span className="font-semibold text-[#1E3A8A] text-sm">
                    {profile.nama || "Guest"}
                </span>

                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
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
                        <div className="mb-3">
                            <p className="font-semibold text-blue-800 text-sm">{profile.nama}</p>
                            <p className="text-sm text-blue-600">{profile.email}</p>
                        </div>

                        <button className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition text-sm font-medium">
                            <LogOut size={16} />
                            Sign out
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
