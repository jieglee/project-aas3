"use client";

import { useState } from "react";
import WishlistList from "../../../component/user/Whislist/List";
import EmptyWishlist from "../../../component/user/Whislist/EmptyList";

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState([
        {
            title: "The Psychology of Money",
            author: "Morgan Housel",
            cover: "/psychology.png",
        },
        {
            title: "The Bees",
            author: "Laline Paull",
            cover: "/bees.png",
        },
        {
            title: "Real Help",
            author: "Ayodeji Awosika",
            cover: "/realhelp.png",
        },
    ]);

    const removeBook = (title) => {
        setWishlist((prev) => prev.filter((book) => book.title !== title));
    };

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
