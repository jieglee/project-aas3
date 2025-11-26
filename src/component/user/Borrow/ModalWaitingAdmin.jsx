"use client";

import { X, Calendar, Clock, CheckCircle, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ModalWaitingAdmin({
    show,
    onClose,
    book,
    borrowDate,
    returnDate,
    fine = 0
}) {
    const router = useRouter();

    const getBookImageUrl = (imgPath) => {
        if (!imgPath) return "/api/placeholder/80/112";
        if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) return imgPath;
        if (imgPath.startsWith('/')) return imgPath;
        return `/buku/${imgPath}`;
    };

    if (!show || !book) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-slideUp">

                {/* Header */}
                <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <Clock className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-white">Menunggu Konfirmasi</h2>
                            <p className="text-blue-100 text-xs">Sedang diproses admin</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-1 transition-all"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">

                    {/* Status */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-blue-900 text-xs font-semibold mb-1">Status Peminjaman</p>
                        <p className="text-blue-700 text-xs">Permintaan Anda sedang ditinjau oleh admin perpustakaan.</p>
                    </div>

                    {/* Book Info */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <div className="flex gap-2 mb-2">
                            <img
                                src={getBookImageUrl(book.img)}
                                alt={book.judul}
                                className="w-12 h-16 object-cover rounded border border-gray-300"
                                onError={(e) => {
                                    e.target.src = "/api/placeholder/80/112";
                                }}
                            />
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-900 text-xs leading-tight line-clamp-2 mb-1">
                                    {book.judul}
                                </h4>
                                <p className="text-xs text-gray-600">{book.penulis}</p>
                                <div className="mt-1 inline-flex items-center gap-1 bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-bold">
                                    <CheckCircle className="w-2.5 h-2.5" />
                                    Tersedia
                                </div>
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="space-y-1.5 pt-2 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 text-xs">Tanggal Pinjam</span>
                                <span className="font-semibold text-gray-900 text-xs">
                                    {new Date(borrowDate).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 text-xs">Batas Kembali</span>
                                <span className="font-semibold text-gray-900 text-xs">
                                    {new Date(returnDate).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                                    <CheckCircle className="w-3 h-3 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-xs">Permintaan Dikirim</p>
                                    <p className="text-xs text-gray-500">Berhasil mengajukan</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-5 h-5 bg-yellow-500 rounded flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-3 h-3 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-xs">Menunggu Admin</p>
                                    <p className="text-xs text-gray-500">Sedang diverifikasi</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-5 h-5 bg-gray-300 rounded flex items-center justify-center flex-shrink-0">
                                    <CheckCircle className="w-3 h-3 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-400 text-xs">Menunggu Persetujuan</p>
                                    <p className="text-xs text-gray-400">Belum diproses</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-4 py-3 flex gap-2 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="flex-1 px-3 py-2 text-xs font-semibold rounded-lg bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 transition-all"
                    >
                        Tutup
                    </button>
                    <button
                        onClick={() => {
                            onClose();
                            router.push("/user/Peminjaman");
                        }}
                        className="flex-1 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all"
                    >
                        Ke Riwayat
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