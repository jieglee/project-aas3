"use client";
import BookCard from "./BookCard";
import Link from "next/link"; 

export default function Recommended({ books }) {
    return (
        <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended</h2>
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {books.map((book) => (
                    <Link key={book.id} href={`/user/detail/${book.id}`} className="min-w-[200px]">
                        <BookCard book={book} />
                    </Link>
                ))}
            </div>
        </section>
    );
}