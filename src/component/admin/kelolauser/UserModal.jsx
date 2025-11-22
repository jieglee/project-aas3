"use client";
import { useState, useEffect } from "react";
import { X, User, Mail, Phone, Lock, School } from "lucide-react";

export default function UserModal({ isOpen, onClose, fetchUsers, editData }) {
    const [form, setForm] = useState({
        nama: "",
        kelas: "",
        email: "",
        phone: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editData) {
            setForm({ ...editData, password: "" }); // password kosong saat edit
        } else {
            setForm({
                nama: "",
                kelas: "",
                email: "",
                phone: "",
                password: "",
            });
        }
        setErrors({});
    }, [editData, isOpen]);

    const validateForm = () => {
        const newErrors = {};
        if (!form.nama.trim()) newErrors.nama = "Nama wajib diisi";
        if (!form.email.trim()) {
            newErrors.email = "Email wajib diisi";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Format email tidak valid";
        }
        if (!editData && !form.password) {
            newErrors.password = "Password wajib diisi";
        } else if (form.password && form.password.length < 6) {
            newErrors.password = "Password minimal 6 karakter";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const method = editData ? "PUT" : "POST";
        const url = editData ? `/api/users/${editData.id}` : "/api/users";

        setLoading(true);
        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                alert(data.message || "User berhasil disimpan!");
                fetchUsers();
                handleClose();
            } else {
                alert(data.error || "Terjadi kesalahan");
            }
        } catch (err) {
            alert("Terjadi kesalahan saat menyimpan user");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setForm({
            nama: "",
            kelas: "",
            email: "",
            phone: "",
            password: "",
        });
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative transform transition-all animate-slideUp">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 rounded-t-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    {editData ? "Edit User" : "Tambah User Baru"}
                                </h2>
                                <p className="text-blue-100 text-sm mt-1">
                                    {editData ? "Perbarui informasi pengguna" : "Isi formulir untuk menambahkan pengguna"}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className="p-6 space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar">
                    {/* Nama */}
                    <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Nama Lengkap <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                <User className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Masukkan nama lengkap"
                                value={form.nama}
                                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                                className={`w-full pl-11 pr-4 py-3 border-2 ${
                                    errors.nama ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
                                } rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all`}
                            />
                        </div>
                        {errors.nama && <p className="text-red-500 text-xs mt-1.5">{errors.nama}</p>}
                    </div>

                    {/* Kelas */}
                    <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Kelas</label>
                        <div className="relative">
                            <div className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                <School className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Contoh: XII IPA 1"
                                value={form.kelas}
                                onChange={(e) => setForm({ ...form, kelas: e.target.value })}
                                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                placeholder="contoh@email.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className={`w-full pl-11 pr-4 py-3 border-2 ${
                                    errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
                                } rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all`}
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">No. Telepon</label>
                        <div className="relative">
                            <div className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                <Phone className="w-5 h-5" />
                            </div>
                            <input
                                type="tel"
                                placeholder="08123456789"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password {!editData && <span className="text-red-500">*</span>}
                            {editData && (
                                <span className="text-gray-500 text-xs font-normal ml-2">
                                    (Kosongkan jika tidak ingin mengubah)
                                </span>
                            )}
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                placeholder="Minimal 6 karakter"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className={`w-full pl-11 pr-4 py-3 border-2 ${
                                    errors.password ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
                                } rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all`}
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-6 bg-gray-50 rounded-b-2xl border-t border-gray-200">
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={loading}
                        className="px-6 py-3 text-gray-700 bg-white hover:bg-gray-100 border-2 border-gray-300 rounded-xl font-medium transition-all shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            "Simpan"
                        )}
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
                .animate-slideUp { animation: slideUp 0.3s ease-out; }
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
            `}</style>
        </div>
    );
}
