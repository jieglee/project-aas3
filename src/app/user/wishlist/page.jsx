"use client";

import { useState, useEffect } from "react";
import { Heart, Loader2, BookOpen, Sparkles, Search } from "lucide-react";
import Link from "next/link";
import BookCard from "../../../component/user/Whislist/BookCard";

export default function WishlistPage() {
    const [wishlistBooks, setWishlistBooks] = useState([]);
    const [loading, setLoading] = useState(true);
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
        if (!user?.id) return;

        async function fetchWishlist() {
            try {
                setLoading(true);
                console.log("Fetching wishlist for user:", user.id);
                
                // Kirim user_id sebagai query parameter
                const res = await fetch(`/api/wishlist?userId=${user.id}`);
                
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || "Failed to fetch wishlist");
                }
                
                const data = await res.json();
                console.log("Wishlist data received:", data);
                setWishlistBooks(data);
            } catch (err) {
                console.error("Error fetching wishlist:", err);
                setWishlistBooks([]);
            } finally {
                setLoading(false);
            }
        }

        fetchWishlist();
    }, [user]);

    const handleRemoveFromWishlist = async (wishlist_id) => {
        try {
            console.log("Removing from wishlist:", wishlist_id);
            
            const res = await fetch("/api/wishlist", {
                method: "DELETE",
                body: JSON.stringify({ wishlist_id }),
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                // Update state untuk remove item dari UI
                setWishlistBooks((prev) =>
                    prev.filter((book) => book.wishlist_id !== wishlist_id)
                );
                console.log("✅ Successfully removed from wishlist");
            }
        } catch (err) {
            console.error("Error removing from wishlist:", err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="relative inline-block mb-4">
                        <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
                        <Heart className="w-6 h-6 text-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-gray-600 font-medium text-lg">Memuat wishlist Anda...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-red-100 p-3 rounded-xl">
                                    <Heart className="w-8 h-8 text-red-600 fill-red-600" />
                                </div>
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                        Wishlist Saya
                                    </h1>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Koleksi buku favorit yang ingin Anda baca
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Stats Badge */}
                        {wishlistBooks.length > 0 && (
                            <div className="flex items-center gap-6">
                                <div className="bg-blue-50 border border-blue-200 px-6 py-4 rounded-xl text-center">
                                    <p className="text-3xl font-bold text-blue-600">
                                        {wishlistBooks.length}
                                    </p>
                                    <p className="text-sm text-gray-600 font-medium">
                                        Buku Favorit
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                {wishlistBooks.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-300 p-16 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="relative inline-block mb-6">
                                <div className="bg-gray-100 rounded-full p-8">
                                    <Heart className="w-16 h-16 text-gray-400" />
                                </div>
                                <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-2">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Wishlist Masih Kosong
                            </h3>
                            <p className="text-gray-500 text-base mb-8">
                                Mulai tambahkan buku-buku favorit Anda ke wishlist untuk memudahkan tracking buku yang ingin dibaca
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link href="/user/katalog">
                                    <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                                        <Search className="w-5 h-5" />
                                        Jelajahi Katalog
                                    </button>
                                </Link>
                                <Link href="/user/home">
                                    <button className="w-full sm:w-auto bg-white text-gray-700 border-2 border-gray-300 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                                        <BookOpen className="w-5 h-5" />
                                        Kembali ke Beranda
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                                    Koleksi Favorit Anda
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    Total {wishlistBooks.length} buku dalam wishlist
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {wishlistBooks.map((book) => (
                                <Link key={book.wishlist_id} href={`/user/detail/${book.buku_id}`}>
                                    <BookCard
                                        book={book}
                                        onRemove={handleRemoveFromWishlist}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}