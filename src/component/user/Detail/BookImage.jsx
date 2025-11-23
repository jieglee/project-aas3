"use client";

export default function BookImage({ book }) {
    // Handle berbagai format gambar
    const getImageSrc = () => {
        if (!book.img) {
            return "/placeholder.png";
        }
        
        // Jika sudah URL lengkap (https:// atau http://)
        if (book.img.startsWith('http://') || book.img.startsWith('https://')) {
            return book.img;
        }
        
        // Jika path relatif (mulai dengan /)
        if (book.img.startsWith('/')) {
            return book.img;
        }
        
        // Jika hanya nama file, tambahkan prefix /buku/
        return `/buku/${book.img}`;
    };

    const imgSrc = getImageSrc();

    return (
        <div className="flex items-center justify-center">
            <div className="relative">
                <img
                    src={imgSrc}
                    alt={book.judul}
                    className="rounded-lg shadow-md w-full max-w-xs h-auto object-cover"
                    onError={(e) => {
                        // Fallback jika gambar error
                        e.target.src = '/placeholder.png';
                        e.target.onerror = null; // Prevent infinite loop
                    }}
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