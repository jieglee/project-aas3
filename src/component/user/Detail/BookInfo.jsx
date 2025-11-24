"use client";

export default function BookInfo({ book }) {
    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {book?.judul || "Judul Tidak Tersedia"}
                </h1>
                <p className="text-lg text-gray-600">
                    oleh <span className="font-medium text-gray-800">{book?.penulis || "-"}</span>
                </p>
            </div>

            <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {book?.kategori || "Uncategorized"}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    book?.stok > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                }`}>
                    {book?.stok > 0 ? 'Tersedia' : 'Habis'}
                </span>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-600">Penerbit</span>
                    <span className="font-medium text-gray-900">{book?.penerbit || "-"}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Tahun Terbit</span>
                    <span className="font-medium text-gray-900">{book?.tahun_terbit || "-"}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Stok Tersedia</span>
                    <span className="font-bold text-blue-600">{book?.stok || 0} Buku</span>
                </div>
            </div>

            {book?.deskripsi && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi</h3>
                    <p className="text-gray-700 leading-relaxed">
                        {book.deskripsi}
                    </p>
                </div>
            )}
        </div>
    );
}