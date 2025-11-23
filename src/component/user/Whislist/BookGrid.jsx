import Link from "next/link";
import BookCard from "../../../component/user/Whislist/BookCard";

export default function BookGrid({ wishlistBooks, onRemove }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        Koleksi Favorit Anda
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Total {wishlistBooks.length} buku dalam wishlist
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistBooks.map((book) => (
                    <Link key={book.wishlist_id} href={`/user/detail/${book.buku_id}`}>
                        <BookCard book={book} onRemove={onRemove} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
