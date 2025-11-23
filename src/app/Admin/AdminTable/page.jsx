"use client";

import React, { useState, useEffect } from 'react';
import { Check, Search, Filter } from 'lucide-react';

export default function LoanAdminTable() {

    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("Semua");

    useEffect(() => {
        fetch("/api/peminjaman")
            .then(res => res.json())
            .then(data => {
                setLoans(data);
                setLoading(false);
            });
    }, []);

    const handleSelesaiPembayaran = (id) => {
        setLoans(loans.map(loan =>
            loan.id === id
                ? { ...loan, denda_dibayar: true, status: "Dikembalikan" }
                : loan
        ));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Dipinjam": return "bg-blue-100 text-blue-800";
            case "Dikembalikan": return "bg-green-100 text-green-800";
            case "Terlambat": return "bg-red-100 text-red-800";
            case "Diproses": return "bg-yellow-100 text-yellow-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const filteredLoans = loans.filter(loan => {
        const matchSearch =
            loan.peminjam?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            loan.judulBuku?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchFilter =
            filterStatus === "Semua" || loan.status === filterStatus;

        return matchSearch && matchFilter;
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="p-6 text-center text-gray-600">
                Loading data peminjaman...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">
                        Data Peminjaman Buku
                    </h1>

                    {/* Filter Section */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Cari nama peminjam atau judul buku..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option>Semua</option>
                                <option>Diproses</option>
                                <option>Dipinjam</option>
                                <option>Dikembalikan</option>
                                <option>Terlambat</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">No</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nama Peminjam</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Judul Buku</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tanggal Pinjam</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tanggal Kembali</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Denda</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredLoans.map((loan, index) => (
                                    <tr key={loan.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-4">{index + 1}</td>
                                        <td className="px-4 py-4 font-medium">{loan.peminjam}</td>
                                        <td className="px-4 py-4">{loan.judulBuku}</td>
                                        <td className="px-4 py-4">{formatDate(loan.tanggal_pinjam)}</td>
                                        <td className="px-4 py-4">{formatDate(loan.tanggal_kembali)}</td>

                                        <td className="px-4 py-4">
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(loan.status)}`}>
                                                {loan.status}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4">
                                            {loan.denda > 0 ? (
                                                <span className={`font-semibold ${loan.denda_dibayar ? "text-green-600" : "text-red-600"}`}>
                                                    {formatCurrency(loan.denda)}
                                                    {loan.denda_dibayar && <span className="ml-2 text-xs">(Lunas)</span>}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
                                        </td>

                                        <td className="px-4 py-4">
                                            {loan.denda > 0 && !loan.denda_dibayar ? (
                                                <button
                                                    onClick={() => handleSelesaiPembayaran(loan.id)}
                                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg flex items-center"
                                                >
                                                    <Check className="w-4 h-4 mr-2" /> Selesai
                                                </button>
                                            ) : (
                                                <span className="text-gray-400 text-xs">-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-blue-600 font-medium">Total Peminjaman</p>
                                <p className="text-2xl font-bold text-blue-900">{loans.length}</p>
                            </div>

                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <p className="text-sm text-yellow-600 font-medium">Sedang Dipinjam</p>
                                <p className="text-2xl font-bold text-yellow-900">
                                    {loans.filter(l => l.status === "Dipinjam").length}
                                </p>
                            </div>

                            <div className="bg-red-50 p-4 rounded-lg">
                                <p className="text-sm text-red-600 font-medium">Terlambat</p>
                                <p className="text-2xl font-bold text-red-900">
                                    {loans.filter(l => l.status === "Terlambat").length}
                                </p>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg">
                                <p className="text-sm text-green-600 font-medium">Total Denda Belum Dibayar</p>
                                <p className="text-2xl font-bold text-green-900">
                                    {formatCurrency(
                                        loans
                                            .filter(l => !l.denda_dibayar)
                                            .reduce((sum, l) => sum + l.denda, 0)
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
