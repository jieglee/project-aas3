"use client";

export default function BookInfo({ book }) {
    if (!book) return null;

    return (
        <div className="space-y-3">
            <h1 className="text-2xl font-bold text-gray-800">{book.judul}</h1>
            <p className="text-gray-700 text-sm">
                <span className="font-semibold">Penulis:</span> {book.penulis}
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">{book.deskripsi}</p>
            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                <p><span className="font-semibold">Penerbit:</span> {book.penerbit}</p>
                <p><span className="font-semibold">Tahun Terbit:</span> {book.tahun_terbit}</p>
                <p><span className="font-semibold">Stok:</span> {book.stok}</p>
                <p><span className="font-semibold">Kategori:</span> {book.kategori}</p>
            </div>
        </div>
    );
}
