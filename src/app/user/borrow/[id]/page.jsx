"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import BookInfo from "../../../../component/user/Borrow/BookInfo";
import DateCalendar from "../../../../component/user/Borrow/DateCalendar";
import ConfirmationSection from "../../../../component/user/Borrow/ConfirmationSection";
import ModalWaitingAdmin from "../../../../component/user/Borrow/ModalWaitingAdmin";

export default function BookDetailPage() {
    const params = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Calendar state
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [borrowDate, setBorrowDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);

    // Modal state
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function fetchBook() {
            try {
                setLoading(true);
                const res = await fetch(`/api/buku/${params.id}`);
                if (!res.ok) throw new Error("Failed to fetch book");
                const data = await res.json();
                setBook(data);
                
                // Set default dates (maksimal 20 hari)
                const today = new Date();
                const maxReturnDate = new Date(today);
                maxReturnDate.setDate(today.getDate() + 20);
                
                setBorrowDate(today.toISOString().split('T')[0]);
                setReturnDate(maxReturnDate.toISOString().split('T')[0]);
            } catch (err) {
                console.error("Error fetching book:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchBook();
    }, [params.id]);

    const handleAjukanPeminjaman = async () => {
        const userId = localStorage.getItem("userId");
        
        if (!userId) {
            toast.error("Anda harus login terlebih dahulu");
            return;
        }

        if (!borrowDate || !returnDate) {
            toast.error("Silakan pilih tanggal peminjaman");
            return;
        }

        const borrowPromise = fetch("/api/peminjaman", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: parseInt(userId),
                buku_id: parseInt(book.id),
                tanggal_pinjam: borrowDate,
                tanggal_kembali: returnDate,
            })
        })
        .then(async (res) => {
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Gagal mengajukan peminjaman");
            }
            setShowModal(true);
            return res;
        });

        toast.promise(borrowPromise, {
            loading: "Mengajukan peminjaman...",
            success: "Peminjaman berhasil diajukan!",
            error: (err) => `Gagal mengajukan peminjaman: ${err.message}`,
        });
    };

    const getBookImageUrl = (imgPath) => {
        if (!imgPath) return "/api/placeholder/200/300";
        if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) return imgPath;
        if (imgPath.startsWith('/')) return imgPath;
        return `/buku/${imgPath}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium text-lg">Memuat detail buku...</p>
                </div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-gray-600 text-lg">Buku tidak ditemukan</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                
                <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
                    
                    {/* Left Column - Book Info */}
                    <BookInfo book={book} getBookImageUrl={getBookImageUrl} />

                    {/* Right Column - Calendar */}
                    <DateCalendar
                        currentMonth={currentMonth}
                        setCurrentMonth={setCurrentMonth}
                        borrowDate={borrowDate}
                        setBorrowDate={setBorrowDate}
                        setReturnDate={setReturnDate}
                    />
                </div>

                {/* Bottom Section - Confirmation */}
                <ConfirmationSection
                    borrowDate={borrowDate}
                    returnDate={returnDate}
                    book={book}
                    handleAjukanPeminjaman={handleAjukanPeminjaman}
                />
            </div>

            {/* Modal Waiting Admin */}
            <ModalWaitingAdmin
                show={showModal}
                onClose={() => setShowModal(false)}
                book={book}
                borrowDate={borrowDate}
                returnDate={returnDate}
            />
        </div>
    );
}