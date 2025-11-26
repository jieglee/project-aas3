"use client";

import { Search } from "lucide-react";

export default function SearchBuku({ query = "", setQuery }) {
    return (
        <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
                type="text"
                placeholder="Cari buku..."
                value={query || ""} // pastikan selalu string
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg text-gray-700 border border-gray-300 
                text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
        </div>
    );
}
