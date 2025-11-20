"use client";
import { useState, useEffect } from "react";

export default function UserModal({ isOpen, onClose, fetchUsers, editData }) {
    const [form, setForm] = useState({
        nama: "",
        email: "",
        phone: "",
        role: "user",
    });

    useEffect(() => {
        if (editData) setForm(editData);
    }, [editData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = editData ? "PUT" : "POST";
        const url = editData ? `/api/users/${editData.id}` : "/api/users";

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        fetchUsers();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
                <h2 className="text-lg font-semibold mb-4">
                    {editData ? "Edit User" : "Tambah User"}
                </h2>

                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nama"
                        className="border px-3 py-2 rounded"
                        value={form.nama}
                        onChange={(e) => setForm({ ...form, nama: e.target.value })}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="border px-3 py-2 rounded"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Phone"
                        className="border px-3 py-2 rounded"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        required
                    />

                    <select
                        className="border px-3 py-2 rounded"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-3 py-2 bg-gray-200 rounded"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-3 py-2 bg-blue-600 text-white rounded"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
