"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function AccountInfo({ profile, userId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nama: profile.nama || "",
        kelas: profile.kelas || "",
        email: profile.email || "",
        phone: profile.phone || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        const updatePromise = fetch(`/api/users/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then(async (res) => {
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Gagal update profile");
            }
            
            // ✅ Trigger custom event untuk notify WelcomeSection
            window.dispatchEvent(new Event("profileUpdated"));
            
            setIsEditing(false);
            return data;
        });

        toast.promise(updatePromise, {
            loading: "Menyimpan perubahan...",
            success: "Profile berhasil diperbarui!",
            error: (err) => err.message || "Gagal memperbarui profile",
        });
    };

    return (
        <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">
                        Informasi Akun
                    </h3>
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg text-sm transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
                            >
                                Simpan
                            </button>
                        </div>
                    )}
                </div>

                {/* Info Grid */}
                <div className="space-y-4">
                    {/* Nama Lengkap */}
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                        <span className="text-gray-500 text-sm">Nama Lengkap</span>
                        {isEditing ? (
                            <input
                                type="text"
                                name="nama"
                                value={formData.nama}
                                onChange={handleChange}
                                className="text-gray-800 font-medium border-2 border-gray-300 rounded px-3 py-1 focus:border-blue-500 outline-none"
                            />
                        ) : (
                            <span className="text-gray-800 font-medium">{profile.nama}</span>
                        )}
                    </div>

                    {/* Kelas */}
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                        <span className="text-gray-500 text-sm">Kelas</span>
                        {isEditing ? (
                            <input
                                type="text"
                                name="kelas"
                                value={formData.kelas}
                                onChange={handleChange}
                                className="text-gray-800 font-medium border-2 border-gray-300 rounded px-3 py-1 focus:border-blue-500 outline-none"
                            />
                        ) : (
                            <span className="text-gray-800 font-medium">{profile.kelas}</span>
                        )}
                    </div>

                    {/* Email */}
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                        <span className="text-gray-500 text-sm">Email</span>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="text-gray-800 font-medium border-2 border-gray-300 rounded px-3 py-1 focus:border-blue-500 outline-none"
                            />
                        ) : (
                            <span className="text-gray-800 font-medium">{profile.email}</span>
                        )}
                    </div>

                    {/* Nomor Telepon */}
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                        <span className="text-gray-500 text-sm">Nomor Telepon</span>
                        {isEditing ? (
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="text-gray-800 font-medium border-2 border-gray-300 rounded px-3 py-1 focus:border-blue-500 outline-none"
                            />
                        ) : (
                            <span className="text-gray-800 font-medium">{profile.phone}</span>
                        )}
                    </div>

                    {/* ID Siswa */}
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                        <span className="text-gray-500 text-sm">ID Siswa</span>
                        <span className="text-gray-800 font-medium">
                            {userId || "12345678"}
                        </span>
                    </div>

                    {/* Anggota Sejak */}
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Anggota Sejak</span>
                        <span className="text-gray-800 font-medium">
                            {new Date().toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}