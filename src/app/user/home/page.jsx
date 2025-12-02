// app/(user)/home/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import WelcomeSection from "../../../component/user/Home/WelcomeSection";
import StatsGrid from "../../../component/user/Home/StatsGrid";
import NewBooksSection from "../../../component/user/Home/NewBooksSection";

export default function HomePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [newBooks, setNewBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);

                // Cek token dulu untuk validasi login
                const token = localStorage.getItem("token");
                if (!token) {
                    console.log("No token found, redirecting to login");
                    router.push("/login");
                    return;
                }

                // Ambil profileData dari localStorage
                const storedProfileData = localStorage.getItem("profileData");
                console.log("Stored profileData:", storedProfileData);
                
                let userData = null;
                if (storedProfileData) {
                    userData = JSON.parse(storedProfileData);
                    console.log("User data parsed:", userData);
                    setUser(userData);
                } else {
                    console.log("No profileData found, redirecting to login");
                    router.push("/login");
                    return;
                }

                // Fetch new books
                const booksRes = await fetch("/api/buku");
                if (booksRes.ok) {
                    const booksData = await booksRes.json();
                    const sortedBooks = Array.isArray(booksData)
                        ? booksData.sort((a, b) => b.id - a.id).slice(0, 4)
                        : [];
                    setNewBooks(sortedBooks);
                    console.log("Books loaded:", sortedBooks.length);
                } else {
                    console.error("Failed to fetch books:", booksRes.status);
                }

                // Fetch stats dashboard jika user ada
                if (userData?.id) {
                    console.log("Fetching stats for user ID:", userData.id);
                    
                    // ✅ UBAH INI - tambah 's' di 'users'
                    const statsRes = await fetch(`/api/users/dashboard/${userData.id}`);
                    console.log("Stats response status:", statsRes.status);
                    
                    if (statsRes.ok) {
                        const statsData = await statsRes.json();
                        console.log("Stats data received:", statsData);
                        setStats(statsData);
                    } else {
                        const errorText = await statsRes.text();
                        console.error("Failed to fetch stats:", statsRes.status, errorText);
                    }
                } else {
                    console.warn("No user ID available for stats fetch");
                }

            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [router]);

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
                <StatsGrid stats={stats} />
                <NewBooksSection newBooks={newBooks} />
            </div>
        </div>
    );
}