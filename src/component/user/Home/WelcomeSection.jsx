"use client";
import { useState, useEffect } from "react";
import { Library } from "lucide-react";

export default function WelcomeSection() {
    const [userName, setUserName] = useState("User");

    useEffect(() => {
        const loadProfile = () => {
            // Ambil dari localStorage seperti ProfileDropdown
            const stored = localStorage.getItem("profileData");
            if (stored) {
                const data = JSON.parse(stored);
                setUserName(data.nama || "User");
            }
        };

        loadProfile();

        // Listen untuk perubahan localStorage (dari tab lain atau update profile)
        window.addEventListener('storage', loadProfile);
        
        // Listen untuk custom event "profileUpdated" (dari tab yang sama)
        window.addEventListener("profileUpdated", loadProfile);

        return () => {
            window.removeEventListener('storage', loadProfile);
            window.removeEventListener("profileUpdated", loadProfile);
        };
    }, []);

    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10 mb-8 border-l-8 border-blue-600">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                        Selamat Datang Kembali,<br/>
                        <span className="text-blue-600">{userName}!</span> 👋
                    </h1>
                    <p className="text-gray-600 text-lg mb-6">
                        Temukan, pinjam, dan nikmati ribuan koleksi buku digital kami
                    </p>
                </div>

                {/* Decorative illustration */}
                <div className="hidden lg:block">
                    <div className="relative w-48 h-48">
                        <div className="absolute inset-0 bg-blue-100 rounded-full opacity-50 animate-pulse"></div>
                        <div className="absolute inset-4 bg-blue-200 rounded-full opacity-50 animate-pulse delay-75"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Library className="w-24 h-24 text-blue-600" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}