"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";

import BookImage from "../../../../component/user/Detail/BookImage";
import BookInfo from "../../../../component/user/Detail/BookInfo";
import ActionButtons from "../../../../component/user/Detail/ActionButtons";

export default function DetailPage() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBook() {
            try {
                const res = await fetch(`/api/buku/${id}`);
                if (!res.ok) {
                    setBook(null);
                    return;
                }
                const data = await res.json();
                setBook(data);
            } catch (err) {
                console.error("Error fetching book:", err);
            } finally {
                setLoading(false);
            }
        }

        if (id) fetchBook();
    }, [id]);

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading buku...</div>;
    }

    if (!book) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-gray-600 p-4">
                <h2 className="text-xl font-bold mb-4">Buku Tidak Ditemukan</h2>
                <Link href="/user/home" className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                    Kembali ke Home
                </Link>
            </div>
        );
    }

    return (
        <>
            <Toaster position="top-right" />

            <div className="p-6 md:p-10 max-w-5xl mx-auto">
                <button
                    onClick={() => window.history.back()}
                    className="text-blue-600 hover:text-blue-800 mb-6 flex items-center gap-2 text-sm font-medium"
                >
                    ← Kembali
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
                    
                    <BookImage book={book} />

                    <div>
                        <BookInfo book={book} />

                        <ActionButtons book={book} id={id} />
                    </div>
                </div>
            </div>
        </>
    );
}
