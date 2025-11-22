"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";

import BookCard from "../../../../component/user/Borrow/BookCard";
import CalendarBorrow from "../../../../component/user/Borrow/CalendarBorrow";
import ModalWaitingAdmin from "../../../../component/user/Borrow/ModalWaitingAdmin";

export default function BorrowPage() {
    const { id } = useParams();
    const router = useRouter();

    const [book, setBook] = useState(null);
    const [borrowDate, setBorrowDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch buku
    useEffect(() => {
        async function fetchBook() {
            const res = await fetch(`/api/buku/${id}`);
            const data = await res.json();
            setBook(data);
        }
        if (id) fetchBook();
    }, [id]);

    // Set default return date +20 hari
    useEffect(() => {
        const defaultReturn = new Date(borrowDate);
        defaultReturn.setDate(defaultReturn.getDate() + 20);
        setReturnDate(defaultReturn);
    }, [borrowDate]);

    // Hitung denda jika lewat tanggal kembali
    const today = new Date();
    today.setHours(0,0,0,0);
    const returnFixed = new Date(returnDate);
    returnFixed.setHours(0,0,0,0);
    let lateDays = 0;
    let fine = 0;
    if (today > returnFixed) {
        const diff = today - returnFixed;
        lateDays = Math.floor(diff / (1000*60*60*24));
        fine = lateDays * 5000;
    }

    if (!book) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Memuat data buku...</p>
                </div>
            </div>
        );
    }

    // Tombol pinjam: simpan data dan tampilkan modal
    const handleBorrow = async () => {
        setLoading(true);
        try {
            await fetch("/api/borrow", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    buku_id: book.id,
                    borrow_date: borrowDate,
                    return_date: returnDate,
                    fine: fine
                })
            });

            setShowModal(true);
        } catch (err) {
            console.error(err);
            alert("Gagal meminjam buku");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg mb-4">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Pinjam Buku
                        </h1>
                    </div>
                    <p className="text-gray-600">Pilih tanggal peminjaman dan konfirmasi</p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2">
                        <BookCard book={book} />
                    </div>
                    <div className="lg:col-span-1">
                        <CalendarBorrow
                            borrowDate={borrowDate}
                            setBorrowDate={setBorrowDate}
                            returnDate={returnDate}
                            setReturnDate={setReturnDate}
                            currentMonth={currentMonth}
                            setCurrentMonth={setCurrentMonth}
                            lateDays={lateDays}
                            fine={fine}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleBorrow}
                        disabled={loading || book.stok === 0}
                        className={`
                            px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300
                            ${loading || book.stok === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-2xl hover:scale-105"
                            }
                            text-white flex items-center gap-3
                        `}
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Memproses...
                            </>
                        ) : book.stok === 0 ? (
                            "Buku Tidak Tersedia"
                        ) : (
                            <>
                                <BookOpen className="w-5 h-5" />
                                Ajukan Peminjaman
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Modal Waiting Admin */}
            <ModalWaitingAdmin
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    router.push("/user/riwayat");
                }}
                book={book}
                borrowDate={borrowDate}
                returnDate={returnDate}
                fine={fine}
            />
        </div>
    );
}
