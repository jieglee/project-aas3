"use client";

import { X, Calendar, AlertCircle, Clock, CheckCircle, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ModalWaitingAdmin({
    show,
    onClose,
    book,
    borrowDate,
    returnDate,
    fine = 0
}) {
    const router = useRouter();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (!show) return;

        // Countdown timer
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    // Auto redirect setelah countdown selesai
                    setTimeout(() => {
                        onClose();
                        router.push("/dashboard/user");
                        router.refresh(); // Refresh halaman
                    }, 500);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [show, onClose, router]);

    // Function to get book image URL
    const getBookImageUrl = (imgPath) => {
        if (!imgPath) return "/api/placeholder/80/112";
        
        if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
            return imgPath;
        }
        
        if (imgPath.startsWith('/')) {
            return imgPath;
        }
        
        return `/buku/${imgPath}`;
    };

    if (!show || !book) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-slideUp">

                {/* Header dengan Gradient */}
                <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-6 py-6 relative overflow-hidden">
                    {/* Animated Background Circles */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    
                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                            {/* Status Icon with Pulsing Animation */}
                            <div className="relative">
                                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                    <Clock className="w-7 h-7 text-white animate-pulse" />
                                </div>
                                {/* Pulsing Ring */}
                                <div className="absolute inset-0 w-14 h-14 bg-yellow-400/30 rounded-2xl animate-ping"></div>
                                {/* Badge */}
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full border-3 border-blue-700 flex items-center justify-center">
                                    <span className="text-xs font-bold text-blue-900">!</span>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1">Menunggu Konfirmasi</h2>
                                <p className="text-blue-100 text-sm font-medium">Permintaan sedang diproses</p>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                onClose();
                                router.push("/dashboard/user");
                            }}
                            className="text-white/80 hover:text-white hover:bg-white/20 rounded-xl p-2.5 transition-all hover:scale-110"
                        >
                            <X size={22} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">

                    {/* Auto Redirect Info */}
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Redirect Otomatis</p>
                                    <p className="text-xs text-gray-600">Menuju dashboard dalam {countdown} detik</p>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-purple-600 animate-pulse">
                                {countdown}
                            </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="mt-3 h-2 bg-purple-200 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-1000 ease-linear"
                                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-xl p-4 shadow-sm">
                        <div className="flex gap-3">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                                    <AlertCircle className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-amber-900 text-sm mb-1.5">
                                    🔔 Menunggu Persetujuan Admin
                                </h3>
                                <p className="text-amber-800 text-xs leading-relaxed">
                                    Permintaan peminjaman Anda sedang ditinjau oleh admin perpustakaan. 
                                    Anda akan mendapat notifikasi setelah disetujui.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Book Info Card */}
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-5 border-2 border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-1.5 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                            <h3 className="text-sm font-bold text-gray-900">Detail Peminjaman</h3>
                        </div>
                        
                        <div className="flex gap-4 mb-4">
                            {/* Book Cover */}
                            <div className="flex-shrink-0">
                                <div className="relative group">
                                    <img
                                        src={getBookImageUrl(book.img)}
                                        alt={book.judul}
                                        className="w-24 h-32 object-cover rounded-xl shadow-lg border-2 border-white group-hover:scale-105 transition-transform"
                                        onError={(e) => {
                                            e.target.src = "/api/placeholder/80/112";
                                        }}
                                    />
                                    {/* Overlay Badge */}
                                    <div className="absolute bottom-2 left-2 right-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg px-2 py-1">
                                        <p className="text-white text-xs font-bold text-center">Tersedia</p>
                                    </div>
                                </div>
                            </div>

                            {/* Book Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start gap-2 mb-2">
                                    <BookOpen className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <h4 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2">
                                        {book.judul}
                                    </h4>
                                </div>
                                <p className="text-xs text-gray-600 mb-1 font-medium">{book.penulis}</p>
                                <p className="text-xs text-gray-500">{book.penerbit}</p>
                                
                                {/* Status Badge */}
                                <div className="mt-3 inline-flex items-center gap-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md">
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    Siap Dipinjam
                                </div>
                            </div>
                        </div>

                        {/* Dates Info */}
                        <div className="space-y-3 pt-4 border-t-2 border-gray-200">
                            {/* Tanggal Pinjam */}
                            <div className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Calendar className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-gray-700 text-sm font-semibold">Tanggal Pinjam</span>
                                </div>
                                <span className="font-bold text-gray-900 text-sm">
                                    {new Date(borrowDate).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </span>
                            </div>

                            {/* Tanggal Kembali */}
                            <div className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                        <Calendar className="w-4 h-4 text-red-600" />
                                    </div>
                                    <span className="text-gray-700 text-sm font-semibold">Batas Kembali</span>
                                </div>
                                <span className="font-bold text-gray-900 text-sm">
                                    {new Date(returnDate).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </span>
                            </div>

                            {fine > 0 && (
                                <div className="flex items-center justify-between bg-red-50 rounded-lg p-3 border border-red-200">
                                    <span className="text-red-700 font-bold text-sm">Denda Keterlambatan</span>
                                    <span className="font-bold text-red-600 text-lg">
                                        Rp {fine.toLocaleString()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Timeline Steps */}
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-5 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                            Proses Peminjaman
                        </h3>
                        <div className="space-y-4">
                            {/* Step 1 - Done */}
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="w-0.5 h-10 bg-gradient-to-b from-green-400 to-yellow-400"></div>
                                </div>
                                <div className="flex-1 pb-2">
                                    <p className="font-bold text-gray-900 text-sm mb-0.5">✓ Permintaan Dikirim</p>
                                    <p className="text-xs text-gray-500">Berhasil mengajukan peminjaman</p>
                                </div>
                            </div>

                            {/* Step 2 - Current */}
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                                        <Clock className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="w-0.5 h-10 bg-gradient-to-b from-yellow-400 to-gray-300"></div>
                                </div>
                                <div className="flex-1 pb-2">
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-gray-900 text-sm">⏳ Menunggu Admin</p>
                                        <div className="flex gap-1">
                                            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce"></div>
                                            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5">Sedang dalam proses verifikasi</p>
                                </div>
                            </div>

                            {/* Step 3 - Pending */}
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-gray-300 rounded-xl flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-400 text-sm mb-0.5">○ Disetujui</p>
                                    <p className="text-xs text-gray-400">Menunggu konfirmasi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-5 flex gap-3 border-t-2 border-gray-200">
                    <button
                        onClick={() => {
                            onClose();
                            router.push("/dashboard/user");
                        }}
                        className="flex-1 px-6 py-3 text-sm font-bold rounded-xl bg-white hover:bg-gray-100 border-2 border-gray-300 text-gray-700 transition-all hover:scale-105 shadow-md hover:shadow-lg"
                    >
                        Tutup
                    </button>
                    <button
                        onClick={() => {
                            onClose();
                            router.push("/dashboard/user");
                        }}
                        className="flex-1 px-6 py-3 text-sm font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all hover:scale-105 shadow-md hover:shadow-xl"
                    >
                        Ke Dashboard →
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn { 
                    from { opacity: 0; } 
                    to { opacity: 1; } 
                }
                @keyframes slideUp { 
                    from { 
                        opacity: 0; 
                        transform: translateY(30px) scale(0.95); 
                    } 
                    to { 
                        opacity: 1; 
                        transform: translateY(0) scale(1); 
                    } 
                }
                .animate-fadeIn { 
                    animation: fadeIn 0.3s ease-out; 
                }
                .animate-slideUp { 
                    animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); 
                }
            `}</style>
        </div>
    );
}