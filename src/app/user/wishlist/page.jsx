"use client";

import { useState, useEffect } from "react";
import { Heart, Loader2, BookOpen } from "lucide-react";
import Link from "next/link";
import BookCard from "../../../component/user/Whislist/BookCard";

export default function WishlistPage() {
    const [wishlistBooks, setWishlistBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWishlist() {
            try {
                setLoading(true);
                const res = await fetch("/api/wishlist");
                if (!res.ok) throw new Error("Failed to fetch wishlist");
                const data = await res.json();
                setWishlistBooks(data);
            } catch (err) {
                console.error("Error fetching wishlist:", err);
                setWishlistBooks([]);
            } finally {
                setLoading(false);
            }
        }

        fetchWishlist();
    }, []);

    const handleRemoveFromWishlist = async (wishlist_id) => {
        try {
            await fetch("/api/wishlist", {
                method: "DELETE",
                body: JSON.stringify({ wishlist_id }),
                headers: { "Content-Type": "application/json" },
            });
            setWishlistBooks((prev) =>
                prev.filter((book) => book.wishlist_id !== wishlist_id)
            );
        } catch (err) {
            console.error("Error removing from wishlist:", err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium text-lg">Memuat wishlist...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">


                {/* Wishlist Grid */}
                {wishlistBooks.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                        <h3 className="text-gray-700 text-2xl font-bold mb-2">
                            Wishlist Kosong
                        </h3>
                        <p className="text-gray-500 text-base mb-6">
                            Belum ada buku yang ditambahkan ke wishlist
                        </p>
                        <Link href="/user/home">
                            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all">
                                Jelajahi Katalog
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Koleksi Wishlist
                            </h2>
                            <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-5 py-2.5 rounded-full border-2 border-gray-200 shadow-sm">
                                <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                                <span className="font-semibold">{wishlistBooks.length}</span>
                                <span>buku</span>
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