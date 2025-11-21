"use client";
import { Search } from "lucide-react";

export default function SearchBar({ searchQuery, setSearchQuery }) {
    return (
        <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Cari judul buku, penulis, atau kategori..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all shadow-sm"
                />
            </div>
        </div>
    );
}