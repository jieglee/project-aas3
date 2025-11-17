"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

// ⭐ FUNCTION RATING — FULL, HALF, EMPTY
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<span key={i} className="text-yellow-500 text-lg">★</span>);
    } else if (rating >= i - 0.5) {
      stars.push(<span key={i} className="text-yellow-500 text-lg">⯨</span>);
    } else {
      stars.push(<span key={i} className="text-gray-300 text-lg">★</span>);
    }
  }
  return stars;
};

export default function Borrow() {
  const [book, setBook] = useState(null);
  const [borrowDate, setBorrowDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [estimatedFine, setEstimatedFine] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [borrowerData, setBorrowerData] = useState({
    name: "",
    class: "",
    email: "",
    phone: "",
  });

  const FINE_PER_DAY = 5000;

  const books = [
    {
      id: 1,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      publisher: "Harper Business",
      category: "Finance",
      year: 2020,
      rating: 4.8,
      cover: "/psychology.png",
    },
    {
      id: 2,
      title: "How Innovation Works",
      author: "Matt Ridley",
      publisher: "HarperCollins",
      category: "Science",
      year: 2021,
      rating: 4.6,
      cover: "/innovation.png",
    },
  ];

  useEffect(() => {
    const found = books.find((b) => b.id === 1);
    setBook(found || null);
  }, []);

  useEffect(() => {
    const defaultReturn = new Date(borrowDate);
    defaultReturn.setDate(defaultReturn.getDate() + 20);
    setReturnDate(defaultReturn);

    const today = new Date();
    const lateDays = Math.ceil((today - defaultReturn) / (1000 * 60 * 60 * 24));
    setEstimatedFine(lateDays > 0 ? lateDays * FINE_PER_DAY : 0);
  }, [borrowDate]);

  const handleDateClick = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setBorrowDate(newDate);

    const newReturn = new Date(newDate);
    newReturn.setDate(newReturn.getDate() + 20);
    setReturnDate(newReturn);

    const today = new Date();
    const lateDays = Math.ceil((today - newReturn) / (1000 * 60 * 60 * 24));
    setEstimatedFine(lateDays > 0 ? lateDays * FINE_PER_DAY : 0);
  };

  const changeMonth = (delta) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + delta);
    setCurrentMonth(newMonth);
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysArray = [];
    for (let i = 0; i < firstDay; i++) daysArray.push(<div key={`empty-${i}`}></div>);
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = borrowDate.getDate() === day && borrowDate.getMonth() === month;
      daysArray.push(
        <div
          key={day}
          className={`cursor-pointer flex justify-center items-center p-1 rounded-full text-sm ${
            isSelected ? "bg-blue-900 text-white" : "hover:bg-blue-200 text-black"
          }`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }
    return daysArray;
  };

  // SAVE DATA
  const saveData = () => {
    if (!book) return;
    if (!borrowerData.name || !borrowerData.class || !borrowerData.email || !borrowerData.phone) {
      alert("Lengkapi semua data peminjam!");
      return false;
    }
    sessionStorage.setItem("borrowData", JSON.stringify({ book, borrowerData, borrowDate, returnDate }));
    return true;
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Pinjam Buku</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* BOOK CARD */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white shadow-lg rounded-2xl p-5 flex flex-col md:flex-row items-center gap-5 transition-transform"
        >
          {book ? (
            <>
              <Image src={book.cover} width={160} height={220} className="rounded-xl shadow-md" alt={book.title} />

              <div className="flex-1">
                {/* RATING */}
                <div className="flex items-center mb-1">
                  {renderStars(book.rating)}
                  <span className="ml-2 text-gray-700 text-sm">({book.rating})</span>
                </div>

                <h2 className="text-xl font-bold text-blue-900">{book.title}</h2>

                <div className="mt-3 space-y-1 text-sm text-gray-700">
                  <p><span className="font-semibold">Penulis:</span> {book.author}</p>
                  <p><span className="font-semibold">Penerbit:</span> {book.publisher}</p>
                  <p><span className="font-semibold">Kategori:</span> {book.category}</p>
                  <p><span className="font-semibold">Tahun:</span> {book.year}</p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Buku tidak ditemukan</p>
          )}
        </motion.div>

        {/* CALENDAR */}
        <div className="bg-white p-4 rounded-2xl border border-blue-400 text-sm">
          <div className="flex justify-between items-center mb-2">
            <button onClick={() => changeMonth(-1)} className="text-blue-500 text-lg">&lt;</button>
            <h2 className="font-semibold text-gray-700 text-sm">
              {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
            </h2>
            <button onClick={() => changeMonth(1)} className="text-blue-500 text-lg">&gt;</button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-gray-500 font-semibold text-xs">
            {["Min","Sen","Sel","Rab","Kam","Jum","Sab"].map(d => <div key={d}>{d}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-1 mt-1">{renderCalendar()}</div>

          <p className="text-xs text-gray-600 mt-2">
            Tanggal Peminjaman: <span className="font-semibold">{borrowDate.toLocaleDateString()}</span>
          </p>

          <p className="text-xs text-gray-600">
            Tanggal Pengembalian: <span className="font-semibold">{returnDate.toLocaleDateString()}</span>
          </p>
        </div>
      </div>

      {/* BORROWER FORM */}
      <div className="mt-8 bg-white shadow-lg rounded-2xl p-6 border border-blue-400">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Data Peminjam</h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

          <div className="relative">
            <AiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={borrowerData.name}
              onChange={(e) => setBorrowerData({ ...borrowerData, name: e.target.value })}
              className="pl-10 p-3 border border-blue-400 rounded-xl w-full focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Kelas"
              value={borrowerData.class}
              onChange={(e) => setBorrowerData({ ...borrowerData, class: e.target.value })}
              className="p-3 border border-blue-400 rounded-xl w-full focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="relative">
            <AiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
            <input
              type="email"
              placeholder="Email"
              value={borrowerData.email}
              onChange={(e) => setBorrowerData({ ...borrowerData, email: e.target.value })}
              className="pl-10 p-3 border border-blue-400 rounded-xl w-full focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="relative">
            <AiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              placeholder="Nomor Telepon"
              value={borrowerData.phone}
              onChange={(e) => setBorrowerData({ ...borrowerData, phone: e.target.value })}
              className="pl-10 p-3 border border-blue-400 rounded-xl w-full focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

        </form>
      </div>

      {/* CONFIRM BUTTON */}
      <div className="mt-6 flex justify-center md:justify-end">
        <Link href="/Layout/User/Confirm" onClick={saveData}>
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
