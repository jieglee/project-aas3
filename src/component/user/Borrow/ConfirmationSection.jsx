import { Calendar, BookOpen } from "lucide-react";
import InfoAlert from "../../../component/user/Borrow/InfoAlert";

export default function ConfirmationSection({ 
    borrowDate, 
    returnDate, 
    book, 
    handleAjukanPeminjaman 
}) {
    return (
        <div className="mt-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-5 text-center">Konfirmasi Peminjaman</h3>
                
                <InfoAlert />
                
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
    );
}