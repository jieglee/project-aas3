"use client";

import { Plus } from "lucide-react";
import SearchBuku from "./SearchBuku";

export default function KelolaBukuHeader({ query, setQuery, onAdd }) {
    return (
        <div className="bg-white p-5 rounded-xl shadow-sm border">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold text-black">Kelola Buku</h1>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                        Manajemen data buku perpustakaan
                    </p>
                </div>

                {/* OPEN MODAL */}
                <button
                    onClick={onAdd}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
                >
                    <Plus className="w-5 h-5" /> Tambah Buku
                </button>
            </div>


            <div className="mt-4">
                <SearchBuku query={query} setQuery={setQuery} />
            </div>
        </div>
    );
}
