"use client";

import React, { useEffect, useState } from "react";
import WishlistList from "../../../component/user/Whislist/List";
import EmptyWishlist from "../../../component/user/Whislist/EmptyList";

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWishlist();
    }, []);

    async function fetchWishlist() {
        try {
            setLoading(true);
            const res = await fetch("/api/wishlist");
            const data = await res.json();
            setWishlist(data);
        } catch (err) {
            console.log(err);
            setWishlist([]);
        } finally {
            setLoading(false);
        }
    }

    async function removeWishlist(id) {
        await fetch("/api/wishlist", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        fetchWishlist();
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Memuat wishlist...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Wishlist Saya</h1>
                    <p className="text-gray-600">
                        {wishlist.length > 0 
                            ? `${wishlist.length} buku dalam wishlist` 
                            : "Belum ada buku dalam wishlist"}
                    </p>
                </div>

                {wishlist.length === 0 ? (
                    <EmptyWishlist />
                ) : (
                    <WishlistList list={wishlist} remove={removeWishlist} />
                )}
            </div>
        </div>
    );
}