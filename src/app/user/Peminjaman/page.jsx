"use client";

import { useState, useEffect } from 'react';
import { BookOpen, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function PeminjamanBuku() {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Menunggu");
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Ambil user dari localStorage
        const profileData = localStorage.getItem("profileData");
        if (profileData) {
            const userData = JSON.parse(profileData);
            setUser(userData);
        }
    }, []);

    useEffect(() => {
        if (user?.id) {
            fetchLoans();
        }
    }, [user]);

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
        const diffDays = Math.ceil(diffTime / (5000 * 60 * 60 * 24));
        
        return diffDays * 5000; 
    };

    const fetchLoans = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/peminjaman/user/${user.id}`);
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
            
            console.log("=== DEBUG LOANS ===");
            console.log("Total loans:", processedLoans.length);
            console.log("Loans data:", processedLoans);
            console.log("Terlambat count:", processedLoans.filter(l => l.isOverdue && l.status === "Dipinjam").length);
        } catch (err) {
            console.error("Error fetching loans:", err);
            setLoans([]);
        } finally {
            setLoading(false);
        }
    };

    // Hitung count untuk setiap tab
    const getTabCount = (status) => {
        if (status === "Terlambat") {
            const count = loans.filter(l => l.status === "Dipinjam" && l.isOverdue).length;
            console.log("Terlambat tab count:", count);
            return count;
        } else if (status === "Dipinjam") {
            const count = loans.filter(l => l.status === "Dipinjam" && !l.isOverdue).length;
            console.log("Dipinjam tab count:", count);
            return count;
        } else if (status === "Selesai") {
            return loans.filter(l => l.status === "Dikembalikan").length;
        } else if (status === "Ditolak") {
            return loans.filter(l => l.status === "Ditolak").length;
        }
        return loans.filter(l => l.status === status).length;
    };

    // Filter loans berdasarkan tab aktif
    const filteredLoans = loans.filter(loan => {
        if (activeTab === "Terlambat") {
            const match = loan.status === "Dipinjam" && loan.isOverdue;
            console.log(`Loan ${loan.id}: status=${loan.status}, isOverdue=${loan.isOverdue}, match=${match}`);
            return match;
        } else if (activeTab === "Dipinjam") {
            return loan.status === "Dipinjam" && !loan.isOverdue;
        } else if (activeTab === "Selesai") {
            return loan.status === "Dikembalikan";
        } else if (activeTab === "Ditolak") {
            return loan.status === "Ditolak";
        }
        return loan.status === activeTab;
    });

    const tabs = [
        { id: "Menunggu", label: "Menunggu", icon: Clock, color: "orange" },
        { id: "Dipinjam", label: "Dipinjam", icon: BookOpen, color: "blue" },
        { id: "Terlambat", label: "Terlambat", icon: AlertTriangle, color: "red" },
        { id: "Selesai", label: "Selesai", icon: CheckCircle, color: "green" },
        { id: "Ditolak", label: "Ditolak", icon: XCircle, color: "gray" }
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-3 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat data peminjaman...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-xl">
                            <BookOpen className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Riwayat Peminjaman</h1>
                            <p className="text-gray-500 text-sm">Pantau status peminjaman buku Anda</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const count = getTabCount(tab.id);
                        const isActive = activeTab === tab.id;
                        
                        let colorClass = '';
                        if (tab.color === "orange") {
                            colorClass = isActive ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 hover:bg-orange-50 border-orange-200';
                        } else if (tab.color === "blue") {
                            colorClass = isActive ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-blue-50 border-blue-200';
                        } else if (tab.color === "red") {
                            colorClass = isActive ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-red-50 border-red-200';
                        } else if (tab.color === "green") {
                            colorClass = isActive ? 'bg-green-500 text-white' : 'bg-white text-gray-700 hover:bg-green-50 border-green-200';
                        } else {
                            colorClass = isActive ? 'bg-gray-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200';
                        }
                        
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`${colorClass} flex items-center gap-2 px-4 py-3 rounded-xl border transition-all whitespace-nowrap ${isActive ? 'shadow-md' : 'shadow-sm'}`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                                <span className="font-semibold">{tab.label}</span>
                                <span className={`${isActive ? 'bg-white/20' : 'bg-gray-100'} px-2 py-0.5 rounded-full text-sm font-bold`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                {filteredLoans.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-300 p-16 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak Ada Data</h3>
                        <p className="text-gray-500">Belum ada peminjaman dengan status "{activeTab}"</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredLoans.map((loan) => (
                            <div key={loan.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">{loan.judulBuku}</h3>
                                        <p className="text-sm text-gray-600">{loan.penulis}</p>
                                    </div>
                                    <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-bold">
                                        #{loan.id?.toString().padStart(3, '0')}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Tanggal Pinjam</p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {new Date(loan.tanggal_pinjam).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Tanggal Kembali</p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {new Date(loan.tanggal_kembali).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Status</p>
                                        <p className="text-sm font-semibold text-gray-900">{loan.status}</p>
                                    </div>
                                    {loan.isOverdue && (
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Denda</p>
                                            <p className="text-sm font-semibold text-red-600">
                                                Rp {loan.denda.toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {loan.isOverdue && activeTab === "Terlambat" && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5 text-red-600" />
                                        <p className="text-sm text-red-800">
                                            <span className="font-bold">Terlambat!</span> Segera kembalikan buku untuk menghindari denda tambahan.
                                        </p>
                                    </div>
                                )}

                                {loan.status === "Ditolak" && loan.alasan_penolakan && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                        <p className="text-xs font-semibold text-red-800 mb-1">Alasan Penolakan:</p>
                                        <p className="text-sm text-red-700">{loan.alasan_penolakan}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}