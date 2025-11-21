"use client";

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
    const handleDateClick = (day) => {
        const newDate = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
        );
        setBorrowDate(newDate);

        const newReturn = new Date(newDate);
        newReturn.setDate(newReturn.getDate() + 20);
        setReturnDate(newReturn);
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

        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isSelected =
                borrowDate.getDate() === day &&
                borrowDate.getMonth() === month &&
                borrowDate.getFullYear() === year;

            days.push(
                <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all hover:scale-105 ${
                        isSelected
                            ? "bg-blue-600 text-white shadow-lg scale-105"
                            : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                    {day}
                </button>
            );
        }
        return days;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => changeMonth(-1)}
                    className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <h3 className="text-xl font-bold">
                    {currentMonth.toLocaleString("id-ID", { month: "long" })} {currentMonth.getFullYear()}
                </h3>

                <button
                    onClick={() => changeMonth(1)}
                    className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Day names */}
            <div className="grid grid-cols-7 gap-2">
                {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d) => (
                    <div key={d} className="text-center text-xs font-bold text-gray-500 py-2">
                        {d}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>

            {/* Borrow Date Card */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <p className="text-xs text-gray-600 font-medium">Tanggal Peminjaman</p>
                <p className="text-lg font-bold text-gray-800">
                    {borrowDate.toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            </div>

            {/* Return Date Card */}
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <p className="text-xs text-gray-600 font-medium">Tanggal Pengembalian</p>
                <p className="text-lg font-bold text-gray-800">
                    {returnDate.toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            </div>

            {/* Late Fine */}
            {lateDays > 0 && (
                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                    <p className="text-sm font-bold text-red-700">Peringatan Keterlambatan!</p>
                    <p className="text-sm">Terlambat {lateDays} hari</p>
                    <p className="text-lg font-bold text-red-600 mt-1">Denda: Rp {fine.toLocaleString("id-ID")}</p>
                </div>
            )}

            {/* Note */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800">
                    <span className="font-bold">Catatan:</span> Durasi peminjaman adalah 20 hari. Denda Rp 5.000/hari.
                </p>
            </div>
        </div>
    );
}
