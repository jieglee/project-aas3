"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, CheckCircle } from "lucide-react";

export default function LaporanPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        jenis: "",
        judul: "",
        kodeBuku: "",
        deskripsi: "",
        foto: null,
    });

    const [preview, setPreview] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, foto: file });
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.jenis || !form.judul || !form.kodeBuku || !form.deskripsi) {
            alert("Harap lengkapi semua data penting!");
            return;
        }

        localStorage.setItem("lastReport", JSON.stringify(form));

        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);

        router.push("/Layout/User/Laporan/Selesai");

        setForm({
            jenis: "",
            judul: "",
            kodeBuku: "",
            deskripsi: "",
            foto: null,
        });
        setPreview(null);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Laporan Masalah Buku
            </h1>

            <p className="text-sm text-gray-600 mb-6">
                Laporkan jika kamu menemukan buku yang hilang, rusak, atau masalah lainnya.
            </p>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md p-6 rounded-xl max-w-2xl space-y-5 border border-gray-200"
            >
                {/* Jenis Laporan */}
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                        Jenis Laporan
                    </label>
                    <select
                        name="jenis"
                        value={form.jenis}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 text-gray-800 bg-yellow-50"
                    >
                        <option value="">Pilih jenis laporan...</option>
                        <option value="Hilang">Buku Hilang</option>
                        <option value="Rusak">Buku Rusak</option>
                        <option value="Lainnya">Lainnya</option>
                    </select>
                </div>

                {/* Judul Buku */}
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                        Judul Buku
                    </label>
                    <input
                        type="text"
                        name="judul"
                        value={form.judul}
                        onChange={handleChange}
                        placeholder="Contoh: Laskar Pelangi"
                        className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 text-gray-800 bg-white"
                    />
                </div>

                {/* Kode Buku */}
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                        Kode Buku
                    </label>
                    <input
                        type="text"
                        name="kodeBuku"
                        value={form.kodeBuku}
                        onChange={handleChange}
                        placeholder="Contoh: BK-0931"
                        className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 text-gray-800 bg-white"
                    />
                </div>

                {/* Deskripsi */}
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                        Deskripsi Masalah
                    </label>
                    <textarea
                        name="deskripsi"
                        value={form.deskripsi}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Jelaskan kondisi buku atau kronologinya..."
                        className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:blue-green-300 text-gray-800 bg-white"
                    ></textarea>
                </div>

                {/* Upload Foto */}
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                        Upload Foto (opsional)
                    </label>
                    <div className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:bg-blue-50 transition">
                        <input
                            type="file"
                            onChange={handleFile}
                            accept="image/*"
                            className="hidden"
                            id="upload"
                        />
                        <label htmlFor="upload" className="cursor-pointer flex flex-col items-center">
                            <Upload size={28} className="text-blue-900" />
                            <span className="text-sm text-gray-800 mt-2">
                                Klik untuk unggah foto (jika ada)
                            </span>
                        </label>
                        {preview && (
                            <img
                                src={preview}
                                className="mt-4 w-32 h-32 object-cover rounded-lg mx-auto shadow"
                            />
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Kirim Laporan
                </button>
            </form>

            {success && (
                <div className="fixed bottom-5 right-5 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
                    <CheckCircle size={20} />
                    <span>Laporan berhasil dikirim</span>
                </div>
            )}
        </div>
    );
}
