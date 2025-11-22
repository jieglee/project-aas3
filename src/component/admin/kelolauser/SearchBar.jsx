"use client";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm, onSearch]);

    return (
        <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari user..."
                className="w-full border border-gray-300 px-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>
    );
}
