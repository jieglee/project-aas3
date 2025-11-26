import { 
    CheckCircle, 
    XCircle, 
    User, 
    Calendar, 
    RotateCcw, 
    AlertTriangle 
} from 'lucide-react';

export default function LoanCard({ loan, activeTab, onApprove, onReject, onReturn }) {
    const getImageSrc = (imgPath) => {
        if (!imgPath) return null;
        
        const httpsIndex = imgPath.indexOf('https://');
        if (httpsIndex > 0) return imgPath.substring(httpsIndex);
        
        const httpIndex = imgPath.indexOf('http://');
        if (httpIndex > 0) return imgPath.substring(httpIndex);
        
        if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) return imgPath;
        if (imgPath.startsWith('/')) return imgPath;
        
        return `/buku/${imgPath}`;
    };

    const getAlasanPenolakan = (loan) => {
    // Cek berbagai kemungkinan nama field
    const alasan = loan.alasan_penolakan || 
                   loan.alasanPenolakan || 
                   loan.alasan_ditolak || 
                   loan.reason;
    
    // Return alasan atau pesan default
    return alasan && alasan.trim() !== "" 
        ? alasan 
        : "Tidak ada alasan yang diberikan";
};

    const fallbackSVG = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="160" height="220"%3E%3Crect fill="%23f3f4f6" width="160" height="220"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%239ca3af" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
    
    const imageSrc = getImageSrc(loan.img);

    return (
        <div className="bg-white rounded-xl shadow hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="flex gap-0">
                {/* Book Cover */}
                <div className="flex-shrink-0 w-40 relative">
                    <img
                        src={imageSrc || fallbackSVG}
                        alt={loan.judulBuku || "Book cover"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = fallbackSVG;
                        }}
                    />
                </div>

                {/* Book Info */}
                <div className="flex-1 p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {loan.judulBuku || "Judul tidak tersedia"}
                            </h3>
                            <p className="text-sm text-gray-600">{loan.penulis || "Penulis tidak tersedia"}</p>
                        </div>
                        <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs font-bold">
                            #{loan.id?.toString().padStart(3, '0') || '000'}
                        </span>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center gap-1.5 mb-1">
                                <User className="w-3.5 h-3.5 text-gray-400" />
                                <p className="text-xs font-semibold text-gray-500">Peminjam</p>
                            </div>
                            <p className="text-sm font-bold text-gray-900 truncate">{loan.peminjam || "-"}</p>
                        </div>
                        {loan.tanggal_pinjam && (
                            <div className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                    <p className="text-xs font-semibold text-gray-500">Tgl Pinjam</p>
                                </div>
                                <p className="text-sm font-bold text-gray-900">
                                    {new Date(loan.tanggal_pinjam).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        )}
                        {loan.tanggal_kembali && (
                            <div className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                    <p className="text-xs font-semibold text-gray-500">Tgl Kembali</p>
                                </div>
                                <p className="text-sm font-bold text-gray-900">
                                    {new Date(loan.tanggal_kembali).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="min-h-[44px]">
                        {activeTab === "Menunggu" && (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onApprove(loan.id)}
                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-1.5 transition-all"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    Setujui
                                </button>
                                <button
                                    onClick={() => onReject(loan.id)}
                                    className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg text-sm font-bold flex items-center justify-center gap-1.5 transition-all"
                                >
                                    <XCircle className="w-4 h-4" />
                                    Tolak
                                </button>
                            </div>
                        )}

                        {activeTab === "Dipinjam" && (
                            <button
                                onClick={() => onReturn(loan.id)}
                                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-1.5 transition-all"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Konfirmasi Pengembalian
                            </button>
                        )}

                        {activeTab === "Terlambat" && (
                            <div className="space-y-2">
                                <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg px-3 py-2 flex items-center gap-2">
                                    <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                                        <AlertTriangle className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium opacity-90">Denda</p>
                                        <p className="text-sm font-bold">Rp {loan.denda?.toLocaleString('id-ID') || 0}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => onReturn(loan.id)}
                                    className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-1.5 transition-all"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Konfirmasi Pengembalian
                                </button>
                            </div>
                        )}

                        {activeTab === "Dikembalikan" && (
                            <>
                                {loan.status === "Dikembalikan" && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 flex items-center justify-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span className="text-sm font-bold text-green-700">Sudah Dikembalikan</span>
                                    </div>
                                )}

                                {loan.status === "Ditolak" && (
    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
        {/* Debug - tambahkan ini */}
        {console.log("Loan data:", loan)}
        {console.log("Alasan penolakan:", loan.alasan_penolakan)}
        
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-600" />
                <span className="text-xs font-bold text-red-600 uppercase tracking-wide">
                    Ditolak
                </span>
            </div>
            {loan.tanggal_ditolak && (
                <span className="text-xs text-gray-500">
                    {new Date(loan.tanggal_ditolak).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    })}
                </span>
            )}
        </div>
        <div className="bg-white rounded-lg p-2.5 border border-red-200">
            <p className="text-xs text-gray-600 font-semibold mb-1">Alasan Penolakan:</p>
            <p className="text-xs text-gray-800 leading-relaxed">
                 {getAlasanPenolakan(loan)}
            </p>
        </div>
    </div>
)} 
</>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}