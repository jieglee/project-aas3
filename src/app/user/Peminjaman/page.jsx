'use client';

import { useState, useEffect } from 'react';
import { Clock, AlertTriangle, CheckCircle, XCircle, Package } from 'lucide-react';

export default function PeminjamanBuku() {
    const [peminjaman, setPeminjaman] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [activeFilter, setActiveFilter] = useState('Menunggu');
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(1); // Simulasi user login, ganti dengan session/auth

    const filters = [
        { label: 'Menunggu', value: 'Diproses', count: 0, icon: Clock, color: 'yellow' },
        { label: 'Aktif', value: 'Dipinjam', count: 0, icon: Package, color: 'blue' },
        { label: 'Terlambat', value: 'Terlambat', count: 0, icon: AlertTriangle, color: 'red' },
        { label: 'Selesai', value: 'Dikembalikan', count: 0, icon: CheckCircle, color: 'green' },
        { label: 'Ditolak', value: 'Ditolak', count: 0, icon: XCircle, color: 'gray' },
    ];

    useEffect(() => {
        fetchPeminjaman();
    }, [userId]);

    useEffect(() => {
        filterData(activeFilter);
    }, [peminjaman, activeFilter]);

    const fetchPeminjaman = async () => {
        try {
            setLoading(true);
            // API endpoint untuk get peminjaman by user
            const response = await fetch(`/api/peminjaman?user_id=${userId}`);
            const data = await response.json();

            // Fetch detail buku untuk setiap peminjaman
            const peminjamanWithBooks = await Promise.all(
                data.map(async (item) => {
                    const bukuResponse = await fetch(`/api/buku/${item.buku_id}`);
                    const buku = await bukuResponse.json();
                    return { ...item, buku };
                })
            );

            setPeminjaman(peminjamanWithBooks);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching peminjaman:', error);
            setLoading(false);
        }
    };

    const filterData = (status) => {
        if (status === 'Menunggu') {
            setFilteredData(peminjaman.filter(item => item.status === 'Diproses'));
        } else {
            setFilteredData(peminjaman.filter(item => item.status === status));
        }
    };

    const getStatusCount = (status) => {
        if (status === 'Diproses') {
            return peminjaman.filter(item => item.status === 'Diproses').length;
        }
        return peminjaman.filter(item => item.status === status).length;
    };

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const getStatusBadge = (status) => {
        const badges = {
            'Diproses': 'bg-yellow-100 text-yellow-700',
            'Dipinjam': 'bg-blue-100 text-blue-700',
            'Terlambat': 'bg-red-100 text-red-700',
            'Dikembalikan': 'bg-green-100 text-green-700',
            'Ditolak': 'bg-gray-100 text-gray-700'
        };
        return badges[status] || 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Peminjaman Buku</h1>
                    <p className="text-gray-600 mt-1">Kelola seluruh peminjaman Anda</p>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                    {filters.map((filter) => {
                        const Icon = filter.icon;
                        const count = getStatusCount(filter.value);
                        const isActive = activeFilter === filter.value ||
                            (activeFilter === 'Menunggu' && filter.value === 'Diproses');

                        const colorClasses = {
                            yellow: {
                                active: 'bg-yellow-500 text-white shadow-md',
                                inactive: 'bg-white text-gray-700 border border-gray-200 hover:border-yellow-500'
                            },
                            blue: {
                                active: 'bg-blue-500 text-white shadow-md',
                                inactive: 'bg-white text-gray-700 border border-gray-200 hover:border-blue-500'
                            },
                            red: {
                                active: 'bg-red-500 text-white shadow-md',
                                inactive: 'bg-white text-gray-700 border border-gray-200 hover:border-red-500'
                            },
                            green: {
                                active: 'bg-green-500 text-white shadow-md',
                                inactive: 'bg-white text-gray-700 border border-gray-200 hover:border-green-500'
                            },
                            gray: {
                                active: 'bg-gray-500 text-white shadow-md',
                                inactive: 'bg-white text-gray-700 border border-gray-200 hover:border-gray-500'
                            }
                        };

                        return (
                            <button
                                key={filter.value}
                                onClick={() => setActiveFilter(filter.value)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all ${isActive ? colorClasses[filter.color].active : colorClasses[filter.color].inactive
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="font-medium">{filter.label}</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-white/20' : 'bg-gray-100'
                                    }`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
                        <p className="text-gray-600 mt-4">Memuat data...</p>
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600 text-lg">Tidak ada peminjaman</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredData.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    <div className="flex gap-6">
                                        {/* Book Image */}
                                        <div className="flex-shrink-0">
                                            <img
                                                src={`/images/${item.buku?.img || 'placeholder.jpg'}`}
                                                alt={item.buku?.judul}
                                                className="w-24 h-32 object-cover rounded-lg shadow-sm"
                                            />
                                        </div>

                                        {/* Book Details */}
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                                        {item.buku?.judul || 'Judul Buku'}
                                                    </h3>
                                                    <p className="text-gray-600">{item.buku?.penulis || 'Penulis'}</p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(item.status)}`}>
                                                    {item.status}
                                                </span>
                                            </div>

                                            <p className="text-sm text-gray-500 mb-4">
                                                PJM-{item.created_at ? new Date(item.created_at).getFullYear() : '2025'}II{String(item.id).padStart(2, '0')}-001
                                            </p>

                                            {/* Status Message */}
                                            {item.status === 'Diproses' && (
                                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                                                    <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="font-medium text-yellow-800">Menunggu Persetujuan</p>
                                                        <p className="text-sm text-yellow-700">
                                                            Akan diproses dalam 3x24 jam
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {item.status === 'Dipinjam' && (
                                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                                                    <Package className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="font-medium text-blue-800">Buku Sedang Dipinjam</p>
                                                        <p className="text-sm text-blue-700">
                                                            Harap kembalikan sebelum: {formatDate(item.tanggal_kembali)}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {item.status === 'Terlambat' && (
                                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                                                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="font-medium text-red-800">Peminjaman Terlambat</p>
                                                        <p className="text-sm text-red-700">
                                                            Denda: Rp {item.denda?.toLocaleString('id-ID') || 0}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {item.status === 'Dikembalikan' && (
                                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="font-medium text-green-800">Buku Telah Dikembalikan</p>
                                                        <p className="text-sm text-green-700">
                                                            Terima kasih telah mengembalikan tepat waktu
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Date Info */}
                                            <p className="text-sm text-gray-500 mt-4">
                                                Dipinjam: {formatDate(item.tanggal_pinjam)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}