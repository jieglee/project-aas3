"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nama: "",
        kelas: "",
        email: "",
        phone: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsLoading(true);

        const { nama, kelas, email, phone, password } = formData;

        if (!nama || !kelas || !email || !phone || !password) {
            setMessage("⚠️ Semua field wajib diisi!");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(`❌ ${data.error}`);
                setIsLoading(false);
                return;
            }

            // Tampilkan pesan sukses
            setMessage("✅ Registrasi berhasil! Mengalihkan ke halaman login...");
            
            // Redirect ke halaman login setelah 1.5 detik
            setTimeout(() => {
                router.push("/login");
            }, 1500);

        } catch (err) {
            console.error("Error:", err);
            setMessage("❌ Terjadi kesalahan server!");
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white shadow-lg p-6 md:p-8 rounded-2xl max-w-4xl w-full grid md:grid-cols-2 gap-6">
                {/* Form */}
                <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full space-y-4">
                    <h2 className="text-2xl font-semibold text-blue-800 text-center mb-4">
                        Register Akun
                    </h2>

                    {message && (
                        <p className={`text-center text-sm font-medium ${
                            message.includes('✅') ? 'text-green-600' : 'text-red-600'
                        }`}>
                            {message}
                        </p>
                    )}

                    <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        placeholder="Nama Lengkap"
                        className="w-full p-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-sm"
                        disabled={isLoading}
                    />

                    <input
                        type="text"
                        name="kelas"
                        value={formData.kelas}
                        onChange={handleChange}
                        placeholder="Kelas"
                        className="w-full p-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-sm"
                        disabled={isLoading}
                    />

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full p-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-sm"
                        disabled={isLoading}
                    />

                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Nomor Telepon"
                        className="w-full p-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-sm"
                        disabled={isLoading}
                    />

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full p-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-sm"
                        disabled={isLoading}
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-800 text-white py-3 rounded-xl font-semibold hover:bg-blue-900 transition-all text-sm disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Mendaftar..." : "Register"}
                    </button>

                    <p className="text-xs text-center text-gray-600 mt-1">
                        Sudah punya akun?{" "}
                        <a href="/login" className="text-blue-600 font-medium hover:underline">
                            Login di sini
                        </a>
                    </p>
                </form>

                {/* Image */}
                <div className="relative hidden md:flex items-center justify-center rounded-xl overflow-hidden bg-gray-50 h-64 md:h-full">
                    <img src="/kanan.jpg" className="w-full h-full object-cover" alt="register image" />
                    <div className="absolute inset-0 bg-indigo-600/70 flex items-center justify-center p-4">
                        <div>
                            <h3 className="text-white text-xl font-semibold mb-2">
                                Buat Akun Baru
                            </h3>
                            <p className="text-white text-sm">
                                Bergabunglah dan gunakan PusTBaka untuk memudahkan peminjaman buku.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}