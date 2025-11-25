"use client";

import { useState, useEffect } from 'react';
import { 
    Clock, 
    BookOpen, 
    AlertTriangle, 
    Archive, 
    Search, 
    Filter,
    CheckCircle, 
    XCircle,
    User,
    Calendar,
    RotateCcw
} from 'lucide-react';

export default function LoanManagement() {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("Menunggu");

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/peminjaman");
            const data = await res.json();
            setLoans(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error fetching loans:", err);
            setLoans([]);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        if (!confirm("Setujui peminjaman ini?")) return;

        try {
            const res = await fetch(`/api/peminjaman/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "Dipinjam" })
            });

            if (res.ok) {
                alert("✅ Peminjaman berhasil disetujui!");
                fetchLoans();
            } else {
                alert("❌ Gagal menyetujui peminjaman");
            }
        } catch (err) {
            console.error("Error approving loan:", err);
            alert("⚠️ Terjadi kesalahan saat menyetujui peminjaman");
        }
    };

    const handleReject = async (id) => {
        if (!confirm("Yakin ingin menolak peminjaman ini?")) return;

        try {
            const res = await fetch(`/api/peminjaman/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "Ditolak" })
            });

            if (res.ok) {
                alert("✅ Peminjaman berhasil ditolak!");
                fetchLoans();
            } else {
                alert("❌ Gagal menolak peminjaman");
            }
        } catch (err) {
            console.error("Error rejecting loan:", err);
            alert("⚠️ Terjadi kesalahan saat menolak peminjaman");
        }
    };

    const handleReturn = async (id) => {
        if (!confirm("Konfirmasi bahwa buku ini sudah dikembalikan?")) return;

        try {
            const res = await fetch(`/api/peminjaman/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "Dikembalikan" })
            });

            if (res.ok) {
                alert("✅ Buku berhasil dikembalikan!");
                fetchLoans();
            } else {
                alert("❌ Gagal mengonfirmasi pengembalian");
            }
        } catch (err) {
            console.error("Error returning book:", err);
            alert("⚠️ Terjadi kesalahan saat mengonfirmasi pengembalian");
        }
    };

    const tabs = [
        { id: "Menunggu", label: "Persetujuan", icon: Clock },
        { id: "Dipinjam", label: "Aktif", icon: BookOpen },
        { id: "Terlambat", label: "Terlambat", icon: AlertTriangle },
        { id: "Dikembalikan", label: "Riwayat", icon: Archive },
        { id: "Ditolak", label: "Ditolak", icon: XCircle }
    ];

    const getTabCount = (status) => {
        return loans.filter(l => l.status === status).length;
    };

    const filteredLoans = loans.filter(loan => {
        const matchTab = loan.status === activeTab;
        const matchSearch = 
            loan.peminjam?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            loan.judulBuku?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchTab && matchSearch;
    });

    // Helper untuk handle URL gambar (sama seperti di user component)
    const getImageSrc = (imgPath) => {
        if (!imgPath) return null;
        
        const httpsIndex = imgPath.indexOf('https://');
        if (httpsIndex > 0) {
            return imgPath.substring(httpsIndex);
        }
        
        const httpIndex = imgPath.indexOf('http://');
        if (httpIndex > 0) {
            return imgPath.substring(httpIndex);
        }
        
        if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
            return imgPath;
        }
        
        if (imgPath.startsWith('/')) {
            return imgPath;
        }
        
        return `/buku/${imgPath}`;
    };

    const fallbackSVG = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="160" height="220"%3E%3Crect fill="%23e5e7eb" width="160" height="220"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%239ca3af" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-6">
                        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-gray-900 text-lg font-semibold">Memuat data peminjaman...</p>
                    <p className="text-gray-500 text-sm mt-2">Mohon tunggu sebentar</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="min-h-screen p-8">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header - Elegant with Blue */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg">
                                    <BookOpen className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-1">
                                        Manajemen Peminjaman
                                    </h1>
                                    <p className="text-gray-600">Kelola dan monitor aktivitas peminjaman perpustakaan</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500 mb-1">Total Transaksi</p>
                                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                    {loans.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tabs - Elegant with Colors */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-3 mb-8">
                        <div className="grid grid-cols-5 gap-3">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const count = getTabCount(tab.id);
                                const isActive = activeTab === tab.id;
                                
                                let gradientClass = '';
                                let shadowClass = '';
                                
                                if (tab.id === "Menunggu") {
                                    gradientClass = isActive ? 'from-orange-400 to-orange-600' : '';
                                    shadowClass = isActive ? 'shadow-orange-200' : '';
                                } else if (tab.id === "Dipinjam") {
                                    gradientClass = isActive ? 'from-blue-400 to-blue-600' : '';
                                    shadowClass = isActive ? 'shadow-blue-200' : '';
                                } else if (tab.id === "Terlambat") {
                                    gradientClass = isActive ? 'from-red-400 to-red-600' : '';
                                    shadowClass = isActive ? 'shadow-red-200' : '';
                                } else if (tab.id === "Ditolak") {
                                    gradientClass = isActive ? 'from-red-400 to-red-500' : '';
                                    shadowClass = isActive ? 'shadow-red-200' : '';
                                } else {
                                    gradientClass = isActive ? 'from-gray-400 to-gray-600' : '';
                                    shadowClass = isActive ? 'shadow-gray-200' : '';
                                }
                                
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`relative p-5 rounded-2xl transition-all duration-300 ${
                                            isActive 
                                                ? `bg-gradient-to-br ${gradientClass} text-white shadow-xl ${shadowClass} scale-105` 
                                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:shadow-lg'
                                        }`}
                                    >
                                        <div className="flex flex-col items-center gap-3">
                                            <div className={`p-3 rounded-xl transition-all ${
                                                isActive ? 'bg-white/20' : 'bg-white shadow-sm'
                                            }`}>
                                                <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                            </div>
                                            <div className="text-center">
                                                <p className={`text-sm font-bold mb-1 ${isActive ? 'text-white' : 'text-gray-700'}`}>
                                                    {tab.label}
                                                </p>
                                                <p className={`text-2xl font-bold ${isActive ? 'text-white' : 'text-gray-900'}`}>
                                                    {count}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Search Bar - Elegant */}
                    <div className="flex gap-4 mb-8">
                        <div className="flex-1 bg-white rounded-2xl px-6 py-4 flex items-center gap-3 shadow-lg border border-gray-200">
                            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Cari peminjam atau judul buku..."
                                className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-700 placeholder-gray-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button 
                                    onClick={() => setSearchTerm("")}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <XCircle className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                        <button className="bg-white rounded-2xl px-6 py-4 hover:bg-gray-50 transition-all shadow-lg border border-gray-200">
                            <Filter className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    {/* Loan Cards - Elegant Design */}
                    <div className="space-y-5">
                        {filteredLoans.length === 0 ? (
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-16 text-center">
                                <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <BookOpen className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak Ada Data Peminjaman</h3>
                                <p className="text-gray-500">Belum ada peminjaman dengan status <span className="font-semibold">{activeTab}</span></p>
                            </div>
                        ) : (
                            filteredLoans.map((loan) => {
                                const imageSrc = getImageSrc(loan.img);
                                
                                return (
                                    <div key={loan.id} className="bg-white rounded-3xl shadow-xl border border-gray-200 p-7 hover:shadow-2xl transition-all duration-300 group">
                                        <div className="flex gap-6 items-start">
                                            
                                            {/* Book Cover - Elegant */}
                                            <div className="flex-shrink-0 relative">
                                                <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-4 ring-gray-100">
                                                    <img
                                                        src={imageSrc || fallbackSVG}
                                                        alt={loan.judulBuku || "Book cover"}
                                                        className="w-40 h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                                                        onError={(e) => {
                                                            console.error("❌ Image load error for:", loan.img);
                                                            e.target.onerror = null;
                                                            e.target.src = fallbackSVG;
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                </div>
                                            </div>

                                            {/* Book Info - Full Width */}
                                            <div className="flex-1 min-w-0">
                                                {/* Title & Author */}
                                                <div className="mb-5">
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                        {loan.judulBuku || "Judul tidak tersedia"}
                                                    </h3>
                                                    <p className="text-gray-600 font-medium flex items-center gap-2">
                                                        <User className="w-4 h-4" />
                                                        {loan.penulis || "Penulis tidak tersedia"}
                                                    </p>
                                                </div>

                                                {/* Elegant Badges */}
                                                <div className="flex gap-2 mb-5">
                                                    <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs font-bold shadow-lg">
                                                        #{loan.id?.toString().padStart(3, '0') || '000'}
                                                    </span>
                                                    <span className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-full text-xs font-bold shadow-lg">
                                                        {loan.kategori || "Umum"}
                                                    </span>
                                                </div>

                                                {/* Borrower & Date in One Row */}
                                                <div className="grid grid-cols-2 gap-4 mb-5">
                                                    {/* Borrower Card */}
                                                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 border border-gray-200">
                                                        <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">Peminjam</p>
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                                                <User className="w-6 h-6 text-white" />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-900">{loan.peminjam || "Nama tidak tersedia"}</p>
                                                                <p className="text-xs text-gray-500 font-medium">User ID: {loan.user_id || "-"}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Date Info */}
                                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 border border-blue-200">
                                                        <p className="text-xs font-bold text-blue-600 mb-3 uppercase tracking-wide">Tanggal</p>
                                                        <div className="space-y-2">
                                                            {loan.tanggal_pinjam && (
                                                                <div className="flex items-center gap-2">
                                                                    <Calendar className="w-4 h-4 text-blue-600" />
                                                                    <div>
                                                                        <p className="text-xs text-blue-600 font-semibold">Pinjam</p>
                                                                        <p className="text-sm font-bold text-gray-900">
                                                                            {new Date(loan.tanggal_pinjam).toLocaleDateString('id-ID', {
                                                                                day: 'numeric',
                                                                                month: 'short',
                                                                                year: 'numeric'
                                                                            })}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {loan.tanggal_kembali && (
                                                                <div className="flex items-center gap-2">
                                                                    <Calendar className="w-4 h-4 text-red-600" />
                                                                    <div>
                                                                        <p className="text-xs text-red-600 font-semibold">Kembali</p>
                                                                        <p className="text-sm font-bold text-gray-900">
                                                                            {new Date(loan.tanggal_kembali).toLocaleDateString('id-ID', {
                                                                                day: 'numeric',
                                                                                month: 'short',
                                                                                year: 'numeric'
                                                                            })}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action Buttons - Below */}
                                                {activeTab === "Menunggu" && (
                                                    <div className="flex gap-3">
                                                        <button
                                                            onClick={() => handleApprove(loan.id)}
                                                            className="flex-1 px-6 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                                                        >
                                                            <CheckCircle className="w-5 h-5" />
                                                            Setujui Peminjaman
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(loan.id)}
                                                            className="flex-1 px-6 py-3.5 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                                                        >
                                                            <XCircle className="w-5 h-5" />
                                                            Tolak Pengajuan
                                                        </button>
                                                    </div>
                                                )}

                                                {activeTab === "Dipinjam" && (
                                                    <div className="flex gap-3">
                                                        <div className="flex-1 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl px-6 py-4 font-bold text-center shadow-xl">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <BookOpen className="w-6 h-6" />
                                                                <span className="text-lg">Sedang Dipinjam</span>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => handleReturn(loan.id)}
                                                            className="px-6 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                                                        >
                                                            <RotateCcw className="w-5 h-5" />
                                                            Konfirmasi Pengembalian
                                                        </button>
                                                    </div>
                                                )}

                                                {activeTab === "Terlambat" && (
                                                    <div className="flex gap-3">
                                                        <div className="flex-1 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl px-6 py-4 font-bold text-center shadow-xl">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <AlertTriangle className="w-6 h-6 animate-pulse" />
                                                                <span className="text-lg">Terlambat! Denda: Rp {loan.denda?.toLocaleString('id-ID') || 0}</span>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => handleReturn(loan.id)}
                                                            className="px-6 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                                                        >
                                                            <RotateCcw className="w-5 h-5" />
                                                            Konfirmasi Pengembalian
                                                        </button>
                                                    </div>
                                                )}

                                                {activeTab === "Dikembalikan" && (
                                                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl px-6 py-4 font-bold text-center shadow-xl">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <CheckCircle className="w-6 h-6" />
                                                            <span className="text-lg">Peminjaman Selesai</span>
                                                        </div>
                                                    </div>
                                                )}

                                                {activeTab === "Ditolak" && (
                                                    <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl px-6 py-4 font-bold text-center shadow-xl">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <XCircle className="w-6 h-6" />
                                                            <span className="text-lg">Peminjaman Ditolak</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}