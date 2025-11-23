"use client";

import { X, Calendar, AlertCircle, Clock, CheckCircle } from "lucide-react";

export default function ModalWaitingAdmin({
    show,
    onClose,
    book,
    borrowDate,
    returnDate,
    fine = 0
}) {
    if (!show || !book) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slideUp">

                {/* Header */}
                <div className="bg-blue-600 px-6 py-5 relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Status Icon with Animation */}
                            <div className="relative">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-white animate-pulse" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-blue-600 animate-bounce"></div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-white">Menunggu Konfirmasi</h2>
                                <p className="text-blue-100 text-sm">Permintaan sedang diproses</p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">

                    {/* Status Badge */}
                    <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-4">
                        <div className="flex gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <h3 className="font-semibold text-amber-900 text-sm mb-1">
                                    Menunggu Persetujuan Admin
                                </h3>
                                <p className="text-amber-700 text-xs leading-relaxed">
                                    Permintaan peminjaman Anda sedang ditinjau oleh admin perpustakaan. Anda akan mendapat notifikasi setelah disetujui.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Book Info Card */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                            Detail Peminjaman
                        </h3>
                        
                        <div className="flex gap-4 mb-4">
                            <div className="flex-shrink-0">
                                <img
                                    src={book.img ? `/buku/${book.img}` : "/api/placeholder/80/112"}
                                    alt={book.judul}
                                    className="w-20 h-28 object-cover rounded-lg shadow-md border border-gray-200"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
                                    {book.judul}
                                </h4>
                                <p className="text-xs text-gray-600 mb-1">{book.penulis}</p>
                                <p className="text-xs text-gray-500">{book.penerbit}</p>
                                
                                <div className="mt-3 inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                                    <CheckCircle className="w-3 h-3" />
                                    Tersedia
                                </div>
                            </div>
                        </div>

                        {/* Dates Info */}
                        <div className="space-y-2.5 pt-3 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 text-sm flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                    Tanggal Pinjam
                                </span>
                                <span className="font-semibold text-gray-900 text-sm">
                                    {new Date(borrowDate).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 text-sm flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-red-600" />
                                    Batas Kembali
                                </span>
                                <span className="font-semibold text-gray-900 text-sm">
                                    {new Date(returnDate).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </span>
                            </div>

                            {fine > 0 && (
                                <div className="flex items-center justify-between pt-2.5 border-t border-gray-200">
                                    <span className="text-red-600 font-medium text-sm">Denda Keterlambatan</span>
                                    <span className="font-bold text-red-600 text-base">
                                        Rp {fine.toLocaleString()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Timeline Steps */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Proses Peminjaman</h3>
                        <div className="space-y-3">
                            {/* Step 1 - Done */}
                            <div className="flex gap-3">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="w-0.5 h-8 bg-gray-300"></div>
                                </div>
                                <div className="flex-1 pb-2">
                                    <p className="font-semibold text-gray-900 text-sm">Permintaan Dikirim</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Berhasil mengajukan peminjaman</p>
                                </div>
                            </div>

                            {/* Step 2 - Current */}
                            <div className="flex gap-3">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                                        <Clock className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="w-0.5 h-8 bg-gray-300"></div>
                                </div>
                                <div className="flex-1 pb-2">
                                    <p className="font-semibold text-gray-900 text-sm">Menunggu Admin</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Sedang dalam proses verifikasi</p>
                                </div>
                            </div>

                            {/* Step 3 - Pending */}
                            <div className="flex gap-3">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-500 text-sm">Disetujui</p>
                                    <p className="text-xs text-gray-400 mt-0.5">Menunggu konfirmasi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-white hover:bg-gray-100 border-2 border-gray-300 text-gray-700 transition-all"
                    >
                        Tutup
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md hover:shadow-lg"
                    >
                        Mengerti
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn { 
                    from { opacity: 0; } 
                    to { opacity: 1; } 
                }
                @keyframes slideUp { 
                    from { opacity: 0; transform: translateY(20px); } 
                    to { opacity: 1; transform: translateY(0); } 
                }
                .animate-fadeIn { 
                    animation: fadeIn 0.2s ease-out; 
                }
                .animate-slideUp { 
                    animation: slideUp 0.3s ease-out; 
                }
            `}</style>
        </div>
    );
}