"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

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
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Memuat data buku...</p>
                </div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Buku Tidak Ditemukan</h2>
                    <p className="text-gray-600 mb-6">Buku yang Anda cari tidak tersedia</p>
                    <Link 
                        href="/user/home" 
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        Kembali ke Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <Toaster position="top-right" />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali
                    </button>

                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-10">
                            
                            <BookImage book={book} />

                            <div className="flex flex-col">
                                <BookInfo book={book} />
                                <ActionButtons book={book} id={id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}