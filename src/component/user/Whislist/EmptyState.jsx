import { Heart, Sparkles, Search, BookOpen } from "lucide-react";
import Link from "next/link";

export default function EmptyState() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-300 p-16 text-center">
            <div className="max-w-md mx-auto">

                <div className="relative inline-block mb-6">
                    <div className="bg-gray-100 rounded-full p-8">
                        <Heart className="w-16 h-16 text-gray-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-2">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Wishlist Masih Kosong
                </h3>
                <p className="text-gray-500 text-base mb-8">
                    Tambahkan buku favorit Anda untuk memudahkan tracking
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/user/katalog">
                        <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                            <Search className="w-5 h-5" />
                            Jelajahi Katalog
                        </button>
                    </Link>

                    <Link href="/user/home">
                        <button className="w-full sm:w-auto bg-white text-gray-700 border-2 border-gray-300 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            Kembali ke Beranda
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
}
