import Link from "next/link";
import { Library } from "lucide-react";
import BookCard from "../../../component/user/Home/BookCard";

export default function NewBooksSection({ newBooks }) {
    return (
        <section className="w-full mt-12 pb-12">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">Koleksi Terbaru</h2>
                    <p className="text-gray-500">Buku yang baru saja ditambahkan ke perpustakaan</p>
                </div>
                <Link href="/user/katalog">
                    <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-xl transition-all">
                        Selengkapnya
                        <Library className="w-4 h-4" />
                    </button>
                </Link>
            </div>

            {newBooks.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-md border-2 border-dashed border-gray-200">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                        <Library className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Koleksi Segera Hadir
                    </h3>
                    <p className="text-gray-500">
                        Kami sedang menambahkan buku-buku baru untuk Anda
                    </p>
                </div>
            ) : (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {newBooks.map((book) => (
                        <Link key={book.id} href={`/user/detail/${book.id}`} className="block">
                            <BookCard book={book} />
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}