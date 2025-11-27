"use client";

import { useState, useEffect } from "react";
import { BookOpen, Clock, Heart, Library, TrendingUp, Zap } from "lucide-react";

export default function StatsGrid() {
    const [stats, setStats] = useState({
        borrowed: 0,
        late: 0,
        totalDenda: 0,
        favorites: 0,
        koleksi: 0
    });
    const [loading, setLoading] = useState(true);

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

            console.log("📊 Fetching stats for user:", userId); // Debug log

            // Fetch semua data secara parallel
            const [peminjamanRes, wishlistRes, bukuRes] = await Promise.all([
                fetch("/api/peminjaman"),
                fetch("/api/wishlist"),
                fetch("/api/buku")
            ]);

            const peminjamanData = await peminjamanRes.json();
            const wishlistData = await wishlistRes.json();
            const bukuData = await bukuRes.json();

            console.log("📥 Wishlist data:", wishlistData); // Debug log

            // Filter peminjaman user ini
            const userPeminjaman = Array.isArray(peminjamanData) 
                ? peminjamanData.filter(item => item.user_id === userId)
                : [];

            // Hitung buku yang sedang dipinjam
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

            // ✅ PERBAIKAN: Filter wishlist berdasarkan user_id
            const userWishlist = Array.isArray(wishlistData)
                ? wishlistData.filter(item => item.user_id === userId)
                : [];
            
            const favorites = userWishlist.length;

            console.log("❤️ User wishlist count:", favorites); // Debug log

            // Hitung total koleksi buku yang tersedia (stok > 0)
            const koleksi = Array.isArray(bukuData)
                ? bukuData.filter(book => book.stok > 0).length
                : 0;

            // Update state
            setStats({
                borrowed,
                late,
                totalDenda,
                favorites,
                koleksi
            });

            console.log("✅ Stats updated:", { borrowed, late, totalDenda, favorites, koleksi }); // Debug log

        } catch (err) {
            console.error("❌ Error fetching stats:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch pertama kali saat component mount
        fetchStats();

        // ✅ PERBAIKAN: Listen untuk wishlist changes
        const handleWishlistChange = () => {
            console.log("🔄 Wishlist changed, refreshing stats..."); // Debug log
            fetchStats();
        };

        window.addEventListener('wishlistChanged', handleWishlistChange);

        // Cleanup listener saat component unmount
        return () => {
            window.removeEventListener('wishlistChanged', handleWishlistChange);
        };
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 shadow-md animate-pulse">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                            <div className="w-16 h-5 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="w-14 h-8 bg-gray-200 rounded mb-2"></div>
                        <div className="w-28 h-4 bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {/* Buku Dipinjam */}
            <div className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <BookOpen className="w-6 h-6 text-white" />
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="text-4xl font-bold text-gray-900 mb-1">{stats.borrowed}</h3>
                    <p className="text-gray-600 font-medium">Buku Dipinjam</p>
                </div>

                <div className="flex items-center gap-2 text-blue-600 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Sedang dipinjam</span>
                </div>
            </div>

            {/* Buku Terlambat */}
            <div className={`group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 ${
                stats.late === 0 ? 'border-green-500' : 'border-red-500'
            }`}>
                <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 bg-gradient-to-br ${
                        stats.late === 0 
                            ? 'from-green-500 to-green-600' 
                            : 'from-red-500 to-red-600'
                    } rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                        <Clock className="w-6 h-6 text-white" />
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="text-4xl font-bold text-gray-900 mb-1">{stats.late}</h3>
                    <p className="text-gray-600 font-medium">Buku Terlambat</p>
                </div>

                <div className={`text-sm ${
                    stats.late === 0 ? 'text-gray-500' : 'text-red-600 font-medium'
                }`}>
                    Denda: Rp {stats.totalDenda.toLocaleString('id-ID')}
                </div>
            </div>

            {/* Wishlist - ✅ AKAN AUTO UPDATE */}
            <div className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-pink-500">
                <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Heart className="w-6 h-6 text-white" />
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="text-4xl font-bold text-gray-900 mb-1">{stats.favorites}</h3>
                    <p className="text-gray-600 font-medium">Wishlist Saya</p>
                </div>

                <div className="flex items-center gap-2 text-pink-600 text-sm">
                    <Heart className="w-4 h-4 fill-current" />
                    <span>Buku favorit</span>
                </div>
            </div>

            {/* Total Koleksi */}
            <div className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Library className="w-6 h-6 text-white" />
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="text-4xl font-bold text-gray-900 mb-1">{stats.koleksi}</h3>
                    <p className="text-gray-600 font-medium">Total Koleksi</p>
                </div>

                <div className="flex items-center gap-2 text-green-600 text-sm">
                    <Zap className="w-4 h-4" />
                    <span>Koleksi</span>
                </div>
            </div>
        </div>
    );
}