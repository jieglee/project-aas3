import { Clock, AlertTriangle, CheckCircle, XCircle, Package, Calendar, User, Info } from 'lucide-react';

export default function PeminjamanCard({ item }) {
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

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const fallbackSVG = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="128"%3E%3Crect fill="%23e5e7eb" width="96" height="128"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%239ca3af" font-size="12"%3ENo Image%3C/text%3E%3C/svg%3E';
    
    const imageSrc = getImageSrc(item.img);

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
            <div className="p-5">
                <div className="flex gap-4">
                    {/* Book Image */}
                    <div className="flex-shrink-0">
                        <img
                            src={imageSrc || fallbackSVG}
                            alt={item.judulBuku}
                            className="w-20 h-28 object-cover rounded-lg shadow-sm border-2 border-gray-200"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackSVG;
                            }}
                        />
                    </div>

                    {/* Book Details */}
                    <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1 min-w-0 mr-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                                    {item.judulBuku}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <User className="w-4 h-4" />
                                    <span>{item.penulis}</span>
                                </div>
                            </div>
                            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                                item.status === 'Menunggu' ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' :
                                item.status === 'Dipinjam' ? 'bg-blue-100 text-blue-700 border border-blue-300' :
                                item.status === 'Terlambat' ? 'bg-red-100 text-red-700 border border-red-300' :
                                item.status === 'Dikembalikan' ? 'bg-green-100 text-green-700 border border-green-300' :
                                'bg-gray-100 text-gray-700 border border-gray-300'
                            }`}>
                                {item.status}
                            </span>
                        </div>

                        {/* Dates */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                                <span className="text-xs text-blue-700 font-medium">
                                    Pinjam: {formatDate(item.tanggal_pinjam)}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">
                                <Calendar className="w-3.5 h-3.5 text-red-600" />
                                <span className="text-xs text-red-700 font-medium">
                                    Kembali: {formatDate(item.tanggal_kembali)}
                                </span>
                            </div>
                        </div>

                        {/* Status Info */}
                        {item.status === 'Menunggu' && (
                            <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg p-3">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-yellow-600" />
                                    <div>
                                        <p className="text-sm font-bold text-yellow-900">Menunggu Konfirmasi</p>
                                        <p className="text-xs text-yellow-700">Akan diproses dalam 3x24 jam</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {item.status === 'Dipinjam' && (
                            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-3">
                                <div className="flex items-center gap-2">
                                    <Package className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <p className="text-sm font-bold text-blue-900">Buku Sedang Dipinjam</p>
                                        <p className="text-xs text-blue-700">Kembalikan sebelum {formatDate(item.tanggal_kembali)}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {item.status === 'Terlambat' && (
                            <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-3">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-red-600" />
                                    <div>
                                        <p className="text-sm font-bold text-red-900">Peminjaman Terlambat</p>
                                        <p className="text-xs text-red-700">Denda: Rp {item.denda?.toLocaleString('id-ID') || 0}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {item.status === 'Dikembalikan' && (
                            <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-3">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <div>
                                        <p className="text-sm font-bold text-green-900">Berhasil Dikembalikan</p>
                                        <p className="text-xs text-green-700">Terima kasih telah mengembalikan buku</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {item.status === 'Ditolak' && (
                            <div className="bg-gray-50 border-l-4 border-gray-500 rounded-r-lg p-3">
                                <div className="flex items-start gap-2">
                                    <XCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-900 mb-2">Peminjaman Ditolak</p>
                                        <div className="bg-white rounded-lg p-3 border border-gray-300">
                                            <div className="flex items-start gap-2">
                                                <Info className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs text-gray-600 font-semibold mb-1">Alasan Penolakan:</p>
                                                    <p className="text-xs text-gray-800 leading-relaxed">
                                                        {item.alasan_penolakan || 'Admin belum memberikan alasan penolakan'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}