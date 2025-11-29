"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfileCard from "../../../component/user/Profile/ProfileCard";
import AccountInfo from "../../../component/user/Profile/AccountInfo";
import Profilemodal from "../../../component/user/Profile/Profilemodal";

export default function ProfilPage() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userId, setUserId] = useState(null);
    const [profile, setProfile] = useState({
        nama: "Guest",
        kelas: "Belum diatur",
        email: "N/A",
        phone: "N/A",
    });

    const [stats, setStats] = useState({
        sedangDipinjam: 0,
        bukuTerkembali: 0,
        pengembalianSelesai: 0,
        totalPeminjaman: 0,
    });

    // Load profile dari localStorage
    useEffect(() => {
        const stored = localStorage.getItem("profileData");
        const storedUserId = localStorage.getItem("userId");

        if (!storedUserId) {
            router.push("/user/profile");
            return;
        }

        setUserId(storedUserId);

        if (stored) {
            const profileData = JSON.parse(stored);
            setProfile(profileData);
            fetchUserStats(storedUserId);
        }
    }, [router]);

    // Fetch statistik user dari API
    const fetchUserStats = async (userId) => {
        try {
            const res = await fetch(`/api/user/stats?userId=${userId}`);
            if (res.ok) {
                const data = await res.json();
                setStats({
                    sedangDipinjam: data.sedangDipinjam || 0,
                    bukuTerkembali: data.bukuTerkembali || 0,
                    pengembalianSelesai: data.pengembalianSelesai || 0,
                    totalPeminjaman: data.totalPeminjaman || 0,
                });
            }
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    const handleSave = (newData) => {
        setProfile(newData);
        localStorage.setItem("profileData", JSON.stringify(newData));
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 md:px-8 py-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Profil Pengguna</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Kelola preferensi akun pengguna Anda di sini
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <ProfileCard 
                        profile={profile} 
                        onEditClick={() => setIsModalOpen(true)} 
                    />
                    
                    <AccountInfo 
                        profile={profile} 
                        userId={userId} 
                    />
                </div>

                {/* Profile Modal */}
                <Profilemodal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    initialData={profile}
                    onSave={handleSave}
                />
            </div>
        </div>
    );
}