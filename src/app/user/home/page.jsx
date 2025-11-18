"use client";

import { useState, useEffect } from "react";
import Recommended from "../../../component/user/Home/Recommended";
import Categories from "../../../component/user/Home/Categories";
import BookCard from "../../../component/user/Home/BookCard";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const [allBooks, setAllBooks] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);

    const categoriesList = ["Semua", "Fiksi", "Nonfiksi", "Pelajaran", "Komik"];
    const [activeCategory, setActiveCategory] = useState("Semua");
    const router = useRouter();

    useEffect(() => {
        async function fetchBooks() {
            try {
                const res = await fetch("/api/buku");
                const data = await res.json();

                setAllBooks(data);
                setRecommended(data.slice(0, 4));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchBooks();
    }, []);

    const filteredBooks =
        activeCategory === "Semua"
            ? allBooks
            : allBooks.filter((b) => b.kategori === activeCategory);

    return (
        <div className="min-h-screen bg-gray-50 px-10 py-10">

            <Recommended books={recommended} />

            <Categories
                categories={categoriesList}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                loading={loading}
            />

            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{activeCategory}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {filteredBooks.map((book) => (
                        <div key={book.id} onClick={() => router.push(`/user/detail/${book.id}`)}>
                            <BookCard book={book} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
