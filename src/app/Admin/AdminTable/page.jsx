"use client";

import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { toast } from 'react-hot-toast';
import LoanStats from "../../../component/admin/AdminTable/LoanStats";
import SearchBar from "../../../component/admin/AdminTable/SearchBar";
import LoanCard from "../../../component/admin/AdminTable/LoanCard";
import RejectModal from "../../../component/admin/AdminTable/RejectModal";

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

    // Fungsi untuk cek apakah peminjaman terlambat
    const isLoanOverdue = (loan) => {
        if (loan.status !== "Dipinjam") return false;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const returnDate = new Date(loan.tanggal_kembali);
        returnDate.setHours(0, 0, 0, 0);
        
        return today > returnDate;
    };

    // Fungsi untuk hitung denda
    const calculateDenda = (tanggal_kembali) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const returnDate = new Date(tanggal_kembali);
        returnDate.setHours(0, 0, 0, 0);
        
        if (today <= returnDate) return 0;
        
        const diffTime = today - returnDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays * 5000; 
    };

    const fetchLoans = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/peminjaman");
            const data = await res.json();
            
            // Proses data untuk menambahkan informasi terlambat dan denda
            const processedLoans = Array.isArray(data) ? data.map(loan => {
                const overdue = isLoanOverdue(loan);
                const denda = overdue ? calculateDenda(loan.tanggal_kembali) : 0;
                
                return {
                    ...loan,
                    isOverdue: overdue,
                    denda: denda
                };
            }) : [];
            
            setLoans(processedLoans);
            console.log("Loans processed:", processedLoans);
        } catch (err) {
            console.error("Error fetching loans:", err);
            setLoans([]);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        const approvePromise = fetch(`/api/peminjaman/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "Dipinjam" })
        })
        .then(async (res) => {
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Gagal menyetujui peminjaman");
            }
            await fetchLoans();
            return data;
        });

        toast.promise(approvePromise, {
            loading: "Menyetujui peminjaman...",
            success: "Peminjaman berhasil disetujui!",
            error: (err) => err.message || "Terjadi kesalahan saat menyetujui peminjaman",
        });
    };

    const handleReject = (id) => {
        setSelectedLoan(id);
        setShowRejectModal(true);
    };

    const confirmReject = async () => {
        if (!rejectReason.trim()) {
            toast.error("Mohon masukkan alasan penolakan!");
            return;
        }

        const rejectPromise = fetch(`/api/peminjaman/${selectedLoan}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                status: "Ditolak",
                alasan_penolakan: rejectReason.trim()
            })
        })
        .then(async (res) => {
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Gagal menolak peminjaman");
            }
            setShowRejectModal(false);
            setRejectReason("");
            setSelectedLoan(null);
            await fetchLoans();
            return data;
        });

        toast.promise(rejectPromise, {
            loading: "Menolak peminjaman...",
            success: "Peminjaman berhasil ditolak!",
            error: (err) => err.message || "Terjadi kesalahan saat menolak peminjaman",
        });
    };

    const handleReturn = async (id) => {
        const returnPromise = fetch(`/api/peminjaman/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "Dikembalikan" })
        })
        .then(async (res) => {
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Gagal mengonfirmasi pengembalian");
            }
            await fetchLoans();
            return data;
        });

        toast.promise(returnPromise, {
            loading: "Memproses pengembalian...",
            success: "Buku berhasil dikembalikan!",
            error: (err) => err.message || "Terjadi kesalahan saat memproses pengembalian",
        });
    };

    // ✅ LOGIKA FILTER YANG DIUPDATE
    const filteredLoans = loans.filter(loan => {
        let matchTab = false;
        
        if (activeTab === "Terlambat") {
            // Tab Terlambat: hanya yang status Dipinjam DAN sudah lewat tanggal kembali
            matchTab = loan.status === "Dipinjam" && loan.isOverdue;
        } else if (activeTab === "Dipinjam") {
            // Tab Dipinjam: hanya yang status Dipinjam DAN belum lewat tanggal kembali
            matchTab = loan.status === "Dipinjam" && !loan.isOverdue;
        } else if (activeTab === "Dikembalikan") {
            // Tab Riwayat: Dikembalikan atau Ditolak
            matchTab = loan.status === "Dikembalikan" || loan.status === "Ditolak";
        } else {
            // Tab lainnya (Menunggu, dll)
            matchTab = loan.status === activeTab;
        }
        
        const matchSearch = 
            loan.peminjam?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            loan.judulBuku?.toLowerCase().includes(searchTerm.toLowerCase());
            
        return matchTab && matchSearch;
    });

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
                
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Manajemen Peminjaman</h1>
                    <p className="text-gray-500 text-xs">Kelola dan pantau aktivitas peminjaman buku</p>
                </div>

                {/* Stats */}
                <LoanStats 
                    loans={loans} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                />

                {/* Search */}
                <SearchBar 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                />

                {/* Loan Cards */}
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
                        filteredLoans.map((loan) => (
                            <LoanCard
                                key={loan.id}
                                loan={loan}
                                activeTab={activeTab}
                                onApprove={handleApprove}
                                onReject={handleReject}
                                onReturn={handleReturn}
                            />
                        ))
                    )}
                </div>

                {/* Reject Modal */}
                <RejectModal
                    show={showRejectModal}
                    selectedLoan={selectedLoan}
                    loans={loans}
                    rejectReason={rejectReason}
                    setRejectReason={setRejectReason}
                    onConfirm={confirmReject}
                    onClose={() => {
                        setShowRejectModal(false);
                        setRejectReason("");
                        setSelectedLoan(null);
                    }}
                />
            </div>
        </div>
    );
}