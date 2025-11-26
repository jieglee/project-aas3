"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
                setIsLoading(false);
                return;
            }

            // Simpan token JWT
            localStorage.setItem("token", data.token);
            
            // Simpan data user ke localStorage
            localStorage.setItem("userId", data.user.id);
            localStorage.setItem("userRole", data.user.role);
            
            // Simpan profile data lengkap untuk ProfileDropdown dan Profile Page
            const profileData = {
                id: data.user.id,
                nama: data.user.nama,
                kelas: data.user.kelas || "-",
                email: data.user.email,
                phone: data.user.phone || "-",
                role: data.user.role
            };
            
            localStorage.setItem("profileData", JSON.stringify(profileData));

            // Redirect sesuai role
            if (data.user.role === "admin") {
                router.push("/Admin/Dashboard");
            } else {
                router.push("/user/home");
            }
        } catch (err) {
            console.error("Error login:", err);
            setError("Terjadi kesalahan, coba lagi!");
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 lg:h-screen flex items-center justify-center p-4">
            <div className="max-w-6xl bg-white shadow-lg p-6 lg:p-8 rounded-2xl">
                <div className="grid md:grid-cols-2 items-center gap-y-8">
                    {/* Bagian gambar kiri */}
                    <div className="w-full h-full">
                        <div className="aspect-square bg-gray-50 relative before:absolute before:inset-0 before:bg-indigo-600/70 rounded-md overflow-hidden w-full h-full">
                            <img
                                src="/kiri.jpg"
                                className="w-full h-full object-cover"
                                alt="login img"
                            />
                            <div className="absolute inset-0 flex items-center justify-center p-6">
                                <div>
                                    <h1 className="text-white text-4xl font-semibold">Masuk</h1>
                                    <p className="text-slate-100 text-[15px] font-medium mt-6 leading-relaxed">
                                        Masuk ke akun Anda dan lanjutkan perjalanan
                                        meminjam buku di perpustakaan sekolah.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form login */}
                    <form onSubmit={handleLogin} className="max-w-md mx-auto w-full p-4 md:p-6">
                        <h2 className="text-2xl font-semibold text-center text-blue-800 mb-8">
                            Login Akun
                        </h2>

                        {error && (
                            <p className="text-center text-red-600 text-sm font-medium mb-4">
                                {error}
                            </p>
                        )}

                        <div className="mb-6">
                            <label className="block text-slate-900 text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Masukkan Email"
                                className="w-full p-3 border-2 border-blue-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 shadow-sm"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className="mb-8">
                            <label className="block text-slate-900 text-sm font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full p-3 border-2 border-blue-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 shadow-sm"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-800 text-white py-3 rounded-2xl font-semibold hover:bg-blue-900 transition-all shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>

                        <p className="text-sm mt-6 text-center text-slate-600">
                            Belum punya akun?
                            <a href="/register" className="text-blue-600 ml-1 hover:underline">
                                Daftar di sini
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}