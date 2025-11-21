"use client";

import { useEffect, useState } from "react";
import HeaderKelolaBuku from "../../../component/admin/kelolabuku/HeaderKelolaBuku";
import TabelBuku from "../../../component/admin/kelolabuku/TabelBuku";

export default function KelolaBukuPage() {
    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState("");

    const fetchBooks = async () => {
        try {
            const res = await fetch("/api/buku", { cache: "no-store" });
            const data = await res.json();
            setBooks(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const filteredBooks = books.filter((b) =>
        b.judul?.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            {/* HEADER PUTIH + SEARCH */}
            <HeaderKelolaBuku query={query} setQuery={setQuery} />

            {/* TABLE */}
            <TabelBuku books={filteredBooks} reload={fetchBooks} />
        </div>
    );
}
