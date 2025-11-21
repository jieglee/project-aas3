"use client";
import { TrendingUp } from "lucide-react";
import BookCard from "../../../component/user/Home/BookCard";
import Link from "next/link";

export default function Recommended({ books, loading }) {
    if (loading) {
        return (
            <section className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Rekomendasi Untuk Anda</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-gray-200 rounded-2xl h-80 animate-pulse" />
                    ))}
                </div>
            </section>
        );
    }

    if (books.length === 0) return null;

    return (
        <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Rekomendasi Untuk Anda</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                    <div key={book.id}>
                        <Link href={`/user/detail/${book.id}`}>
                            <BookCard book={book} />
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}