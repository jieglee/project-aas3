"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

import BookCard from "../../../component/user/Katalog/BookCard";
import Categories from "../../../component/user/Katalog/Categories";

export default function CatalogPage() {
    const [allBooks, setAllBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("Semua");

    const categoriesList = ["Semua", "Nonfiksi", "Fiksi", "Pendidikan", "Komik"];

    useEffect(() => {
        async function fetchBooks() {
            try {
                setLoading(true);
                const res = await fetch("/api/buku");
                const data = await res.json();
                setAllBooks(data);
            } catch (err) {
                console.error("Error fetching books:", err);
                setAllBooks([]);
            } finally {
                setLoading(false);
            }
        }
        fetchBooks();
    }, []);

    const filteredBooks = allBooks.filter((book) => {
        const matchesCategory =
            activeCategory === "Semua" || book.kategori === activeCategory;

        const search = searchQuery.toLowerCase();
        const matchesSearch =
            book.judul.toLowerCase().includes(search) ||
            book.penulis.toLowerCase().includes(search) ||
            book.kategori.toLowerCase().includes(search) ||
            book.penerbit.toLowerCase().includes(search);

        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium text-lg">
                        Memuat perpustakaan...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Katalog Buku
                    </h1>
                    <p className="text-gray-600">
                        {allBooks.length} buku tersedia untuk dipinjam
                    </p>
                </div>

                {/* Categories */}
                <Categories
                    categoriesList={categoriesList}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />

                {/* Books */}
                <section>
                    {filteredBooks.length === 0 ? (
                        <div className="text-center py-24 bg-white rounded-2xl shadow-sm">
                            <div className="text-6xl mb-6">📚</div>
                            <h3 className="text-gray-700 text-xl font-bold mb-2">
                                Tidak ada buku ditemukan
                            </h3>
                            <p className="text-gray-500">
                                Coba ubah kata kunci pencarian atau kategori
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
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
