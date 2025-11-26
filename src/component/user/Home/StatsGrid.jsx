"use client";

import { useState, useEffect } from "react";
import { BookOpen, Clock, Heart, Library, TrendingUp, Award, Star, Zap } from "lucide-react";

export default function StatsGrid() {
    const [stats, setStats] = useState({
        borrowed: 0,
        late: 0,
        totalDenda: 0,
        favorites: 0,
        available: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // Ambil user ID dari localStorage
            const userData = localStorage.getItem("user");
            if (!userData) {
                setLoading(false);
                return;
            }
            
            const user = JSON.parse(userData);
            const userId = user.id;

            // Fetch semua data secara parallel
            const [peminjamanRes, wishlistRes, bukuRes] = await Promise.all([
                fetch("/api/peminjaman"),
                fetch("/api/wishlist"),
                fetch("/api/buku")
            ]);

            // Parse responses
            const peminjamanData = await peminjamanRes.json();
            const wishlistData = await wishlistRes.json();
            const bukuData = await bukuRes.json();

            // Filter peminjaman user ini
            const userPeminjaman = Array.isArray(peminjamanData) 
                ? peminjamanData.filter(item => item.user_id === userId)
                : [];

            // Hitung buku yang sedang dipinjam (status: Dipinjam atau Menunggu)
            const borrowed = userPeminjaman.filter(
                item => item.status === 'Dipinjam' || item.status === 'Menunggu'
            ).length;

            // Hitung buku terlambat
            const late = userPeminjaman.filter(
                item => item.status === 'Terlambat'
            ).length;

            // Hitung total denda
            const totalDenda = userPeminjaman
                .filter(item => item.status === 'Terlambat')
                .reduce((sum, item) => sum + (item.denda || 0), 0);

            // Filter wishlist user ini
            const userWishlist = Array.isArray(wishlistData)
                ? wishlistData.filter(item => item.user_id === userId)
                : [];
            const favorites = userWishlist.length;

            // Hitung total buku tersedia (stok > 0)
            const available = Array.isArray(bukuData)
                ? bukuData.filter(book => book.stok > 0).length
                : 0;

            // Update state
            setStats({
                borrowed,
                late,
                totalDenda,
                favorites,
                available
            });

        } catch (err) {
            console.error("Error fetching stats:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-gray-200 animate-pulse">
                        <div className="flex items-start justify-between mb-4">
                            <div className="bg-gray-200 p-4 rounded-xl w-14 h-14"></div>
                            <div className="bg-gray-200 h-6 w-16 rounded-full"></div>
                        </div>
                        <div className="bg-gray-200 h-10 w-20 rounded mb-2"></div>
                        <div className="bg-gray-200 h-4 w-32 rounded"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Buku Dipinjam */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border-t-4 border-blue-500">
                <div className="flex items-start justify-between mb-4">
                    <div className="bg-blue-100 p-4 rounded-xl">
                        <BookOpen className="w-7 h-7 text-blue-600" />
                    </div>
                    <div className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                        Aktif
                    </div>
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-1">{stats.borrowed}</h3>
                <p className="text-gray-600 font-medium">Buku Dipinjam</p>
                <div className="mt-4 flex items-center text-sm text-blue-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>Sedang dibaca</span>
                </div>
            </div>

            {/* Buku Terlambat */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border-t-4 border-red-500">
                <div className="flex items-start justify-between mb-4">
                    <div className="bg-red-100 p-4 rounded-xl">
                        <Clock className="w-7 h-7 text-red-600" />
                    </div>
                    <div className={`text-xs font-bold px-3 py-1 rounded-full ${
                        stats.late === 0 
                            ? 'bg-green-50 text-green-700' 
                            : 'bg-red-50 text-red-700'
                    }`}>
                        {stats.late === 0 ? 'Aman' : 'Terlambat'}
                    </div>
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-1">{stats.late}</h3>
                <p className="text-gray-600 font-medium">Buku Terlambat</p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                    <Award className="w-4 h-4 mr-1" />
                    <span>Denda: Rp {stats.totalDenda.toLocaleString('id-ID')}</span>
                </div>
            </div>

            {/* Wishlist */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border-t-4 border-pink-500">
                <div className="flex items-start justify-between mb-4">
                    <div className="bg-pink-100 p-4 rounded-xl">
                        <Heart className="w-7 h-7 text-pink-600" />
                    </div>
                    <div className="bg-pink-50 text-pink-700 text-xs font-bold px-3 py-1 rounded-full">
                        Favorit
                    </div>
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-1">{stats.favorites}</h3>
                <p className="text-gray-600 font-medium">Wishlist Saya</p>
                <div className="mt-4 flex items-center text-sm text-pink-600">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    <span>Buku favorit</span>
                </div>
            </div>

            {/* Total Koleksi */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border-t-4 border-green-500">
                <div className="flex items-start justify-between mb-4">
                    <div className="bg-green-100 p-4 rounded-xl">
                        <Library className="w-7 h-7 text-green-600" />
                    </div>
                    <div className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                        Tersedia
                    </div>
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-1">{stats.available}</h3>
                <p className="text-gray-600 font-medium">Total Koleksi</p>
                <div className="mt-4 flex items-center text-sm text-green-600">
                    <Zap className="w-4 h-4 mr-1" />
                    <span>Siap dipinjam</span>
                </div>
            </div>
        </div>
    );
}