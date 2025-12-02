import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export default function DateCalendar({ 
    currentMonth, 
    setCurrentMonth, 
    borrowDate, 
    setBorrowDate, 
    setReturnDate 
}) {
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek };
    };

    // Helper function untuk mendapatkan tanggal lokal tanpa timezone issue
    const getLocalDateString = (year, month, day) => {
        const date = new Date(year, month, day);
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - (offset * 60 * 1000));
        return localDate.toISOString().split('T')[0];
    };

    const renderCalendar = () => {
        const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
        const days = [];
        
        // Ambil tanggal hari ini dalam format lokal
        const now = new Date();
        const todayString = getLocalDateString(now.getFullYear(), now.getMonth(), now.getDate());
        
        // Parse selected date
        const selectedDateString = borrowDate;

        // Empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(
                <div key={`empty-${i}`} className="h-10"></div>
            );
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = getLocalDateString(
                currentMonth.getFullYear(), 
                currentMonth.getMonth(), 
                day
            );
            
            const isToday = dateString === todayString;
            const isSelected = dateString === selectedDateString;
            const isPast = dateString < todayString;

            days.push(
                <button
                    key={day}
                    onClick={() => {
                        if (!isPast) {
                            setBorrowDate(dateString);
                            
                            // Auto set return date (14 hari dari tanggal pinjam)
                            const borrowDateObj = new Date(dateString + 'T00:00:00');
                            const returnDateObj = new Date(borrowDateObj);
                            returnDateObj.setDate(returnDateObj.getDate() + 1);
                            
                            const returnDateString = getLocalDateString(
                                returnDateObj.getFullYear(),
                                returnDateObj.getMonth(),
                                returnDateObj.getDate()
                            );
                            
                            setReturnDate(returnDateString);
                        }
                    }}
                    disabled={isPast}
                    className={`h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all
                        ${isSelected 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : isPast
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
                        }
                        ${isToday && !isSelected ? 'ring-2 ring-blue-400' : ''}
                    `}
                >
                    {day}
                </button>
            );
        }

        return days;
    };

    const changeMonth = (direction) => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(currentMonth.getMonth() + direction);
        setCurrentMonth(newMonth);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            
            <div className="flex items-center gap-2 mb-5">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">Pilih Tanggal</h3>
            </div>

            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={() => changeMonth(-1)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                
                <h4 className="text-base font-bold text-gray-900">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h4>
                
                <button
                    onClick={() => changeMonth(1)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            {/* Calendar Grid */}
            <div className="mb-5">
                {/* Day names */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                        <div key={day} className="h-8 flex items-center justify-center text-xs font-semibold text-gray-500">
                            {day}
                        </div>
                    ))}
                </div>
                
                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-1">
                    {renderCalendar()}
                </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
                <p className="font-medium">💡 Maksimal peminjaman 14 hari</p>
                <p className="text-xs mt-1 text-blue-600">
                    Tanggal pengembalian otomatis diatur 14 hari setelah tanggal pinjam
                </p>
            </div>
        </div>
    );
}