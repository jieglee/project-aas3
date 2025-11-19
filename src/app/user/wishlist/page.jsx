"use client";

import React, { useEffect, useState } from "react";
import WishlistList from "../../..//component/user/Whislist/List";
import EmptyWishlist from "../../../component/user/Whislist/EmptyList";

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        fetchWishlist();
    }, []);

    async function fetchWishlist() {
        try {
            const res = await fetch("/api/wishlist");
            const data = await res.json();
            setWishlist(data);
        } catch (err) {
            console.log(err);
            setWishlist([]);
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

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Wishlist</h1>

            {wishlist.length === 0 ? (
                <EmptyWishlist />
            ) : (
                <WishlistList list={wishlist} remove={removeWishlist} />
            )}
        </div>
    );
}
