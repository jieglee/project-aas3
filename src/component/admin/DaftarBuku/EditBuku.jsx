"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function EditBuku({ book, fetchBooks, closeModal }) {
    if (!book) return null; // ⛔ cegah error sebelum state siap

    const [form, setForm] = useState({
        img: book.img || "",
        judul: book.judul || "",
        penulis: book.penulis || "",
        deskripsi: book.deskripsi || "",
        penerbit: book.penerbit || "",
        tahun_terbit: book.tahun_terbit || "",
        stok: book.stok || "",
        kategori: book.kategori || "",
    });


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`/api/buku/${book.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            toast.success("Buku berhasil diupdate!");
            fetchBooks();
            closeModal();
        } else {
            toast.error("Gagal update buku!");
        }
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit Buku</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                
                <input
                    name="judul"
                    value={form.judul}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    placeholder="Judul Buku"
                />

                <input
                    name="penulis"
                    value={form.penulis}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    placeholder="Penulis"
                />

                <textarea
                    name="deskripsi"
                    value={form.deskripsi}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    placeholder="Deskripsi"
                />

                <input
                    name="penerbit"
                    value={form.penerbit}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    placeholder="Penerbit"
                />

                <input
                    name="tahun_terbit"
                    value={form.tahun_terbit}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    placeholder="Tahun Terbit"
                />

                <input
                    name="stok"
                    value={form.stok}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    placeholder="Stok"
                />

                <input
                    name="kategori"
                    value={form.kategori}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    placeholder="Kategori"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Simpan Perubahan
                </button>
            </form>
        </div>
    );
}
