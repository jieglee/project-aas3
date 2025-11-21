"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import BookCard from "../../../../component/user/Borrow/BookCard";
import CalendarBorrow from "../../../../component/user/Borrow/CalendarBorrow";
import BorrowerForm from "../../../../component/user/Borrow/BorrowerForm";

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
        const defaultReturn = new Date(borrowDate);
        defaultReturn.setDate(defaultReturn.getDate() + 20);
        setReturnDate(defaultReturn);
    }, [borrowDate]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const returnFixed = new Date(returnDate);
    returnFixed.setHours(0, 0, 0, 0);

    let lateDays = 0;
    let fine = 0;

    if (today > returnFixed) {
        const diff = today - returnFixed;
        lateDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        fine = lateDays * 5000;
    }

    const saveData = () => {
        if (!book) return;

        if (!borrowerData.name || !borrowerData.class || !borrowerData.email || !borrowerData.phone) {
            alert("Lengkapi semua data peminjam!");
            return false;
        }

        sessionStorage.setItem(
            "borrowData",
            JSON.stringify({ book, borrowerData, borrowDate, returnDate, lateDays, fine })
        );
        return true;
    };

    if (!book) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white">
            <h1 className="text-3xl font-bold mb-8 text-blue-900 text-center">Pinjam Buku</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BookCard book={book} />

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

            {/* <BorrowerForm borrowerData={borrowerData} setBorrowerData={setBorrowerData} /> */}

            <div className="mt-6 flex justify-end">
                <Link href="/user/confirm" onClick={saveData}>
                    <motion.div
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-blue-900 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg cursor-pointer font-semibold"
                    >
                        Konfirmasi Peminjaman
                    </motion.div>
                </Link>
            </div>
        </div>
    );
}
