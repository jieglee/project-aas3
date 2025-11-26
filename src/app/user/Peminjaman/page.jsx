'use client';

import { useState, useEffect } from 'react';
import { Clock, Package } from 'lucide-react';
import PeminjamanHeader from "../../../component/user/Peminjaman/PeminjamanHeader"
import PeminjamanFilter from "../../../component/user/Peminjaman/PeminjamanFilter"
import PeminjamanCard from "../../../component/user/Peminjaman/PeminjamanCard"

export default function PeminjamanBuku() {
    const [peminjaman, setPeminjaman] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [activeFilter, setActiveFilter] = useState('Menunggu');
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(parseInt(storedUserId));
        }
    }, []);

    useEffect(() => {
        if (userId) {
            fetchPeminjaman();
        }
    }, [userId]);

    useEffect(() => {
        filterData(activeFilter);
    }, [peminjaman, activeFilter]);

    const fetchPeminjaman = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/peminjaman?user_id=${userId}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch peminjaman');
            }

            const data = await response.json();
            setPeminjaman(data);
        } catch (error) {
            console.error('Error fetching peminjaman:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterData = (status) => {
        setFilteredData(peminjaman.filter(item => item.status === status));
    };

    if (!userId) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md border border-gray-200">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Akses Terbatas</h2>
                    <p className="text-gray-600 mb-6">Silakan login untuk melihat riwayat peminjaman</p>
                    <button
                        onClick={() => window.location.href = '/login'}
                        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                        Login Sekarang
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4">
            <div className="max-w-6xl mx-auto">
                <PeminjamanHeader />
                
                <PeminjamanFilter 
                    peminjaman={peminjaman}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                />

                {loading ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600 font-medium">Memuat data peminjaman...</p>
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Package className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Tidak Ada Data</h3>
                        <p className="text-gray-600">Belum ada peminjaman dengan status "{activeFilter}"</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredData.map((item) => (
                            <PeminjamanCard key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

