"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import BookCard from "../../../../component/user/Borrow/BookCard";
import CalendarBorrow from "../../../../component/user/Borrow/CalendarBorrow";

export default function BorrowPage() {
    const { id } = useParams();

    const [book, setBook] = useState(null);
    const [borrowDate, setBorrowDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const [borrowerData, setBorrowerData] = useState({
        name: "",
        class: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        async function fetchBook() {
            const res = await fetch(`/api/buku/${id}`);
            const data = await res.json();
            setBook(data);
        }
        if (id) fetchBook();
    }, [id]);

    useEffect(() => {
        const fixed = new Date(borrowDate);
        fixed.setDate(fixed.getDate() + 20);
        setReturnDate(fixed);
    }, [borrowDate]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(returnDate);
    due.setHours(0, 0, 0, 0);

    let lateDays = 0;
    let fine = 0;

    if (today > due) {
        lateDays = Math.floor((today - due) / (1000 * 3600 * 24));
        fine = lateDays * 5000;
    }

    const saveData = () => {
        sessionStorage.setItem(
            "borrowData",
            JSON.stringify({ book, borrowerData, borrowDate, returnDate, lateDays, fine })
        );
        return true;
    };

    if (!book) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">

                <Link href="/user/dashboard"
                    className="text-blue-600 font-medium inline-flex items-center mb-6"
                >
                    ← Kembali
                </Link>

                <h1 className="text-4xl font-bold mb-8">Pinjam Buku</h1>

                <div className="grid lg:grid-cols-2 gap-8">
                    <BookCard book={book} />

                    <div className="space-y-6">
                        {/* Form */}
                        <div className="bg-white p-6 rounded-2xl shadow-xl border">
                            <h2 className="text-2xl font-bold mb-4">Data Peminjam</h2>

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Nama lengkap"
                                    className="w-full p-3 border rounded-xl"
                                    value={borrowerData.name}
                                    onChange={(e) => setBorrowerData({ ...borrowerData, name: e.target.value })}
                                />

                                <input
                                    type="text"
                                    placeholder="Kelas"
                                    className="w-full p-3 border rounded-xl"
                                    value={borrowerData.class}
                                    onChange={(e) => setBorrowerData({ ...borrowerData, class: e.target.value })}
                                />

                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-3 border rounded-xl"
                                    value={borrowerData.email}
                                    onChange={(e) => setBorrowerData({ ...borrowerData, email: e.target.value })}
                                />

                                <input
                                    type="tel"
                                    placeholder="No. Telepon"
                                    className="w-full p-3 border rounded-xl"
                                    value={borrowerData.phone}
                                    onChange={(e) => setBorrowerData({ ...borrowerData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Calendar */}
                        <div className="bg-white p-6 rounded-2xl shadow-xl border">
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

                        {/* Button */}
                        <Link
                            href="/user/peminjaman/detail"
                            onClick={saveData}
                            className="block text-center py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg transition"
                        >
                            Lanjutkan
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
