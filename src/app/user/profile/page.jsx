"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Book, Clock, CheckCircle, Users } from "lucide-react";
import Profilemodal from "../../../component/user/Profile/Profilemodal";


export default function ProfilPage() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        const userId = localStorage.getItem("userId");

        if (!userId) {
            router.push("/login");
            return;
        }

        if (stored) {
            const profileData = JSON.parse(stored);
            setProfile(profileData);
            fetchUserStats(userId);
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
                                {profile.phone || "12345678"}
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
                                        {localStorage.getItem("userId") || "12345678"}
                                    </span>
                                </div>

                                {/* Role */}
                                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                    <span className="text-gray-500 text-sm">Role</span>
                                    <span className="text-gray-800 font-medium">user</span>
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
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                    {/* Sedang Dipinjam */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 relative overflow-hidden">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                                    <Book className="w-6 h-6 text-blue-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-800 mb-1">
                                    {stats.sedangDipinjam}
                                </p>
                                <p className="text-sm text-gray-500">Sedang Dipinjam</p>
                                <p className="text-xs text-blue-600 mt-1">~ Aktif</p>
                            </div>
                        </div>
                    </div>

                    {/* Buku Terkembali */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 relative overflow-hidden">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-3">
                                    <Clock className="w-6 h-6 text-red-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-800 mb-1">
                                    {stats.bukuTerkembali}
                                </p>
                                <p className="text-sm text-gray-500">Buku Terkembali</p>
                                <p className="text-xs text-red-600 mt-1">~ Denda: Rp 0</p>
                            </div>
                        </div>
                    </div>

                    {/* Pengembalian Selesai */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 relative overflow-hidden">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-800 mb-1">
                                    {stats.pengembalianSelesai}
                                </p>
                                <p className="text-sm text-gray-500">Pengembalian Selesai</p>
                                <p className="text-xs text-green-600 mt-1">~ Selesai</p>
                            </div>
                        </div>
                    </div>

                    {/* Total Peminjaman */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 relative overflow-hidden">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                                    <Users className="w-6 h-6 text-purple-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-800 mb-1">
                                    {stats.totalPeminjaman}
                                </p>
                                <p className="text-sm text-gray-500">Total Peminjaman</p>
                                <p className="text-xs text-purple-600 mt-1">~ Riwayat</p>
                            </div>
                        </div>
                    </div>
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