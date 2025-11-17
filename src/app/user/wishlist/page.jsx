"use client";

import { useState, useEffect } from "react";
import WishlistList from "../../../component/user/Whislist/List";
import EmptyWishlist from "../../../component/user/Whislist/EmptyList";

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWishlist() {
            try {
                const res = await fetch("/api/wishlist");
                const data = await res.json();
                setWishlist(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchWishlist();
    }, []);

    const removeBook = async (id) => {
        // opsional: DELETE ke API jika ada tabel wishlist
        setWishlist((prev) => prev.filter((book) => book.id !== id));
    };

    if (loading) return <p className="text-center mt-20">Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-50 px-8 py-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">My Wishlist</h2>

            {wishlist.length === 0 ? (
                <EmptyWishlist />
            ) : (
                <WishlistList list={wishlist} remove={removeBook} />
            )}
        </div>
    );
}
