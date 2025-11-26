"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";

export default function BorrowedBooksSection() {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        fetchBorrowedBooks();
    }, []);

    const fetchBorrowedBooks = async () => {
        try {
            // Ambil user ID dari localStorage
            const userData = localStorage.getItem("user");
            if (!userData) {
                setLoading(false);
                return;
            }
            
            const user = JSON.parse(userData);
            const currentUserId = user.id;
            setUserId(currentUserId);
            
            const res = await fetch("/api/peminjaman");
            if (!res.ok) throw new Error("Failed to fetch");
            
            const data = await res.json();
            
            // Filter hanya buku yang sedang dipinjam oleh user ini
            const userBorrowedBooks = Array.isArray(data) 
                ? data.filter(item => 
                    item.user_id === currentUserId && 
                    (item.status === 'Dipinjam' || item.status === 'Menunggu')
                  ).slice(0, 3) // Ambil maksimal 3 buku untuk ditampilkan
                : [];
            
            setBorrowedBooks(userBorrowedBooks);
        } catch (err) {
            console.error("Error fetching borrowed books:", err);
            setBorrowedBooks([]);
        } finally {
            setLoading(false);
        }
    };

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

    const fallbackSVG = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="100"%3E%3Crect fill="%23e5e7eb" width="80" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%239ca3af" font-size="10"%3ENo Image%3C/text%3E%3C/svg%3E';

    if (loading) {
        return (
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Buku yang Sedang Dipinjam</h2>
                        <p className="text-sm text-gray-500">Jangan lupa untuk mengembalikan buku tepat waktu</p>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                    <div className="w-10 h-10 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-sm text-gray-600">Memuat data peminjaman...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Buku yang Sedang Dipinjam</h2>
                    <p className="text-sm text-gray-500">Jangan lupa untuk mengembalikan buku tepat waktu</p>
                </div>
                {borrowedBooks.length > 0 && (
                    <Link 
                        href="/user/peminjaman"
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                        Lihat Semua
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                )}
            </div>

            {borrowedBooks.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
                        <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Belum Ada Peminjaman Aktif
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 max-w-md mx-auto">
                        Mulai petualangan membaca Anda dengan meminjam buku dari koleksi perpustakaan kami
                    </p>
                    <Link href="/user/katalog">
                        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-sm hover:shadow-md">
                            Jelajahi Katalog Buku
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        {borrowedBooks.map((book) => {
                            const imageSrc = getImageSrc(book.img);
                            
                            return (
                                <Link 
                                    key={book.id} 
                                    href={`/user/peminjaman`}
                                    className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                                >
                                    {/* Book Image */}
                                    <div className="flex-shrink-0">
                                        <img
                                            src={imageSrc || fallbackSVG}
                                            alt={book.judulBuku}
                                            className="w-12 h-16 object-cover rounded-lg shadow-sm border border-gray-200"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = fallbackSVG;
                                            }}
                                        />
                                    </div>

                                    {/* Book Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-900 text-sm mb-0.5 line-clamp-1">
                                            {book.judulBuku}
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-1">
                                            {book.penulis}
                                        </p>
                                        <div className="flex items-center gap-1 text-xs text-gray-400">
                                            <Calendar className="w-3 h-3" />
                                            <span>Kembali: {formatDate(book.tanggal_kembali)}</span>
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    <div className="flex-shrink-0">
                                        <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                                            book.status === 'Menunggu' ? 'bg-yellow-100 text-yellow-700' :
                                            book.status === 'Dipinjam' ? 'bg-blue-100 text-blue-700' :
                                            book.status === 'Terlambat' ? 'bg-red-100 text-red-700' :
                                            'bg-green-100 text-green-700'
                                        }`}>
                                            {book.status}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </section>
    );
}