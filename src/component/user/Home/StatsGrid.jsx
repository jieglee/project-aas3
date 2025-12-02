import { BookOpen, Clock, Heart, CheckCircle, TrendingUp, DollarSign, Library } from "lucide-react";
import Link from "next/link";

export default function StatsGrid({ stats }) {
    // Default values jika stats belum ada
    const statsData = stats || {
        bukuDipinjam: 0,
        bukuTerlambat: 0,
        totalWishlist: 0,
        totalBukuPernahDipinjam: 0
    };

    const statItems = [
        {
            title: "Buku Dipinjam",
            value: statsData.bukuDipinjam,
            subtitle: "Sedang dipinjam",
            subtitleIcon: TrendingUp,
            icon: BookOpen,
            bgColor: "bg-blue-500",
            borderColor: "border-blue-400",
            iconBg: "bg-blue-500",
            textColor: "text-blue-600",
            link: "/user/peminjaman"
        },
        {
            title: "Buku Terlambat",
            value: statsData.bukuTerlambat,
            subtitle: `Denda: Rp ${statsData.bukuTerlambat * 5000}`,
            subtitleIcon: DollarSign,
            icon: Clock,
            bgColor: "bg-green-500",
            borderColor: "border-green-400",
            iconBg: "bg-green-500",
            textColor: "text-green-600",
            link: "/user/peminjaman"
        },
        {
            title: "Wishlist Saya",
            value: statsData.totalWishlist,
            subtitle: "Buku favorit",
            subtitleIcon: Heart,
            icon: Heart,
            bgColor: "bg-pink-500",
            borderColor: "border-pink-400",
            iconBg: "bg-pink-500",
            textColor: "text-pink-600",
            link: "/user/wishlist"
        },
        {
            title: "Total Koleksi",
            value: statsData.totalBukuPernahDipinjam,
            subtitle: "Koleksi",
            subtitleIcon: Library,
            icon: CheckCircle,
            bgColor: "bg-emerald-500",
            borderColor: "border-emerald-400",
            iconBg: "bg-emerald-500",
            textColor: "text-emerald-600",
            link: "/user/riwayat"
        }
    ];

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statItems.map((item, index) => {
                    const Icon = item.icon;
                    const SubtitleIcon = item.subtitleIcon;
                    
                    return (
                        <Link key={index} href={item.link}>
                            <div
                                className={`bg-white rounded-3xl border-l-8 ${item.borderColor} shadow-md hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer group relative overflow-hidden`}
                            >
                                {/* Background decoration */}
                                <div className={`absolute -top-10 -right-10 w-32 h-32 ${item.bgColor} opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
                                
                                {/* Icon */}
                                <div className={`${item.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                                
                                {/* Value */}
                                <div className="mb-3">
                                    <p className="text-5xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-300">
                                        {item.value}
                                    </p>
                                </div>
                                
                                {/* Title */}
                                <p className="text-gray-700 font-semibold text-base mb-2">
                                    {item.title}
                                </p>
                                
                                {/* Subtitle with Icon */}
                                <div className="flex items-center gap-2">
                                    <SubtitleIcon className={`w-4 h-4 ${item.textColor}`} />
                                    <span className={`${item.textColor} font-medium text-sm`}>
                                        {item.subtitle}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Alert untuk buku terlambat */}
            {statsData.bukuTerlambat > 0 && (
                <div className="mt-6 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-2xl p-5 shadow-md">
                    <div className="flex items-start gap-4">
                        <div className="bg-red-500 rounded-full p-2 mt-1">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                                </svg>
                                <p className="text-red-800 font-bold text-lg">
                                    Perhatian! Anda memiliki {statsData.bukuTerlambat} buku yang terlambat
                                </p>
                            </div>
                            <p className="text-red-700 text-sm leading-relaxed mb-3">
                                Ups! Anda punya denda <span className="font-bold">Rp {statsData.bukuTerlambat * 5000}</span>. Ayo bayar ke petugas perpustakaan sebelum buku-buku mulai membalas dendam!
                            </p>
                            <Link href="/user/Peminjaman">
                                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors duration-300 shadow-md hover:shadow-lg flex items-center gap-2">
                                    <BookOpen className="w-4 h-4" />
                                    Lihat Detail Peminjaman
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}