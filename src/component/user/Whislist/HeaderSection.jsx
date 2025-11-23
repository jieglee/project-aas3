import { Heart } from "lucide-react";

export default function HeaderSection({ wishlistCount }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-red-100 p-3 rounded-xl">
                            <Heart className="w-8 h-8 text-red-600 fill-red-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Wishlist Saya
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">
                                Koleksi buku favorit yang ingin Anda baca
                            </p>
                        </div>
                    </div>
                </div>

                {wishlistCount > 0 && (
                    <div className="bg-blue-50 border border-blue-200 px-6 py-4 rounded-xl text-center">
                        <p className="text-3xl font-bold text-blue-600">
                            {wishlistCount}
                        </p>
                        <p className="text-sm text-gray-600 font-medium">
                            Buku Favorit
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}
