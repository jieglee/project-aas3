"use client";

import { useState } from "react";
import { X, Calendar, AlertCircle, Clock } from "lucide-react";

export default function ModalWaitingAdmin({
    show,
    onClose,
    book,
    borrowDate,
    returnDate,
    fine
}) {
    const [loading, setLoading] = useState(false);

    if (!show || !book) return null;

    const handleCreateRiwayat = async () => {
        try {
            setLoading(true);

            const user = JSON.parse(localStorage.getItem("user"));

            await fetch("/api/peminjaman", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: user.id,
                    buku_id: book.id,
                    tanggal_pinjam: borrowDate,
                    tanggal_kembali: returnDate,
                })
            });

        } catch (err) {
            console.error("Gagal mengirim ke riwayat:", err);
        } finally {
            setLoading(false);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slideUp">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-5 py-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Animated Icon */}
                            <div className="relative w-9 h-9">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-50 animate-ping-slow"></div>
                                <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-spin-slow"></div>
                                <Clock className="absolute inset-0 m-auto w-5 h-5 text-white" />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-white">Menunggu Konfirmasi</h2>
                                <p className="text-blue-100 text-xs mt-0.5">Proses verifikasi admin</p>
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

                    {/* Book Info Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200">
                        <div className="flex gap-3 mb-3">
                            <img
                                src={`/buku/${book.img}`}
                                alt={book.judul}
                                className="w-16 h-24 object-cover rounded-lg shadow-md"
                            />
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-800 text-sm mb-1">{book.judul}</h4>
                                <p className="text-xs text-gray-600">{book.penulis}</p>
                                <p className="text-xs text-gray-500 mt-1">{book.penerbit}</p>
                            </div>
                        </div>

                        <div className="space-y-2 pt-3 border-t border-blue-200">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    Tanggal Pinjam:
                                </span>
                                <span className="font-semibold text-gray-800">
                                    {new Date(borrowDate).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    Batas Kembali:
                                </span>
                                <span className="font-semibold text-gray-800">
                                    {new Date(returnDate).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
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

                    {/* Info Alert */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="text-xs text-amber-800">
                            <p className="font-semibold mb-1">Informasi</p>
                            <p>Tunggu konfirmasi dari admin perpustakaan, sabar ya!</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-5 py-3.5 flex justify-end border-t border-gray-200">
                    <button
                        disabled={loading}
                        onClick={handleCreateRiwayat}
                        className="px-6 py-2 text-sm font-medium rounded-lg bg-white hover:bg-gray-100 border-2 border-gray-300 text-gray-700 transition-all shadow-sm disabled:opacity-50"
                    >
                        {loading ? "Mengirim..." : "Tutup"}
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes ping-slow { 0% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.5); opacity: 0.3; } 100% { transform: scale(1); opacity: 0.6; } }
                .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
                .animate-slideUp { animation: slideUp 0.3s ease-out; }
                .animate-spin-slow { animation: spin-slow 1.5s linear infinite; }
                .animate-ping-slow { animation: ping-slow 1.5s ease-in-out infinite; }
            `}</style>
        </div>
    );
}
