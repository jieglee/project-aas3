"use client";

import Link from "next/link";

export default function EmptyWishlist() {
    return (
        <div className="flex items-center justify-center py-20">
            <div className="text-center max-w-md">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Wishlist Kosong</h2>
                <p className="text-gray-600 mb-6">
                    Belum ada buku yang ditambahkan ke wishlist. Mulai tambahkan buku favoritmu sekarang!
                </p>
                <Link 
                    href="/user/home" 
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                    Jelajahi Buku
                </Link>
            </div>
        </div>
    );
}