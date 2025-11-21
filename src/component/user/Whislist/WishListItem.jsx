"use client";

import WishlistItem from "../../../component/user/Whislist/Item"; 

export default function WishlistList({ list, remove }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {list.map((book, index) => (
                <WishlistItem key={index} book={book} remove={remove} />
            ))}
        </div>
    );
}
