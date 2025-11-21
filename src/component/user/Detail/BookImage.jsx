"use client";

export default function BookImage({ book }) {
    return (
        <div className="flex items-center justify-center">
            <div className="relative">
                <img
                    src={book.img ? `/buku/${book.img}` : "/placeholder.png"}
                    alt={book.judul}
                    className="rounded-lg shadow-md w-full max-w-xs h-auto object-cover"
                />
                
                {book.stok === 0 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                        Habis
                    </div>
                )}
                
                {book.stok > 0 && book.stok <= 3 && (
                    <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                        Stok Terbatas
                    </div>
                )}
            </div>
        </div>
    );
}