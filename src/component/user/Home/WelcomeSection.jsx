"use client";
import { useState, useEffect } from "react";
import { Sparkles, BookOpen, TrendingUp } from "lucide-react";

export default function WelcomeSection() {
    const [userName, setUserName] = useState("User");
    const [currentHour, setCurrentHour] = useState(new Date().getHours());

    useEffect(() => {
        const loadProfile = () => {
            const stored = localStorage.getItem("profileData");
            if (stored) {
                const data = JSON.parse(stored);
                setUserName(data.nama || "User");
            }
        };

        loadProfile();
        setCurrentHour(new Date().getHours());

        window.addEventListener('storage', loadProfile);
        window.addEventListener("profileUpdated", loadProfile);

        return () => {
            window.removeEventListener('storage', loadProfile);
            window.removeEventListener("profileUpdated", loadProfile);
        };
    }, []);

    // Greeting berdasarkan waktu
    const getGreeting = () => {
        if (currentHour >= 5 && currentHour < 12) return "Selamat Pagi";
        if (currentHour >= 12 && currentHour < 15) return "Selamat Siang";
        if (currentHour >= 15 && currentHour < 18) return "Selamat Sore";
        return "Selamat Malam";
    };

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl shadow-xl mb-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="relative p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    {/* Text Content */}
                    <div className="flex-1 text-white">
                        {/* Greeting Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                            <Sparkles className="w-4 h-4 text-yellow-300" />
                            <span className="text-sm font-medium">{getGreeting()}</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-3xl md:text-4xl font-bold mb-3">
                            Heyo, <span className="text-yellow-300">{userName}</span>!
                        </h1>

                        {/* Description */}
                        <p className="text-blue-100 text-base md:text-lg mb-6 max-w-2xl">
                            Jelajahi ribuan koleksi buku dan mulai petualangan membacamu hari ini
                        </p>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap gap-4">
                        </div>
                    </div>

                    {/* Illustration - Hidden on mobile */}
                    <div className="hidden lg:block flex-shrink-0">
                        <div className="relative w-40 h-40">
                            {/* Animated circles */}
                            <div className="absolute inset-0 bg-white/10 rounded-full animate-ping"></div>
                            <div className="absolute inset-2 bg-white/20 rounded-full animate-pulse"></div>
                            
                            {/* Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl">
                                    <BookOpen className="w-16 h-16 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}