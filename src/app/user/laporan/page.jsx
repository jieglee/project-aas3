"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormLaporan from "../../../component/user/Laporan/FormLaporan";
import SuccessToast from "../../../component/user/Laporan/SuccessToast";

export default function LaporanPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        jenis: "",
        judul: "",
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

        if (!form.jenis || !form.judul || !form.deskripsi) {
            alert("Harap lengkapi semua data penting!");
            return;
        }

        localStorage.setItem("lastReport", JSON.stringify(form));
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);

        router.push("/user/laporan/Selesai");

        setForm({
            jenis: "",
            judul: "",
            deskripsi: "",
            foto: null,
        });
        setPreview(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
            <div className="w-full max-w-xl">
                <h1 className="text-3xl font-bold text-blue-900 mb-2 text-center">
                    Laporkan Masalah Buku
                </h1>
                <p className="text-gray-600 text-center mb-6">
                    Laporkan buku yang hilang, rusak, atau masalah lainnya dengan mudah.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-lg rounded-2xl p-6 space-y-5 border border-gray-200"
                >
                    {/* Jenis Laporan */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Jenis Laporan
                        </label>
                        <select
                            name="jenis"
                            value={form.jenis}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-300 rounded-xl px-4 py-2 bg-yellow-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                        >
                            <option value="">Pilih jenis laporan...</option>
                            <option value="Hilang">Buku Hilang</option>
                            <option value="Rusak">Buku Rusak</option>
                            <option value="Lainnya">Lainnya</option>
                        </select>
                    </div>

                    {/* Judul Buku */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Judul Buku
                        </label>
                        <input
                            type="text"
                            name="judul"
                            value={form.judul}
                            onChange={handleChange}
                            placeholder="Contoh: Laskar Pelangi"
                            className="w-full border-2 border-gray-300 rounded-xl px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                        />
                    </div>

                    {/* Deskripsi */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Deskripsi Masalah
                        </label>
                        <textarea
                            name="deskripsi"
                            rows={5}
                            value={form.deskripsi}
                            onChange={handleChange}
                            placeholder="Jelaskan kondisi buku atau kronologinya..."
                            className="w-full border-2 border-gray-300 rounded-xl px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                        ></textarea>
                    </div>

                    {/* Upload Foto */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Upload Foto (opsional)
                        </label>
                        <div className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:bg-blue-50 transition">
                            <input
                                type="file"
                                accept="image/*"
                                id="upload"
                                onChange={handleFile}
                                className="hidden"
                            />
                            <label htmlFor="upload" className="flex flex-col items-center cursor-pointer">
                                <svg
                                    className="w-8 h-8 text-blue-900 mb-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0-8l-3 3m3-3l3 3" />
                                </svg>
                                <span className="text-gray-700 text-sm">Klik untuk unggah foto (jika ada)</span>
                            </label>
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="mt-4 w-32 h-32 object-cover rounded-lg mx-auto shadow"
                                />
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                        Kirim Laporan
                    </button>
                </form>
            </div>

            <SuccessToast visible={success} />
        </div>
    );
}
