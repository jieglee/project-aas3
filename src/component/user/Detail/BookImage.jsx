"use client";

export default function BookImage({ book }) {
    // Handle berbagai format gambar
    const getImageSrc = () => {
        if (!book?.img) {
            return '/placeholder.png';
        }
        
        // Jika sudah URL lengkap (https:// atau http://)
        if (book.img.startsWith('http://') || book.img.startsWith('https://')) {
            return book.img;
        }
        
        // Jika path relatif (mulai dengan /)
        if (book.img.startsWith('/')) {
            return book.img;
        }
        
        // Jika hanya nama file, tambahkan prefix /images/books/
        return `/images/books/${book.img}`;
    };

    const imgSrc = getImageSrc();

    return (
        <div className="flex items-center justify-center">
            <div className="relative">
                <img
                    src={imgSrc}
                    alt={book?.judul || "Book cover"}
                    className="rounded-lg shadow-md w-full max-w-xs h-auto object-cover"
                    onError={(e) => {
                        // Fallback jika gambar error
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="400"%3E%3Crect fill="%23e5e7eb" width="300" height="400"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%239ca3af" font-size="18" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                    }}
                />
                
                {book?.stok === 0 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                        Habis
                    </div>
                )}
                
                {book?.stok > 0 && book?.stok <= 3 && (
                    <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                        Stok Terbatas
                    </div>
                )}
            </div>
        </div>
    );
}