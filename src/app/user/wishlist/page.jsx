"use client";
import React, { useEffect, useState } from "react";

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState([]); // <-- HARUS ARRAY

    useEffect(() => {
        async function fetchWishlist() {
            try {
                const res = await fetch("/api/wishlist");
                const data = await res.json();
                
                console.log("DATA WISHLIST:", data);

                // Pastikan data array
                if (Array.isArray(data)) {
                    setWishlist(data);
                } else {
                    setWishlist([]); // fallback aman
                }
            } catch (err) {
                console.log(err);
                setWishlist([]);
            }
        }

        fetchWishlist();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Wishlist</h1>

            {wishlist.length === 0 ? (
                <p>Wishlist kosong</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlist.map((item) => (
                        <div key={item.id} className="border rounded p-4 shadow">
                            <h2 className="font-semibold">Buku ID: {item.buku_id}</h2>
                            <p>User: {item.user_id}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
