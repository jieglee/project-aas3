"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import WelcomeSection from "../../../component/user/Home/WelcomeSection";
import StatsGrid from "../../../component/user/Home/StatsGrid";
import BorrowedBooksSection from "../../../component/user/Home/BorrowedBooksSection";
import NewBooksSection from "../../../component/user/Home/NewBooksSection";

export default function HomePage() {
    const [user, setUser] = useState(null);
    const [newBooks, setNewBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                
                // Ambil user dari localStorage untuk display cepat
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    const userData = JSON.parse(storedUser);
                    setUser(userData);
                }

                // Fetch new books untuk NewBooksSection
                const booksRes = await fetch("/api/buku");
                if (booksRes.ok) {
                    const booksData = await booksRes.json();
                    // Urutkan berdasarkan ID terbaru dan ambil 4 buku saja
                    const sortedBooks = Array.isArray(booksData) 
                        ? booksData.sort((a, b) => b.id - a.id).slice(0, 4)
                        : [];
                    setNewBooks(sortedBooks);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium text-lg">Memuat perpustakaan...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                
                <WelcomeSection userName={user?.nama} />
                
                <StatsGrid />
                
                <BorrowedBooksSection />
                
                <NewBooksSection newBooks={newBooks} />
                
            </div>
        </div>
    );
}