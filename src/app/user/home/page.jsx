"use client";

import { useState, useEffect } from "react";
import { Loader2, BookOpen, Library } from "lucide-react";
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
            <div className="h-screen w-full flex items-center justify-center bg-gradient from-blue-50 via-white to-purple-50">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium text-lg">Memuat perpustakaan...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gradient from-blue-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Library className="w-10 h-10 text-blue-600" />
                        <h1 className="text-5xl font-bold text-gray-900">
                            Katalog Buku
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Temukan buku favoritmu dan mulai petualangan baru dalam dunia literasi
                    </p>
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
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                            {searchQuery ? `Hasil Pencarian "${searchQuery}"` : activeCategory}
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-5 py-2.5 rounded-full border-2 border-gray-200 shadow-sm">
                            <BookOpen className="w-4 h-4" />
                            <span className="font-semibold">{filteredBooks.length}</span>
                            <span>buku</span>
                        </div>
                    </div>

                    {filteredBooks.length === 0 ? (
                        <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
                            <div className="text-7xl mb-6">📚</div>
                            <h3 className="text-gray-700 text-2xl font-bold mb-2">Tidak ada buku ditemukan</h3>
                            <p className="text-gray-500 text-base">
                                Coba ubah kata kunci pencarian atau pilih kategori lain
                            </p>
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
