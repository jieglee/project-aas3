"use client";

import Modal from "../../modal/modal";
import { useState, useEffect, useRef } from "react";
import { Camera, X, User } from "lucide-react";

export default function ProfileModal({ isOpen, onClose, initialData, onSave }) {
    const [data, setData] = useState(initialData);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setData(initialData);
        const savedPhoto = localStorage.getItem("userPhoto");
        if (savedPhoto) {
            setPhotoPreview(savedPhoto);
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handlePhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('File harus berupa gambar!');
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                alert('Ukuran foto maksimal 2MB!');
                return;
            }

            setPhotoFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemovePhoto = () => {
        setPhotoPreview(null);
        setPhotoFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = () => {
        if (photoPreview) {
            localStorage.setItem("userPhoto", photoPreview);
        } else {
            localStorage.removeItem("userPhoto");
        }
        onSave(data);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Profil">
            <div className="space-y-4">
                {/* Photo Upload Section - Very Compact */}
                <div className="flex items-center gap-3">
                    <div className="relative group flex-shrink-0">
                        {/* Subtle Ring */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-50 group-hover:opacity-70 blur-sm transition duration-200"></div>
                        
                        {/* Photo Container - Very Small */}
                        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white border-2 border-white shadow-md">
                            {photoPreview ? (
                                <img
                                    src={photoPreview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                                    <User className="w-6 h-6 text-indigo-400" />
                                </div>
                            )}
                        </div>

                        {/* Camera Button - Very Small */}
                        <button
                            type="button"
                            onClick={handlePhotoClick}
                            className="absolute -bottom-0.5 -right-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-1 rounded-full shadow-md transition-all transform hover:scale-110 active:scale-95 border border-white"
                        >
                            <Camera className="w-2.5 h-2.5" />
                        </button>

                        {/* Remove Button */}
                        {photoPreview && (
                            <button
                                type="button"
                                onClick={handleRemovePhoto}
                                className="absolute -top-0.5 -right-0.5 bg-red-500 hover:bg-red-600 text-white p-0.5 rounded-full shadow-md transition-all transform hover:scale-110 active:scale-95 border border-white"
                            >
                                <X className="w-2 h-2" />
                            </button>
                        )}
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                    />

                    {/* Photo Info - Inline & Compact */}
                    <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-700">Foto Profil</p>
                        <p className="text-[10px] text-gray-500">Klik ikon kamera • Maks. 2MB</p>
                    </div>
                </div>

                {/* Form Fields - Very Compact */}
                <div className="space-y-2.5">
                    {/* Nama Lengkap */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Nama Lengkap
                        </label>
                        <input
                            name="nama"
                            value={data.nama || ''}
                            onChange={handleChange}
                            placeholder="Masukkan nama lengkap"
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400 bg-white hover:border-gray-400"
                        />
                    </div>

                    {/* Kelas */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Kelas
                        </label>
                        <input
                            name="kelas"
                            value={data.kelas || ''}
                            onChange={handleChange}
                            placeholder="Contoh: XII IPA 1"
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400 bg-white hover:border-gray-400"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            value={data.email || ''}
                            onChange={handleChange}
                            placeholder="email@example.com"
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400 bg-white hover:border-gray-400"
                        />
                    </div>

                    {/* Nomor Telepon */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Nomor Telepon
                        </label>
                        <input
                            name="phone"
                            type="tel"
                            value={data.phone || ''}
                            onChange={handleChange}
                            placeholder="08123456789"
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400 bg-white hover:border-gray-400"
                        />
                    </div>
                </div>

                {/* Action Buttons - Very Compact */}
                <div className="flex gap-2 pt-1">
                    <button
                        onClick={onClose}
                        className="flex-1 border border-gray-300 text-gray-700 font-medium px-3 py-1.5 text-xs rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-3 py-1.5 text-xs rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </Modal>
    );
}