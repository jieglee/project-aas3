"use client";

import { useState, useEffect } from 'react';
import { 
    Clock, 
    BookOpen, 
    AlertTriangle, 
    Archive, 
    Search,
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
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [rejectReason, setRejectReason] = useState("");

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/peminjaman");
            const data = await res.json();
            console.log("📚 Data fetched from API:", data);
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
        console.log("🔴 handleReject called with ID:", id);
        setSelectedLoan(id);
        setShowRejectModal(true);
    };

    const confirmReject = async () => {
        console.log("\n========================================");
        console.log("🔥 CONFIRM REJECT DIMULAI");
        console.log("========================================");
        console.log("📝 Selected Loan ID:", selectedLoan);
        console.log("📝 Reject Reason:", rejectReason);
        console.log("📝 Reject Reason Length:", rejectReason.length);
        console.log("📝 Reject Reason Trimmed:", rejectReason.trim());
        console.log("📝 Reject Reason Type:", typeof rejectReason);

        if (!rejectReason.trim()) {
            console.log("❌ Alasan kosong!");
            alert("⚠️ Mohon masukkan alasan penolakan!");
            return;
        }

        const payload = { 
            status: "Ditolak",
            alasan_penolakan: rejectReason.trim()
        };

        console.log("📦 Payload yang akan dikirim:", JSON.stringify(payload, null, 2));

        try {
            console.log(`🚀 Sending PUT request to: /api/peminjaman/${selectedLoan}`);
            
            const res = await fetch(`/api/peminjaman/${selectedLoan}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            console.log("📡 Response status:", res.status);
            console.log("📡 Response ok?:", res.ok);

            // Cek apakah response adalah JSON
            const contentType = res.headers.get("content-type");
            console.log("📡 Content-Type:", contentType);
            
            let data;
            
            if (contentType && contentType.includes("application/json")) {
                data = await res.json();
                console.log("📦 Response data:", JSON.stringify(data, null, 2));
            } else {
                // Jika bukan JSON, read as text untuk debugging
                const text = await res.text();
                console.error("❌ Non-JSON response:", text);
                throw new Error("Server tidak mengembalikan JSON response");
            }

            if (res.ok && data.success) {
                console.log("✅ SUKSES! Peminjaman berhasil ditolak");
                console.log("✅ Alasan yang tersimpan:", data.alasan_penolakan);
                alert("✅ Peminjaman berhasil ditolak!");
                setShowRejectModal(false);
                setRejectReason("");
                setSelectedLoan(null);
                
                console.log("🔄 Fetching loans again...");
                await fetchLoans();
                console.log("========================================\n");
            } else {
                console.error("❌ Error response:", data);
                alert("❌ Gagal menolak peminjaman: " + (data.error || data.message || "Unknown error"));
            }
        } catch (err) {
            console.error("❌❌❌ ERROR:", err);
            console.error("Error message:", err.message);
            console.error("Error stack:", err.stack);
            alert("⚠️ Terjadi kesalahan saat menolak peminjaman: " + err.message);
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
        { id: "Dikembalikan", label: "Riwayat", icon: Archive }
    ];

    const getTabCount = (status) => {
        // Tab "Riwayat" menampilkan Dikembalikan DAN Ditolak
        if (status === "Dikembalikan") {
            return loans.filter(l => l.status === "Dikembalikan" || l.status === "Ditolak").length;
        }
        return loans.filter(l => l.status === status).length;
    };

    const filteredLoans = loans.filter(loan => {
        // Tab "Riwayat" menampilkan Dikembalikan DAN Ditolak
        const matchTab = activeTab === "Dikembalikan" 
            ? (loan.status === "Dikembalikan" || loan.status === "Ditolak")
            : loan.status === activeTab;
            
        const matchSearch = 
            loan.peminjam?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            loan.judulBuku?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchTab && matchSearch;
    });

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

    const fallbackSVG = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="160" height="220"%3E%3Crect fill="%23f3f4f6" width="160" height="220"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%239ca3af" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-3 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <div className="max-w-7xl mx-auto">
                
                {/* Compact Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Manajemen Peminjaman</h1>
                            <p className="text-gray-500 text-xs">Kelola dan pantau aktivitas peminjaman buku</p>
                        </div>
                    </div>
                </div>

                {/* Compact Stats Cards */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const count = getTabCount(tab.id);
                        const isActive = activeTab === tab.id;
                        
                        let bgClass = '';
                        let iconBgClass = '';
                        if (tab.id === "Menunggu") {
                            bgClass = isActive ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 hover:bg-orange-50';
                            iconBgClass = isActive ? 'bg-white/20' : 'bg-orange-100';
                        } else if (tab.id === "Dipinjam") {
                            bgClass = isActive ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-blue-50';
                            iconBgClass = isActive ? 'bg-white/20' : 'bg-blue-100';
                        } else if (tab.id === "Terlambat") {
                            bgClass = isActive ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-red-50';
                            iconBgClass = isActive ? 'bg-white/20' : 'bg-red-100';
                        } else {
                            bgClass = isActive ? 'bg-gray-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-50';
                            iconBgClass = isActive ? 'bg-white/20' : 'bg-gray-200';
                        }
                        
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`${bgClass} p-3 rounded-xl transition-all duration-300 ${isActive ? 'shadow-lg scale-105' : 'shadow hover:shadow-md'}`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className={`${iconBgClass} w-8 h-8 rounded-lg flex items-center justify-center`}>
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.id === "Menunggu" ? 'text-orange-600' : tab.id === "Dipinjam" ? 'text-blue-600' : tab.id === "Terlambat" ? 'text-red-600' : 'text-gray-600'}`} />
                                    </div>
                                    <span className={`text-2xl font-bold ${isActive ? 'text-white' : 'text-gray-900'}`}>{count}</span>
                                </div>
                                <p className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-600'}`}>{tab.label}</p>
                            </button>
                        );
                    })}
                </div>

                {/* Compact Search Bar */}
                <div className="mb-5">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari peminjam atau judul buku..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Compact Loan Cards */}
                <div className="space-y-3">
                    {filteredLoans.length === 0 ? (
                        <div className="bg-white rounded-xl shadow p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <BookOpen className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Tidak Ada Data</h3>
                            <p className="text-sm text-gray-500">Belum ada peminjaman dengan status ini</p>
                        </div>
                    ) : (
                        filteredLoans.map((loan) => {
                            const imageSrc = getImageSrc(loan.img);
                            
                            // Debug log untuk setiap loan
                            if (loan.status === "Ditolak") {
                                console.log("🔍 Loan ditolak:", {
                                    id: loan.id,
                                    status: loan.status,
                                    alasan_penolakan: loan.alasan_penolakan,
                                    hasAlasan: !!loan.alasan_penolakan
                                });
                            }
                            
                            return (
                                <div key={loan.id} className="bg-white rounded-xl shadow hover:shadow-md transition-all duration-300 overflow-hidden">
                                    <div className="flex gap-0">
                                        
                                        {/* Book Cover - Lebih Besar */}
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

                                            {/* Compact Actions - UNIFORM SIZE */}
                                            <div className="min-h-[44px]">
                                                {activeTab === "Menunggu" && (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleApprove(loan.id)}
                                                            className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-1.5 transition-all"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                            Setujui
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(loan.id)}
                                                            className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg text-sm font-bold flex items-center justify-center gap-1.5 transition-all"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                            Tolak
                                                        </button>
                                                    </div>
                                                )}

                                                {activeTab === "Dipinjam" && (
                                                    <button
                                                        onClick={() => handleReturn(loan.id)}
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
                                                            onClick={() => handleReturn(loan.id)}
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
                                                            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg px-3 py-2 flex items-center justify-center gap-2">
                                                                <CheckCircle className="w-4 h-4" />
                                                                <span className="text-sm font-bold">Sudah Dikembalikan</span>
                                                            </div>
                                                        )}

                                                        {loan.status === "Ditolak" && (
                                                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <span className="text-xs font-bold text-red-600 uppercase tracking-wide">Ditolak</span>
                                                                    <span className="text-xs text-gray-500">
                                                                        {loan.tanggal_pinjam 
                                                                            ? new Date(loan.tanggal_pinjam).toLocaleDateString('id-ID', {
                                                                                day: 'numeric',
                                                                                month: 'short'
                                                                            })
                                                                            : '-'
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <p className="text-xs text-gray-700 leading-relaxed">
                                                                    {loan.alasan_penolakan || "Tidak ada alasan yang diberikan"}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Compact Rejection Modal */}
                {showRejectModal && selectedLoan && (
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
                                    onChange={(e) => {
                                        console.log("📝 Textarea changed:", e.target.value);
                                        setRejectReason(e.target.value);
                                    }}
                                    placeholder="Contoh: Stok buku sedang habis, Buku sedang dalam perbaikan, dll."
                                    className="w-full px-3 py-2 border border-gray-300 text-sm text-gray-900 bg-gray-50 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:bg-white transition-all resize-none placeholder:text-gray-400"
                                    rows="3"
                                    autoFocus
                                />
                                <p className="text-xs text-gray-500 mt-1.5">
                                    💡 Berikan penjelasan yang jelas
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        console.log("❌ Batal diklik");
                                        setShowRejectModal(false);
                                        setRejectReason("");
                                        setSelectedLoan(null);
                                    }}
                                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-bold transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={() => {
                                        console.log("🔴 Tolak Peminjaman button clicked");
                                        confirmReject();
                                    }}
                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-lg text-sm font-bold transition-all"
                                >
                                    Tolak Peminjaman
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}