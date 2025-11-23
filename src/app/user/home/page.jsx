"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Heart, Clock, Library, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

// BookCard component
function BookCard({ book }) {
    const imgSrc = book.img ? `/buku/${book.img}` : "/api/placeholder/200/280";
    const kategori = book.kategori || "Tanpa Kategori";
    const stok = book.stok ?? 0;
    const penerbit = book.penerbit || "-";

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
            <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
                <img
                    src={imgSrc}
                    alt={book.judul}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {kategori}
                </div>
                {stok === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                            Stok Habis
                        </span>
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                    {book.judul || "-"}
                </h3>
                <p className="text-gray-500 text-xs flex items-center gap-1 mb-2">
                    <BookOpen className="w-3 h-3" />
                    {book.penulis || "-"}
                </p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">{penerbit}</span>
                    <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            stok > 0
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        Stok: {stok}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function HomePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        borrowed: 0,
        overdue: 0,
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
                
                // Ambil userId dari localStorage
                const userId = localStorage.getItem("userId");
                
                if (!userId) {
                    router.push("/login");
                    return;
                }

                // Fetch user profile dari database
                const userRes = await fetch(`/api/user/profile?userId=${userId}`);
                if (userRes.ok) {
                    const userData = await userRes.json();
                    setUser(userData);
                    // Simpan ke localStorage untuk cache
                    localStorage.setItem("profileData", JSON.stringify(userData));
                } else {
                    // Jika API gagal, coba ambil dari localStorage
                    const stored = localStorage.getItem("profileData");
                    if (stored) {
                        setUser(JSON.parse(stored));
                    }
                }

                // Fetch statistics dari database
                const statsRes = await fetch(`/api/user/stats?userId=${userId}`);
                if (statsRes.ok) {
                    const statsData = await statsRes.json();
                    setStats(statsData);
                }

                // Fetch borrowed books dari database
                const borrowedRes = await fetch(`/api/user/borrowed?userId=${userId}`);
                if (borrowedRes.ok) {
                    const borrowedData = await borrowedRes.json();
                    setBorrowedBooks(borrowedData.slice(0, 4));
                }

                // Fetch new books dari database
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
    }, [router]);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium text-lg">Memuat data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Welcome Banner - Nama dari Database */}
                <div className="bg-white rounded-3xl border-l-8 border-blue-600 shadow-sm p-8 mb-8">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                Selamat Datang Kembali,
                            </h1>
                            <h2 className="text-4xl font-bold text-blue-600 mb-3 flex items-center gap-2">
                                {user?.nama || "Guest"}! 👋
                            </h2>
                            <p className="text-gray-600 text-base mb-6">
                                Temukan, pinjam, dan nikmati ribuan koleksi buku digital kami
                            </p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-full hidden lg:block">
                            <Library className="w-16 h-16 text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Statistics Cards - Data dari Database */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {/* Buku Dipinjam */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-blue-500">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-blue-100 p-3 rounded-xl">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">2025</span>
                        </div>
                        <h3 className="text-4xl font-bold text-gray-900 mb-1">{stats.borrowed}</h3>
                        <p className="text-gray-600 text-sm font-medium mb-2">Buku Dipinjam</p>
                        <p className="text-blue-600 text-xs flex items-center gap-1">
                            ✓ Sedang dibaca
                        </p>
                    </div>

                    {/* Buku Terlambat */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-red-500">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-red-100 p-3 rounded-xl">
                                <Clock className="w-6 h-6 text-red-600" />
                            </div>
                            <span className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                                {stats.overdue > 0 ? "Perhatian" : "Aman"}
                            </span>
                        </div>
                        <h3 className="text-4xl font-bold text-gray-900 mb-1">{stats.overdue}</h3>
                        <p className="text-gray-600 text-sm font-medium mb-2">Buku Terlambat</p>
                        <p className="text-red-600 text-xs flex items-center gap-1">
                            ⊖ Denda: Rp {stats.overdue > 0 ? (stats.overdue * 1000).toLocaleString('id-ID') : '0'}
                        </p>
                    </div>

                    {/* Wishlist Saya */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-pink-500">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-pink-100 p-3 rounded-xl">
                                <Heart className="w-6 h-6 text-pink-600" />
                            </div>
                            <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-3 py-1 rounded-full">Favorit</span>
                        </div>
                        <h3 className="text-4xl font-bold text-gray-900 mb-1">{stats.favorites}</h3>
                        <p className="text-gray-600 text-sm font-medium mb-2">Wishlist Saya</p>
                        <p className="text-pink-600 text-xs flex items-center gap-1">
                            ♥ Buku favorit
                        </p>
                    </div>

                    {/* Total Koleksi */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-green-500">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-green-100 p-3 rounded-xl">
                                <Library className="w-6 h-6 text-green-600" />
                            </div>
                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">Tersedia</span>
                        </div>
                        <h3 className="text-4xl font-bold text-gray-900 mb-1">{stats.available}</h3>
                        <p className="text-gray-600 text-sm font-medium mb-2">Total Koleksi</p>
                        <p className="text-green-600 text-xs flex items-center gap-1">
                            ✓ Siap dipinjam
                        </p>
                    </div>
                </div>

                {/* Peminjaman Aktif */}
                <section className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Peminjaman Aktif</h2>
                            <p className="text-gray-600 text-sm">Buku yang sedang Anda pinjam</p>
                        </div>
                        <Link href="/user/pinjam" className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                            Lihat Semua
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {borrowedBooks.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-10 h-10 text-blue-600" />
                            </div>
                            <h3 className="text-gray-900 text-xl font-bold mb-2">Belum Ada Peminjaman Aktif</h3>
                            <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
                                Mulai petualangan membaca Anda dengan meminjam buku dari koleksi perpustakaan kami
                            </p>
                            <Link href="/user/katalog">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-md">
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

                {/* Koleksi Terbaru */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Koleksi Terbaru</h2>
                            <p className="text-gray-600 text-sm">Buku yang baru saja ditambahkan ke perpustakaan</p>
                        </div>
                        <Link href="/user/katalog" className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                            Selengkapnya
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {newBooks.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <div className="text-6xl mb-4">📖</div>
                            <h3 className="text-gray-700 text-xl font-bold mb-2">Belum ada buku tersedia</h3>
                            <p className="text-gray-500 text-sm">
                                Koleksi buku akan segera ditambahkan
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