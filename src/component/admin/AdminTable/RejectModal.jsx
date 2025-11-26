import { XCircle } from 'lucide-react';

export default function RejectModal({ 
    show, 
    selectedLoan, 
    loans, 
    rejectReason, 
    setRejectReason,
    onConfirm,
    onClose 
}) {
    if (!show || !selectedLoan) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                        <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Tolak Peminjaman</h2>
                        <p className="text-gray-500 text-xs">
                            {loans.find(l => l.id === selectedLoan)?.peminjam || "Peminjam"}
                        </p>
                    </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                    Buku: <span className="font-semibold">
                        {loans.find(l => l.id === selectedLoan)?.judulBuku || "Judul Buku"}
                    </span>
                </p>

                <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                        Masukkan alasan penolakan (wajib):
                    </label>
                    <textarea
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="Contoh: Stok buku sedang habis, Buku sedang dalam perbaikan, dll."
                        className="w-full px-3 py-2 border border-gray-300 text-sm text-gray-900 bg-gray-50 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:bg-white transition-all resize-none placeholder:text-gray-400"
                        rows="3"
                        autoFocus
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-bold transition-all"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-lg text-sm font-bold transition-all"
                    >
                        Tolak Peminjaman
                    </button>
                </div>
            </div>
        </div>
    );
}