import { BookOpen } from "lucide-react";

export default function BookCard({ book }) {
    const getImageSrc = () => {
        if (!book.img) {
            return "/api/placeholder/200/280";
        }
        
        if (book.img.startsWith('http://') || book.img.startsWith('https://')) {
            return book.img;
        }
        
        if (book.img.startsWith('/')) {
            return book.img;
        }
        
        return `/buku/${book.img}`;
    };

    const imgSrc = getImageSrc();
    const kategori = book.kategori || "Tanpa Kategori";
    const stok = book.stok ?? 0;
    const penerbit = book.penerbit || "-";

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            {/* Image with overlay */}
            <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                    src={imgSrc}
                    alt={book.judul}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                        e.target.src = '/api/placeholder/200/280';
                        e.target.onerror = null;
                    }}
                />
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category badge */}
                <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                    {kategori}
                </div>

                {/* Stock indicator */}
                {stok === 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
                            Stok Habis
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 min-h-[3rem] group-hover:text-blue-600 transition-colors">
                    {book.judul || "-"}
                </h3>
                
                <p className="text-gray-500 text-sm mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span className="line-clamp-1">{book.penulis || "-"}</span>
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{penerbit}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        stok > 0 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-red-100 text-red-700'
                    }`}>
                        {stok > 0 ? `Stok: ${stok}` : 'Habis'}
                    </span>
                </div>
            </div>
        </div>
    );
}