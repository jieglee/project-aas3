"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Clock, X, Calendar, BookOpen, AlertCircle } from "lucide-react";

export default function ModalWaitingAdmin({ show, onClose, book, borrowDate, returnDate, fine }) {
    const [approved, setApproved] = useState(false);

    useEffect(() => {
        if (!show) return;
        setApproved(false);

        const timer = setTimeout(() => {
            setApproved(true);
        }, 9000);

        return () => clearTimeout(timer);
    }, [show]);

    if (!show || !book) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slideUp">
                
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-5 py-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                    
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                                {!approved ? (
                                    <Clock className="text-white w-5 h-5" />
                                ) : (
                                    <CheckCircle className="text-white w-5 h-5" />
                                )}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">
                                    {!approved ? "Menunggu Konfirmasi" : "Peminjaman Disetujui!"}
                                </h2>
                                <p className="text-blue-100 text-xs mt-0.5">
                                    {!approved ? "Proses verifikasi admin" : "Buku siap dipinjam"}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                    
                    {!approved ? (
                        <>
                            {/* Loading State */}
                            <div className="text-center py-6">
                                <div className="relative w-20 h-20 mx-auto mb-4">
                                    <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                                    <Clock className="absolute inset-0 m-auto w-10 h-10 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Sedang Diproses</h3>
                                <p className="text-sm text-gray-600">
                                    Menunggu verifikasi dari admin perpustakaan
                                </p>
                            </div>

                            {/* Book Info */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3.5 border border-blue-200">
                                <div className="flex gap-3">
                                    <img
                                        src={`/buku/${book.img}`}
                                        alt={book.judul}
                                        className="w-14 h-20 object-cover rounded-lg shadow-md"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">{book.judul}</h3>
                                        <p className="text-xs text-gray-600">{book.penulis}</p>
                                        <p className="text-xs text-gray-500 mt-1">{book.penerbit}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Info Alert */}
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
                                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                <div className="text-xs text-amber-800">
                                    <p className="font-semibold mb-1">Informasi</p>
                                    <p>Tunggu 10 detik, admin sibuk ngopi dulu, sabar ya!</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Success State */}
                            <div className="text-center py-4">
                                <div className="relative w-20 h-20 mx-auto mb-4">
                                    <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
                                    <div className="relative bg-blue-500 rounded-full w-20 h-20 flex items-center justify-center">
                                        <CheckCircle className="text-white w-12 h-12 animate-bounce-slow" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Peminjaman Disetujui!</h3>
                                <p className="text-sm text-blue-600 font-medium">
                                    Silakan ambil buku di perpustakaan
                                </p>
                            </div>

                            {/* Book Info Card */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200">
                                <div className="flex items-start gap-3 mb-3">
                                    <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-800 text-sm mb-1">{book.judul}</h4>
                                        <p className="text-xs text-gray-600">{book.penulis}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-3 border-t border-blue-200">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4" />
                                            Tanggal Pinjam:
                                        </span>
                                        <span className="font-semibold text-gray-800">
                                            {new Date(borrowDate).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4" />
                                            Batas Kembali:
                                        </span>
                                        <span className="font-semibold text-gray-800">
                                            {new Date(returnDate).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    {fine > 0 && (
                                        <div className="flex items-center justify-between text-sm pt-2 border-t border-blue-200">
                                            <span className="text-red-600 font-medium">Denda:</span>
                                            <span className="font-bold text-red-600">Rp {fine.toLocaleString()}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Success Message */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <p className="text-sm text-blue-800 text-center">
                                    ✓ Peminjaman berhasil dikonfirmasi oleh admin
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-5 py-3.5 flex justify-end border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className={`px-6 py-2 text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow ${
                            approved 
                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white" 
                                : "bg-white hover:bg-gray-100 border-2 border-gray-300 text-gray-700"
                        }`}
                    >
                        {approved ? "Ke Riwayat Peminjaman" : "Tutup"}
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
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes bounce-slow {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
                .animate-bounce-slow {
                    animation: bounce-slow 2s infinite;
                }
            `}</style>
        </div>
    );
}
