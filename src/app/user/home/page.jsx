"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import SearchBar from "../../../component/user/Home/SearchBar";
import Categories from "../../../component/user/Home/Categories";
import BookCard from "../../../component/user/Home/BookCard";
import Recommended from "../../../component/user/Home/Recommended";

export default function HomePage() {
    const [allBooks, setAllBooks] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("Semua");

    const categoriesList = ["Semua", "Fiksi", "Nonfiksi", "Pelajaran", "Komik"];

    useEffect(() => {
        async function fetchBooks() {
            try {
                setLoading(true);
                const res = await fetch("/api/buku");

                if (!res.ok) {
                    throw new Error("Failed to fetch books");
                }

                const data = await res.json();

                setAllBooks(data);
                setRecommended(data.slice(0, 4));
            } catch (err) {
                console.error("Error fetching books:", err);
                setAllBooks([]);
                setRecommended([]);
            } finally {
                setLoading(false);
            }
        }
        fetchBooks();
    }, []);

    const filteredBooks = allBooks.filter((book) => {
        const matchesCategory = activeCategory === "Semua" || book.kategori === activeCategory;
        const matchesSearch =
            book.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.penulis.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.kategori.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.penerbit.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Memuat perpustakaan...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-6 py-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        📚 Perpustakaan Digital
                    </h1>
                    <p className="text-gray-600">Temukan buku favoritmu dan mulai petualangan baru</p>
                </div>

                {/* Search Bar */}
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                {/* Recommended Section */}
                {!searchQuery && <Recommended books={recommended} loading={loading} />}

                {/* Categories */}
                <Categories
                    categories={categoriesList}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    loading={loading}
                />

                {/* Books Grid */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {searchQuery ? `Hasil Pencarian "${searchQuery}"` : activeCategory}
                        </h2>
                        <span className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-200">
                            {filteredBooks.length} buku
                        </span>
                    </div>

                    {filteredBooks.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">📖</div>
                            <p className="text-gray-500 text-lg">Tidak ada buku yang ditemukan</p>
                            <p className="text-gray-400 text-sm mt-2">Coba ubah pencarian atau kategori</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredBooks.map((book) => (
                                <Link key={book.id} href={`/user/detail/${book.id}`}>
                                    <BookCard book={book} />
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
