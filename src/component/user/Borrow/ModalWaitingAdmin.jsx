"use client";

import { X, Clock, Calendar, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ModalWaitingAdmin({
    show,
    onClose,
    book,
    borrowDate,
    returnDate
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

                {/* Header */}
                <div className="bg-blue-600 px-6 py-4 rounded-t-xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <Clock className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">Menunggu Konfirmasi</h2>
                                <p className="text-sm text-blue-100">Sedang diproses admin</p>
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
                <div className="p-6 space-y-4">

                    {/* Book Info */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex gap-3">
                            <img
                                src={getBookImageUrl(book.img)}
                                alt={book.judul}
                                className="w-20 h-28 object-cover rounded-lg shadow-sm"
                                onError={(e) => {
                                    e.target.src = "/api/placeholder/80/112";
                                }}
                            />
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
                                    {book.judul}
                                </h4>
                                <p className="text-xs text-gray-600 mb-2">{book.penulis}</p>
                                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-semibold">
                                    <CheckCircle className="w-3 h-3" />
                                    Tersedia
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-2 text-blue-700">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm font-medium">Tanggal Pinjam</span>
                            </div>
                            <span className="font-semibold text-blue-900 text-sm">
                                {new Date(borrowDate).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric"
                                })}
                            </span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <div className="flex items-center gap-2 text-orange-700">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm font-medium">Batas Kembali</span>
                            </div>
                            <span className="font-semibold text-orange-900 text-sm">
                                {new Date(returnDate).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric"
                                })}
                            </span>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
                        <p className="text-sm text-yellow-800">
                            <span className="font-semibold">⏱️ Catatan:</span> Permintaan Anda akan diproses dalam waktu 3x24 jam
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                    >
                        Tutup
                    </button>
                    <button
                        onClick={() => {
                            onClose();
                            router.push("/user/Peminjaman");
                        }}
                        className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
                    >
                        Lihat Status
                    </button>
                </div>
            </div>
        </div>
    );
}