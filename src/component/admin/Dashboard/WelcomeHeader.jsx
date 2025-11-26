"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";

export default function WelcomeHeader({ adminName }) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const formattedDate = currentTime.toLocaleDateString('id-ID', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const formattedTime = currentTime.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-2.5 mb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                    <h1 className="text-base font-bold text-gray-900 mb-0.5">
                        Selamat Datang, {adminName || "Admin"}! 👋
                    </h1>
                    <p className="text-gray-600 text-[10px]">Kelola sistem perpustakaan Anda dengan mudah</p>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-1 text-gray-600 text-[9px] mb-0.5">
                        <Calendar className="w-2.5 h-2.5" />
                        <span className="font-medium">{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600 text-[9px] font-semibold">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{formattedTime} WIB</span>
                    </div>
                </div>
            </div>
        </div>
    );
}