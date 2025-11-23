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
    User
} from 'lucide-react';

export default function LoanManagement() {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("Dipinjam");

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        try {
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
        try {
            const res = await fetch(`/api/peminjaman/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "Dipinjam" })
            });

            if (res.ok) {
                alert("Peminjaman disetujui!");
                fetchLoans();
            }
        } catch (err) {
            console.error("Error approving loan:", err);
        }
    };

    const handleReject = async (id) => {
        if (!confirm("Yakin ingin menolak peminjaman ini?")) return;

        try {
            const res = await fetch(`/api/peminjaman/${id}`, {
                method: "DELETE"
            });

            if (res.ok) {
                alert("Peminjaman ditolak!");
                fetchLoans();
            }
        } catch (err) {
            console.error("Error rejecting loan:", err);
        }
    };

    const tabs = [
        { id: "Diproses", label: "Approval", icon: Clock },
        { id: "Dipinjam", label: "Aktif", icon: BookOpen },
        { id: "Terlambat", label: "Terlambat", icon: AlertTriangle },
        { id: "Dikembalikan", label: "Riwayat", icon: Archive }
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat data peminjaman...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-xl">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Manajemen Peminjaman</h1>
                            <p className="text-sm text-gray-500">Kelola persetujuan, peminjaman aktif, dan riwayat peminjaman buku</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2 mb-6">
                    <div className="grid grid-cols-4 gap-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const count = getTabCount(tab.id);
                            const isActive = activeTab === tab.id;
                            
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`p-4 rounded-xl transition-all ${
                                        isActive 
                                            ? 'bg-blue-600 text-white shadow-md' 
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                        <div className="text-center">
                                            <p className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-700'}`}>
                                                {tab.label}
                                            </p>
                                            <p className={`text-lg font-bold ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                                ({count})
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 bg-gray-100 rounded-2xl px-5 py-4 flex items-center gap-3">
                        <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder=""
                            className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-700 placeholder-gray-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="bg-gray-100 rounded-2xl px-5 py-4 hover:bg-gray-200 transition-colors">
                        <Filter className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Loan Cards */}
                <div className="space-y-4">
                    {filteredLoans.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak Ada Data</h3>
                            <p className="text-gray-500">Belum ada peminjaman dengan status {activeTab}</p>
                        </div>
                    ) : (
                        filteredLoans.map((loan) => (
                            <div key={loan.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <div className="flex gap-6 items-start">
                                    
                                    {/* Book Cover */}
                                    <div className="flex-shrink-0 relative">
                                        <img
                                            src={loan.img ? `/buku/${loan.img}` : "/api/placeholder/160/220"}
                                            alt={loan.judulBuku}
                                            className="w-40 h-56 object-cover rounded-xl shadow-lg"
                                        />
                                    </div>

                                    {/* Book Info */}
                                    <div className="flex-1 min-w-0">
                                        {/* Title */}
                                        <div className="flex items-start gap-3 mb-3">
                                            <BookOpen className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                    {loan.judulBuku}
                                                </h3>
                                                <p className="text-sm text-gray-500">{loan.penulis}</p>
                                            </div>
                                        </div>

                                        {/* Badges */}
                                        <div className="flex gap-2 mb-4">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                                                03
                                            </span>
                                            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold">
                                                {loan.kategori || "Fiksi"}
                                            </span>
                                        </div>

                                        {/* Borrower Info */}
                                        <div className="mb-4">
                                            <p className="text-xs font-semibold text-gray-500 mb-3">Peminjam</p>
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                                    <User className="w-6 h-6 text-gray-500" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{loan.peminjam}</p>
                                                    <p className="text-xs text-gray-500">NIPD: {loan.user_id}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side - Code & Actions */}
                                    <div className="flex-shrink-0 flex flex-col items-end gap-4 min-w-[220px]">
                                        {/* Code */}
                                        <div className="text-right">
                                            <p className="text-xs font-semibold text-gray-500 mb-1">KODE</p>
                                            <p className="text-sm font-bold text-gray-900">PJM-{new Date().getFullYear()}{loan.id}-010</p>
                                        </div>

                                        {/* Action Button */}
                                        {activeTab === "Diproses" && (
                                            <div className="w-full space-y-2">
                                                <button
                                                    onClick={() => handleApprove(loan.id)}
                                                    className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                                                >
                                                    <CheckCircle className="w-5 h-5" />
                                                    Setujui
                                                </button>
                                                <button
                                                    onClick={() => handleReject(loan.id)}
                                                    className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                                                >
                                                    <XCircle className="w-5 h-5" />
                                                    Tolak
                                                </button>
                                            </div>
                                        )}

                                        {activeTab === "Dipinjam" && (
                                            <div className="w-full px-6 py-3 bg-blue-100 text-blue-700 rounded-xl font-bold text-center">
                                                Sedang Dipinjam
                                            </div>
                                        )}

                                        {activeTab === "Terlambat" && (
                                            <div className="w-full px-6 py-3 bg-red-100 text-red-700 rounded-xl font-bold text-center">
                                                Terlambat
                                            </div>
                                        )}

                                        {activeTab === "Dikembalikan" && (
                                            <div className="w-full px-6 py-3 bg-green-100 text-green-700 rounded-xl font-bold text-center">
                                                Selesai
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}