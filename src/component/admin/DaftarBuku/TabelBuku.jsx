"use client";
import Image from "next/image";

export default function TabelBuku({ books, fetchBooks }) {
  const handleDelete = async (id) => {
    if (confirm("Apakah yakin ingin menghapus buku ini?")) {
      await fetch(`/api/buku/${id}`, { method: "DELETE" });
      fetchBooks();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Daftar Buku Saat Ini</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition relative"
          >
            {book.img && (
              <div className="relative w-full h-48">
                <Image
                  src={`/images/buku/${book.img}`}
                  alt={book.judul}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h4 className="font-semibold text-[#1E3A8A]">{book.judul}</h4>
              <p className="text-gray-600 text-sm mb-1">Pengarang: {book.penulis}</p>
              <p className="text-gray-600 text-sm mb-1">Penerbit: {book.penerbit}</p>
              <p className="text-gray-600 text-sm mb-1">Tahun: {book.tahun_terbit}</p>
              <p className="text-gray-600 text-sm mb-1">Stok: {book.stok}</p>
              <p className="text-gray-600 text-sm mb-2">Kategori: {book.kategori}</p>
              <div className="flex gap-2">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-sm">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
