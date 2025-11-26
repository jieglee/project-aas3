"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
            router.push("/login");
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
                    {/* Left Card - Profile */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
                            {/* Profile Image */}
                            <div className="relative inline-block mb-4">
                                <img
                                    src="/anjing emo.jpg"
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-100"
                                />
                            </div>

                            {/* Name & ID */}
                            <h2 className="text-xl font-bold text-gray-800 mb-1">
                                {profile.nama}
                            </h2>
                            <p className="text-gray-400 text-sm mb-3">
                                {profile.kelas || "XI"}
                            </p>

                            {/* Role Badge */}
                            <span className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-4 py-1 rounded-full mb-6">
                                user
                            </span>

                            {/* Edit Button */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
                            >
                                Edit Profil
                            </button>
                        </div>
                    </div>

                    {/* Right Card - Account Info */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">
                                Informasi Akun
                            </h3>

                            {/* Info Grid */}
                            <div className="space-y-4">
                                {/* Nama Lengkap */}
                                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                    <span className="text-gray-500 text-sm">Nama Lengkap</span>
                                    <span className="text-gray-800 font-medium">{profile.nama}</span>
                                </div>

                                {/* Kelas */}
                                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                    <span className="text-gray-500 text-sm">Kelas</span>
                                    <span className="text-gray-800 font-medium">{profile.kelas}</span>
                                </div>

                                {/* Email */}
                                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                    <span className="text-gray-500 text-sm">Email</span>
                                    <span className="text-gray-800 font-medium">{profile.email}</span>
                                </div>

                                {/* Nomor Telepon */}
                                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                    <span className="text-gray-500 text-sm">Nomor Telepon</span>
                                    <span className="text-gray-800 font-medium">{profile.phone}</span>
                                </div>

                                {/* ID Siswa */}
                                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                    <span className="text-gray-500 text-sm">ID Siswa</span>
                                    <span className="text-gray-800 font-medium">
                                        {userId || "12345678"}
                                    </span>
                                </div>

                                {/* Anggota Sejak */}
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 text-sm">Anggota Sejak</span>
                                    <span className="text-gray-800 font-medium">
                                        {new Date().toLocaleDateString('id-ID', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6"></div>

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