"use client";
import { useEffect, useState } from "react";
import EditBuku from "../../../component/admin/DaftarBuku/EditBuku";
import TabelBuku from "../../../component/admin/DaftarBuku/TabelBuku";

export default function DaftarBukuPage() {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const res = await fetch("/api/buku");
        const data = await res.json();
        setBooks(data);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">Daftar Buku</h2>
            <EditBuku fetchBooks={fetchBooks}   />
            <TabelBuku books={books} fetchBooks={fetchBooks} />
        </div>
    );
}
