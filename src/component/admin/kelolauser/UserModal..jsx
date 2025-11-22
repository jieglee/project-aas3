"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function UserModal({ isOpen, onClose, fetchUsers, editData }) {
    const [form, setForm] = useState({
        nipd: "",
        nama: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        if (editData) {
            setForm({
                nipd: editData.nipd || "",
                nama: editData.nama || "",
                email: editData.email || "",
                password: "",
            });
        } else {
            setForm({
                nipd: "",
                nama: "",
                email: "",
                password: "",
            });
        }
    }, [editData]);

    const handleSubmit = async () => {
        const method = editData ? "PUT" : "POST";
        const url = editData ? `/api/users/${editData.id}` : "/api/users";

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        fetchUsers();
        setForm({ nipd: "", nama: "", email: "", password: "" });
        onClose();
    };

    const handleClose = () => {
        setForm({ nipd: "", nama: "", email: "", password: "" });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">
                        Tambah User Baru
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-6 space-y-4">
                    {/* NIPD Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            NIPD <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Masukkan NIPD"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            value={form.nipd}
                            onChange={(e) => setForm({ ...form, nipd: e.target.value })}
                        />
                    </div>

                    {/* Nama Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Nama <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Masukkan nama lengkap"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            value={form.nama}
                            onChange={(e) => setForm({ ...form, nama: e.target.value })}
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Masukkan email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Masukkan password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition shadow-md"
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}