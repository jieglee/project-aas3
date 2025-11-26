import { BookOpen, User, Building2, CheckCircle, AlertCircle } from "lucide-react";

export default function BookInfo({ book, getBookImageUrl }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex gap-6">
                
                {/* Book Cover */}
                <div className="flex-shrink-0">
                    <div className="relative">
                        <img
                            src={getBookImageUrl(book.img)}
                            alt={book.judul}
                            className="w-48 h-72 object-cover rounded-xl shadow-lg"
                            onError={(e) => {
                                e.target.src = "/api/placeholder/200/300";
                            }}
                        />
                        {/* Category Badge */}
                        {book.kategori && (
                            <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold">
                                {book.kategori}
                            </div>
                        )}
                        
                        {/* Stock Badge */}
                        <div className="absolute bottom-3 left-3 right-3">
                            <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-gray-700">Stok Tersedia</span>
                                    <span className="text-lg font-bold text-blue-600">{book.stok || 0}</span>
                                </div>
                            </div>
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
                        {book.stok > 0 ? (
                            <div className="bg-green-50 border-2 border-green-300 rounded-xl px-5 py-3 flex items-center justify-center flex-1">
                                <div className="text-center">
                                    <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
                                    <p className="text-green-700 text-sm font-bold">Tersedia</p>
                                    <p className="text-green-600 text-xs">Siap Dipinjam</p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-red-50 border-2 border-red-300 rounded-xl px-5 py-3 flex items-center justify-center flex-1">
                                <div className="text-center">
                                    <AlertCircle className="w-6 h-6 text-red-600 mx-auto mb-1" />
                                    <p className="text-red-700 text-sm font-bold">Tidak Tersedia</p>
                                    <p className="text-red-600 text-xs">Stok Habis</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}