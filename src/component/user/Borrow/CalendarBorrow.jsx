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
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
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

        for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`}></div>);

        for (let day = 1; day <= daysInMonth; day++) {
            const isSelected =
                borrowDate.getDate() === day && borrowDate.getMonth() === month;

            days.push(
                <div
                    key={day}
                    className={`cursor-pointer flex justify-center items-center p-1 rounded-full text-sm ${
                        isSelected
                            ? "bg-blue-900 text-white"
                            : "hover:bg-blue-200 text-black"
                    }`}
                    onClick={() => handleDateClick(day)}
                >
                    {day}
                </div>
            );
        }
        return days;
    };

    return (
        <div className="bg-white p-4 rounded-2xl border border-blue-400 text-sm">
            <div className="flex justify-between items-center mb-2">
                <button onClick={() => changeMonth(-1)} className="text-blue-500 text-lg">
                    &lt;
                </button>
                <h2 className="font-semibold text-gray-700 text-sm">
                    {currentMonth.toLocaleString("default", { month: "long" })}{" "}
                    {currentMonth.getFullYear()}
                </h2>
                <button onClick={() => changeMonth(1)} className="text-blue-500 text-lg">
                    &gt;
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-gray-500 font-semibold text-xs">
                {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d) => (
                    <div key={d}>{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 mt-1">{renderCalendar()}</div>

            <p className="text-xs text-gray-600 mt-2">
                Tanggal Peminjaman: <span className="font-semibold">{borrowDate.toLocaleDateString()}</span>
            </p>

            <p className="text-xs text-gray-600">
                Tanggal Pengembalian: <span className="font-semibold">{returnDate.toLocaleDateString()}</span>
            </p>

            {lateDays > 0 && (
                <p className="text-xs text-red-600 font-semibold mt-2">
                    Terlambat {lateDays} hari — Denda: Rp {fine.toLocaleString()}
                </p>
            )}
        </div>
    );
}
