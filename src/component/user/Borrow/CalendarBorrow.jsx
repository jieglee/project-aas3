"use client";

import { useState } from "react";

export default function CalendarBorrow({
    borrowDate,
    setBorrowDate,
    returnDate,
    setReturnDate,
    currentMonth,
    setCurrentMonth,
    lateDays,
    fine,
}) {
    // fallback agar currentMonth tidak undefined
    const month = currentMonth || new Date();

    const handleDateClick = (day) => {
        const newDate = new Date(month.getFullYear(), month.getMonth(), day);
        setBorrowDate(newDate);

        const newReturn = new Date(newDate);
        newReturn.setDate(newReturn.getDate() + 20);
        setReturnDate(newReturn);
    };

    const changeMonth = (delta) => {
        const newMonth = new Date(month);
        newMonth.setMonth(newMonth.getMonth() + delta);
        setCurrentMonth(newMonth);
    };

    const renderCalendar = () => {
        const year = month.getFullYear();
        const m = month.getMonth();
        const firstDay = new Date(year, m, 1).getDay();
        const daysInMonth = new Date(year, m + 1, 0).getDate();

        const days = [];

        for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`}></div>);

        for (let day = 1; day <= daysInMonth; day++) {
            const isSelected =
                borrowDate &&
                borrowDate.getDate() === day &&
                borrowDate.getMonth() === m &&
                borrowDate.getFullYear() === year;

            days.push(
                <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`cursor-pointer flex justify-center items-center p-1 rounded-full text-sm ${isSelected ? "bg-blue-900 text-white" : "hover:bg-blue-200 text-black"
                        }`}
                >
                    {day}
                </button>
            );
        }
        return days;
    };

    return (
        <div className="bg-white p-3 rounded-2xl border border-blue-300 text-xs shadow-sm">
            <div className="flex justify-between items-center mb-2">
                <button onClick={() => changeMonth(-1)} className="text-blue-500">&lt;</button>
                <span className="font-semibold text-gray-700">
                    {month.toLocaleString("default", { month: "long" })} {month.getFullYear()}
                </span>
                <button onClick={() => changeMonth(1)} className="text-blue-500">&gt;</button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-gray-500 font-semibold mb-1">
                {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map(d => (
                    <div key={d}>{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

            <div className="mt-2 space-y-1">
                <p className="text-gray-600 text-xs">
                    Tanggal Peminjaman: <span className="font-semibold">{borrowDate?.toLocaleDateString()}</span>
                </p>
                <p className="text-gray-600 text-xs">
                    Tanggal Pengembalian: <span className="font-semibold">{returnDate?.toLocaleDateString()}</span>
                </p>
                {lateDays > 0 && (
                    <p className="text-red-600 font-semibold text-xs">
                        Terlambat {lateDays} hari — Denda: Rp {fine.toLocaleString()}
                    </p>
                )}
            </div>
        </div>
    );
}
