"use client";

export default function BookInfo({ book }) {
    if (!book) return <p>Loading...</p>;

    return (
        <div className="space-y-6 flex-1">
            
            <div>
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    {book.kategori || "Umum"}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {book.judul}
                </h1>
                <p className="text-gray-600 text-base">
                    oleh <span className="font-semibold">{book.penulis}</span>
                </p>
            </div>

            <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Deskripsi</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                    {book.deskripsi || "Tidak ada deskripsi tersedia."}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Penerbit</p>
                    <p className="text-sm font-semibold text-gray-900">{book.penerbit}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Tahun Terbit</p>
                    <p className="text-sm font-semibold text-gray-900">{book.tahun_terbit}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Stok</p>
                    <p className="text-sm font-semibold text-gray-900">{book.stok} buku</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Kategori</p>
                    <p className="text-sm font-semibold text-gray-900">{book.kategori}</p>
                </div>
            </div>
        </div>
    );
}