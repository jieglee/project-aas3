"use client";

import { useState, useEffect } from "react";
import { X, Upload, BookOpen, User, Building, Calendar, Tag, Package, FileText } from "lucide-react";

export default function ModalEditBuku({ book, close, refresh }) {
    const [formData, setFormData] = useState({
        img: "",
        judul: "",
        penulis: "",
        penerbit: "",
        tahun_terbit: "",
        kategori: "",
        stok: 0,
        deskripsi: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Set initial data from book prop
    useEffect(() => {
        if (book) {
            setFormData({
                img: book.img || "",
                judul: book.judul || "",
                penulis: book.penulis || "",
                penerbit: book.penerbit || "",
                tahun_terbit: book.tahun_terbit || "",
                kategori: book.kategori || "",
                stok: book.stok || 0,
                deskripsi: book.deskripsi || ""
            });
        }
    }, [book]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.judul.trim()) newErrors.judul = "Judul wajib diisi";
        if (!formData.penulis.trim()) newErrors.penulis = "Penulis wajib diisi";
        if (!formData.penerbit.trim()) newErrors.penerbit = "Penerbit wajib diisi";
        if (!formData.tahun_terbit) newErrors.tahun_terbit = "Tahun wajib diisi";
        else if (formData.tahun_terbit < 1900 || formData.tahun_terbit > 2100)
            newErrors.tahun_terbit = "Tahun harus 1900-2100";
        if (!formData.kategori) newErrors.kategori = "Kategori wajib dipilih";
        if (!formData.deskripsi.trim()) newErrors.deskripsi = "Deskripsi wajib diisi";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            alert("Lengkapi semua field wajib!");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`/api/buku/${book.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message || "Buku berhasil diupdate!");
                refresh();
                close();
            } else {
                alert(data.error || "Gagal mengupdate buku");
            }
        } catch (err) {
            console.error(err);
            alert("Terjadi kesalahan!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-hidden animate-slideUp">
                
                {/* Header */}
                <div className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-600 px-4 py-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                                <BookOpen className="text-white" size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Edit Buku</h2>
                                <p className="text-yellow-100 text-xs mt-1">Ubah informasi buku</p>
                            </div>
                        </div>
                        <button onClick={close} className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-all">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className="p-4 overflow-y-auto max-h-[calc(85vh-120px)] custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Cover */}
                        <div className="md:col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Buku</label>
                            <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-xl border-2 border-dashed border-yellow-300 overflow-hidden group hover:border-yellow-500 transition-all">
                                {formData.img ? (
                                    <img 
                                        src={formData.img} 
                                        alt="Cover" 
                                        className="w-full h-full object-cover" 
                                        onError={(e)=>{
                                            e.target.src='/api/placeholder/300/400';
                                        }}
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-yellow-400 text-xs">
                                        <Upload size={30} className="mb-1" />
                                        Preview
                                    </div>
                                )}
                            </div>
                            <input
                                type="text"
                                name="img"
                                value={formData.img}
                                onChange={handleChange}
                                placeholder="URL cover"
                                className="w-full mt-2 pl-8 pr-2 py-1.5 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                            />
                        </div>

                        {/* Fields */}
                        <div className="md:col-span-2 space-y-3">
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Judul *</label>
                                <div className="relative">
                                    <BookOpen className="absolute left-2.5 top-2.5 text-gray-400 w-4 h-4" />
                                    <input 
                                        type="text" 
                                        name="judul" 
                                        value={formData.judul} 
                                        onChange={handleChange}
                                        placeholder="Judul buku"
                                        className="w-full pl-9 pr-2 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Penulis *</label>
                                    <div className="relative">
                                        <User className="absolute left-2.5 top-2.5 text-gray-400 w-4 h-4" />
                                        <input 
                                            type="text" 
                                            name="penulis" 
                                            value={formData.penulis} 
                                            onChange={handleChange}
                                            placeholder="Penulis"
                                            className="w-full pl-9 pr-2 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Penerbit *</label>
                                    <div className="relative">
                                        <Building className="absolute left-2.5 top-2.5 text-gray-400 w-4 h-4" />
                                        <input 
                                            type="text" 
                                            name="penerbit" 
                                            value={formData.penerbit} 
                                            onChange={handleChange}
                                            placeholder="Penerbit"
                                            className="w-full pl-9 pr-2 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tahun *</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-2.5 top-2.5 text-gray-400 w-4 h-4" />
                                        <input 
                                            type="number" 
                                            name="tahun_terbit" 
                                            value={formData.tahun_terbit} 
                                            onChange={handleChange} 
                                            placeholder="2024"
                                            min="1900" 
                                            max="2100"
                                            className="w-full pl-9 pr-2 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori *</label>
                                    <select 
                                        name="kategori" 
                                        value={formData.kategori} 
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-2 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                                    >
                                        <option value="">Pilih</option>
                                        <option value="Fiksi">Fiksi</option>
                                        <option value="Nonfiksi">Nonfiksi</option>
                                        <option value="Pendidikan">Pendidikan</option>
                                        <option value="Komik">Komik</option>
                                    </select>
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Stok</label>
                                    <div className="relative">
                                        <Package className="absolute left-2.5 top-2.5 text-gray-400 w-4 h-4" />
                                        <input 
                                            type="number" 
                                            name="stok" 
                                            value={formData.stok} 
                                            onChange={handleChange} 
                                            placeholder="0"
                                            min="0" 
                                            className="w-full pl-9 pr-2 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi *</label>
                                <div className="relative">
                                    <FileText className="absolute left-2.5 top-2.5 text-gray-400 w-4 h-4" />
                                    <textarea 
                                        name="deskripsi" 
                                        value={formData.deskripsi} 
                                        onChange={handleChange} 
                                        rows="3"
                                        placeholder="Deskripsi singkat..."
                                        className="w-full pl-9 pr-2 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none resize-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-4 py-3 flex items-center justify-end gap-2 border-t border-gray-200 rounded-b-2xl">
                    <button 
                        onClick={close} 
                        disabled={loading} 
                        className="px-4 py-2 text-gray-700 bg-white border rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50"
                    >
                        Batal
                    </button>
                    <button 
                        onClick={handleSubmit} 
                        disabled={loading} 
                        className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg text-sm flex items-center gap-1 hover:from-yellow-600 hover:to-orange-700 disabled:opacity-50"
                    >
                        {loading ? "Menyimpan..." : "Update Buku"}
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity:0; transform:translateY(20px);} to{opacity:1; transform:translateY(0);} }
                .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
                .animate-slideUp { animation: slideUp 0.3s ease-out; }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background:#f1f1f1; border-radius:10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background:#cbd5e1; border-radius:10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background:#94a3b8; }
            `}</style>
        </div>
    );
}