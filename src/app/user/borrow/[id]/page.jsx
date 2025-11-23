"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
    BookOpen, 
    User, 
    Building2, 
    Calendar, 
    CheckCircle, 
    ChevronLeft,
    ChevronRight,
    Loader2,
    Clock,
    X,
    AlertCircle
} from "lucide-react";

// Modal Component - Digabung dalam file yang sama
function ModalWaitingAdmin({
    show,
    onClose,
    book,
    borrowDate,
    returnDate,
    fine = 0
}) {
    if (!show || !book) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slideUp">

                {/* Header */}
                <div className="bg-blue-600 px-6 py-5 relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Status Icon with Animation */}
                            <div className="relative">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-white animate-pulse" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-blue-600 animate-bounce"></div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-white">Menunggu Konfirmasi</h2>
                                <p className="text-blue-100 text-sm">Permintaan sedang diproses</p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">

                    {/* Status Badge */}
                    <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-4">
                        <div className="flex gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <h3 className="font-semibold text-amber-900 text-sm mb-1">
                                    Menunggu Persetujuan Admin
                                </h3>
                                <p className="text-amber-700 text-xs leading-relaxed">
                                    Permintaan peminjaman Anda sedang ditinjau oleh admin perpustakaan. Anda akan mendapat notifikasi setelah disetujui.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Book Info Card */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                            Detail Peminjaman
                        </h3>
                        
                        <div className="flex gap-4 mb-4">
                            <div className="flex-shrink-0">
                                <img
                                    src={book.img ? `/buku/${book.img}` : "/api/placeholder/80/112"}
                                    alt={book.judul}
                                    className="w-20 h-28 object-cover rounded-lg shadow-md border border-gray-200"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
                                    {book.judul}
                                </h4>
                                <p className="text-xs text-gray-600 mb-1">{book.penulis}</p>
                                <p className="text-xs text-gray-500">{book.penerbit}</p>
                                
                                <div className="mt-3 inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                                    <CheckCircle className="w-3 h-3" />
                                    Tersedia
                                </div>
                            </div>
                        </div>

                        {/* Dates Info */}
                        <div className="space-y-2.5 pt-3 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 text-sm flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                    Tanggal Pinjam
                                </span>
                                <span className="font-semibold text-gray-900 text-sm">
                                    {new Date(borrowDate).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 text-sm flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-red-600" />
                                    Batas Kembali
                                </span>
                                <span className="font-semibold text-gray-900 text-sm">
                                    {new Date(returnDate).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </span>
                            </div>

                            {fine > 0 && (
                                <div className="flex items-center justify-between pt-2.5 border-t border-gray-200">
                                    <span className="text-red-600 font-medium text-sm">Denda Keterlambatan</span>
                                    <span className="font-bold text-red-600 text-base">
                                        Rp {fine.toLocaleString()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Timeline Steps */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Proses Peminjaman</h3>
                        <div className="space-y-3">
                            {/* Step 1 - Done */}
                            <div className="flex gap-3">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="w-0.5 h-8 bg-gray-300"></div>
                                </div>
                                <div className="flex-1 pb-2">
                                    <p className="font-semibold text-gray-900 text-sm">Permintaan Dikirim</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Berhasil mengajukan peminjaman</p>
                                </div>
                            </div>

                            {/* Step 2 - Current */}
                            <div className="flex gap-3">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                                        <Clock className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="w-0.5 h-8 bg-gray-300"></div>
                                </div>
                                <div className="flex-1 pb-2">
                                    <p className="font-semibold text-gray-900 text-sm">Menunggu Admin</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Sedang dalam proses verifikasi</p>
                                </div>
                            </div>

                            {/* Step 3 - Pending */}
                            <div className="flex gap-3">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-500 text-sm">Disetujui</p>
                                    <p className="text-xs text-gray-400 mt-0.5">Menunggu konfirmasi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-white hover:bg-gray-100 border-2 border-gray-300 text-gray-700 transition-all"
                    >
                        Tutup
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md hover:shadow-lg"
                    >
                        Mengerti
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn { 
                    from { opacity: 0; } 
                    to { opacity: 1; } 
                }
                @keyframes slideUp { 
                    from { opacity: 0; transform: translateY(20px); } 
                    to { opacity: 1; transform: translateY(0); } 
                }
                .animate-fadeIn { 
                    animation: fadeIn 0.2s ease-out; 
                }
                .animate-slideUp { 
                    animation: slideUp 0.3s ease-out; 
                }
            `}</style>
        </div>
    );
}

// Main Component
export default function BookDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    
    // Calendar state
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [borrowDate, setBorrowDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);

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
        console.log("🔵 Button clicked!"); // Debug log
        
        try {
            const userId = localStorage.getItem("userId");
            console.log("🔵 User ID:", userId); // Debug log
            
            if (!userId) {
                alert("Anda harus login terlebih dahulu");
                return;
            }

            if (!borrowDate || !returnDate) {
                alert("Silakan pilih tanggal peminjaman");
                return;
            }

            console.log("🔵 Sending request..."); // Debug log
            
            const res = await fetch("/api/peminjaman", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: parseInt(userId),
                    buku_id: parseInt(book.id),
                    tanggal_pinjam: borrowDate,
                    tanggal_kembali: returnDate,
                })
            });

            console.log("🔵 Response status:", res.status); // Debug log
            console.log("🔵 Response ok:", res.ok); // Debug log

            if (res.ok) {
                console.log("✅ Success! Showing modal..."); // Debug log
                setShowModal(true);
            } else {
                const text = await res.text();
                console.log("❌ Error response:", text); // Debug log
                alert(`Gagal mengajukan peminjaman (Status: ${res.status})`);
            }
        } catch (err) {
            console.error("❌ Error creating peminjaman:", err);
            alert("Terjadi kesalahan saat mengajukan peminjaman");
        }
    };

    // Calendar functions
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek };
    };

    const renderCalendar = () => {
        const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
        const days = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = borrowDate ? new Date(borrowDate) : null;

        // Empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(
                <div key={`empty-${i}`} className="h-10"></div>
            );
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            date.setHours(0, 0, 0, 0);
            const dateString = date.toISOString().split('T')[0];
            const isToday = date.getTime() === today.getTime();
            const isSelected = selectedDate && date.getTime() === selectedDate.getTime();
            const isPast = date < today;

            days.push(
                <button
                    key={day}
                    onClick={() => {
                        if (!isPast) {
                            setBorrowDate(dateString);
                            // Auto set return date (maksimal 20 hari dari tanggal pinjam)
                            const returnDate = new Date(date);
                            returnDate.setDate(returnDate.getDate() + 20);
                            setReturnDate(returnDate.toISOString().split('T')[0]);
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

    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

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
                    <div>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex gap-6">
                                
                                {/* Book Cover */}
                                <div className="flex-shrink-0">
                                    <div className="relative">
                                        <img
                                            src={book.img ? `/buku/${book.img}` : "/api/placeholder/200/300"}
                                            alt={book.judul}
                                            className="w-48 h-72 object-cover rounded-xl shadow-lg"
                                        />
                                        {/* Category Badge */}
                                        <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold">
                                            {book.kategori}
                                        </div>
                                    </div>
                                </div>

                                {/* Book Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start gap-2 mb-4">
                                        <BookOpen className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                                            {book.judul}
                                        </h1>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <User className="w-4 h-4" />
                                            <span className="text-sm">{book.penulis}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Building2 className="w-4 h-4" />
                                            <span className="text-sm">{book.penerbit} • {book.tahun_terbit}</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="mb-4">
                                        <h3 className="text-xs font-bold text-gray-700 mb-2 uppercase">Deskripsi</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {book.deskripsi}
                                        </p>
                                    </div>

                                    {/* Stock Status */}
                                    <div className="flex gap-3 mt-6">
                                        <div className="bg-blue-600 rounded-xl px-5 py-3 text-center">
                                            <p className="text-white text-xs font-medium mb-1">Stok Tersedia</p>
                                            <p className="text-white text-4xl font-bold">{book.stok}</p>
                                        </div>
                                        
                                        <div className="bg-green-50 border-2 border-green-300 rounded-xl px-5 py-3 flex items-center justify-center flex-1">
                                            <div className="text-center">
                                                <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
                                                <p className="text-green-700 text-sm font-bold">Tersedia</p>
                                                <p className="text-green-600 text-xs">Siap Dipinjam</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Calendar */}
                    <div>
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

                        </div>
                    </div>
                </div>

                {/* Bottom Section - Selected Dates & Submit Button */}
                <div className="mt-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-5 text-center">Konfirmasi Peminjaman</h3>
                        
                        {/* Info Alert */}
                        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-5 max-w-3xl mx-auto">
                            <div className="flex gap-3">
                                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm text-blue-900 font-semibold mb-1">Perhatian</p>
                                    <p className="text-xs text-blue-800 leading-relaxed">
                                        Masa peminjaman maksimal <span className="font-bold">20 hari</span>. 
                                        Keterlambatan pengembalian akan dikenakan denda <span className="font-bold">Rp 5.000 per hari</span>. 
                                        Mohon kembalikan buku tepat waktu.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-5 mb-6 max-w-3xl mx-auto">
                            {/* Tanggal Peminjaman */}
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="bg-blue-600 p-2 rounded-lg">
                                        <Calendar className="w-4 h-4 text-white" />
                                    </div>
                                    <p className="text-sm font-bold text-blue-900">Tanggal Peminjaman</p>
                                </div>
                                <p className="text-xl font-bold text-gray-900">
                                    {borrowDate ? new Date(borrowDate).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    }) : '-'}
                                </p>
                            </div>
                            
                            {/* Tanggal Pengembalian */}
                            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="bg-green-600 p-2 rounded-lg">
                                        <Calendar className="w-4 h-4 text-white" />
                                    </div>
                                    <p className="text-sm font-bold text-green-900">Tanggal Pengembalian</p>
                                </div>
                                <p className="text-xl font-bold text-gray-900">
                                    {returnDate ? new Date(returnDate).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    }) : '-'}
                                </p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="max-w-xl mx-auto">
                            <button
                                onClick={handleAjukanPeminjaman}
                                disabled={!borrowDate || book.stok === 0}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                            >
                                <BookOpen className="w-6 h-6" />
                                Ajukan Peminjaman Buku
                            </button>

                            {book.stok === 0 && (
                                <p className="text-center text-red-600 text-sm mt-3 font-medium">
                                    Maaf, buku ini sedang tidak tersedia untuk dipinjam
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal - PENTING: Pastikan ini di-render */}
            {console.log("🔵 Rendering modal, showModal:", showModal)}
            <ModalWaitingAdmin
                show={showModal}
                onClose={() => {
                    console.log("🔵 Closing modal");
                    setShowModal(false);
                }}
                book={book}
                borrowDate={borrowDate}
                returnDate={returnDate}
            />
        </div>
    );
}