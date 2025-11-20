export default function BookInfo({ book }) {
    return (
        <div className="border border-gray-300 p-4 rounded-xl shadow-md mb-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-3">
                Buku yang Dipinjam
            </h2>

            <div className="flex gap-4">
                <img
                    src={book.img}
                    alt={book.judul}
                    className="w-28 h-36 object-cover rounded-lg"
                />
                <div>
                    <p className="font-bold text-lg">{book.judul}</p>
                    <p className="text-gray-600">Penulis: {book.penulis}</p>
                    <p className="text-gray-600">Penerbit: {book.penerbit}</p>
                    <p className="text-gray-600">Tahun: {book.tahun_terbit}</p>
                </div>
            </div>
        </div>
    );
}
