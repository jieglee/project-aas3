"use client";

import { useState, useEffect } from "react";
import { BookOpen, Heart, Clock, Library, Loader2, TrendingUp, Star, Zap, Award } from "lucide-react";
import Link from "next/link";

// BookCard component dengan desain minimalis dan image handling yang benar
function BookCard({ book }) {
    // Handle berbagai format gambar
    const getImageSrc = () => {
        if (!book.img) {
            return "/api/placeholder/200/280";
        }
        
        // Jika sudah URL lengkap (https:// atau http://)
        if (book.img.startsWith('http://') || book.img.startsWith('https://')) {
            return book.img;
        }
        
        // Jika path relatif (mulai dengan /)
        if (book.img.startsWith('/')) {
            return book.img;
        }
        
        // Jika hanya nama file, tambahkan prefix /buku/
        return `/buku/${book.img}`;
    };

    const imgSrc = getImageSrc();
    const kategori = book.kategori || "Tanpa Kategori";
    const stok = book.stok ?? 0;
    const penerbit = book.penerbit || "-";

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            {/* Image with overlay */}
            <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                    src={imgSrc}
                    alt={book.judul}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                        e.target.src = '/api/placeholder/200/280';
                        e.target.onerror = null;
                    }}
                />
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category badge */}
                <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                    {kategori}
                </div>

                {/* Stock indicator */}
                {stok === 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
                            Stok Habis
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 min-h-[3rem] group-hover:text-blue-600 transition-colors">
                    {book.judul || "-"}
                </h3>
                
                <p className="text-gray-500 text-sm mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span className="line-clamp-1">{book.penulis || "-"}</span>
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{penerbit}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        stok > 0 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-red-100 text-red-700'
                    }`}>
                        {stok > 0 ? `Stok: ${stok}` : 'Habis'}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function HomePage() {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        borrowed: 0,
        favorites: 0,
        available: 0
    });
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [newBooks, setNewBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                
                const storedProfile = localStorage.getItem("profileData");
                if (storedProfile) {
                    const profileData = JSON.parse(storedProfile);
                    setUser(profileData);
                }

                const userRes = await fetch("/api/user/profile");
                if (userRes.ok) {
                    const userData = await userRes.json();
                    setUser(userData);
                }

                const statsRes = await fetch("/api/user/stats");
                if (statsRes.ok) {
                    const statsData = await statsRes.json();
                    setStats(statsData);
                }

                const borrowedRes = await fetch("/api/user/borrowed");
                if (borrowedRes.ok) {
                    const borrowedData = await borrowedRes.json();
                    setBorrowedBooks(borrowedData.slice(0, 4));
                }

                const booksRes = await fetch("/api/buku");
                if (booksRes.ok) {
                    const booksData = await booksRes.json();
                    setNewBooks(booksData.slice(0, 4));
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium text-lg">Memuat perpustakaan...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Welcome Section */}
                <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10 mb-8 border-l-8 border-blue-600">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                                Selamat Datang Kembali,<br/>
                                <span className="text-blue-600">{user?.nama || "User"}!</span> 👋
                            </h1>
                            <p className="text-gray-600 text-lg mb-6">
                                Temukan, pinjam, dan nikmati ribuan koleksi buku digital kami
                            </p>
                        </div>

                        {/* Decorative illustration */}
                        <div className="hidden lg:block">
                            <div className="relative w-48 h-48">
                                <div className="absolute inset-0 bg-blue-100 rounded-full opacity-50 animate-pulse"></div>
                                <div className="absolute inset-4 bg-blue-200 rounded-full opacity-50 animate-pulse delay-75"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Library className="w-24 h-24 text-blue-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {/* Buku Dipinjam */}
                    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border-t-4 border-blue-500">
                        <div className="flex items-start justify-between mb-4">
                            <div className="bg-blue-100 p-4 rounded-xl">
                                <BookOpen className="w-7 h-7 text-blue-600" />
                            </div>
                            <div className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                                Aktif
                            </div>
                        </div>
                        <h3 className="text-4xl font-bold text-gray-900 mb-1">{stats.borrowed}</h3>
                        <p className="text-gray-600 font-medium">Buku Dipinjam</p>
                        <div className="mt-4 flex items-center text-sm text-blue-600">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            <span>Sedang dibaca</span>
                        </div>
                    </div>

                    {/* Buku Terlambat */}
                    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border-t-4 border-red-500">
                        <div className="flex items-start justify-between mb-4">
                            <div className="bg-red-100 p-4 rounded-xl">
                                <Clock className="w-7 h-7 text-red-600" />
                            </div>
                            <div className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                                Aman
                            </div>
                        </div>
                        <h3 className="text-4xl font-bold text-gray-900 mb-1">0</h3>
                        <p className="text-gray-600 font-medium">Buku Terlambat</p>
                        <div className="mt-4 flex items-center text-sm text-gray-500">
                            <Award className="w-4 h-4 mr-1" />
                            <span>Denda: Rp 0</span>
                        </div>
                    </div>

                    {/* Wishlist */}
                    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border-t-4 border-pink-500">
                        <div className="flex items-start justify-between mb-4">
                            <div className="bg-pink-100 p-4 rounded-xl">
                                <Heart className="w-7 h-7 text-pink-600" />
                            </div>
                            <div className="bg-pink-50 text-pink-700 text-xs font-bold px-3 py-1 rounded-full">
                                Favorit
                            </div>
                        </div>
                        <h3 className="text-4xl font-bold text-gray-900 mb-1">{stats.favorites}</h3>
                        <p className="text-gray-600 font-medium">Wishlist Saya</p>
                        <div className="mt-4 flex items-center text-sm text-pink-600">
                            <Star className="w-4 h-4 mr-1 fill-current" />
                            <span>Buku favorit</span>
                        </div>
                    </div>

                    {/* Total Koleksi */}
                    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border-t-4 border-green-500">
                        <div className="flex items-start justify-between mb-4">
                            <div className="bg-green-100 p-4 rounded-xl">
                                <Library className="w-7 h-7 text-green-600" />
                            </div>
                            <div className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                                Tersedia
                            </div>
                        </div>
                        <h3 className="text-4xl font-bold text-gray-900 mb-1">{stats.available}</h3>
                        <p className="text-gray-600 font-medium">Total Koleksi</p>
                        <div className="mt-4 flex items-center text-sm text-green-600">
                            <Zap className="w-4 h-4 mr-1" />
                            <span>Siap dipinjam</span>
                        </div>
                    </div>
                </div>

                {/* Buku yang Dipinjam Section */}
                <section className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-1">Peminjaman Aktif</h2>
                            <p className="text-gray-500">Buku yang sedang Anda pinjam</p>
                        </div>
                        <Link href="/user/Peminjaman">
                            <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-xl transition-all">
                                Lihat Semua
                                <BookOpen className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>

                    {borrowedBooks.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center shadow-md border-2 border-dashed border-gray-200">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                                <BookOpen className="w-10 h-10 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Belum Ada Peminjaman Aktif
                            </h3>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                Mulai petualangan membaca Anda dengan meminjam buku dari koleksi perpustakaan kami
                            </p>
                            <Link href="/user/katalog">
                                <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
                                    Jelajahi Katalog Buku
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {borrowedBooks.map((book) => (
                                <Link key={book.id} href={`/user/detail/${book.id}`}>
                                    <BookCard book={book} />
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                {/* Buku Terbaru Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold mb-2">
                                <Star className="w-4 h-4 fill-current" />
                                Terbaru
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-1">Koleksi Terbaru</h2>
                            <p className="text-gray-500">Buku yang baru saja ditambahkan ke perpustakaan</p>
                        </div>
                        <Link href="/user/katalog">
                            <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-xl transition-all">
                                Selengkapnya
                                <Library className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>

                    {newBooks.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center shadow-md border-2 border-dashed border-gray-200">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                                <Library className="w-10 h-10 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Koleksi Segera Hadir
                            </h3>
                            <p className="text-gray-500">
                                Kami sedang menambahkan buku-buku baru untuk Anda
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {newBooks.map((book) => (
                                <Link key={book.id} href={`/user/detail/${book.id}`}>
                                    <BookCard book={book} />
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}