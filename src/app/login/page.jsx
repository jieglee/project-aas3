"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.nama === nama && u.password === password
    );

    if (!user) {
      setError("Nama atau password salah!");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    router.push("/User/Home");
  };

  return (
    <div className="bg-gray-100 lg:h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl bg-white shadow-lg p-6 lg:p-8 rounded-2xl">
        <div className="grid md:grid-cols-2 items-center gap-y-8">
          <div className="w-full h-full">
            <div className="aspect-square bg-gray-50 relative before:absolute before:inset-0 before:bg-indigo-600/70 rounded-md overflow-hidden w-full h-full">
              <img
                src="/kiri.jpg"
                className="w-full h-full object-cover"
                alt="login img"
              />
              <div className="absolute inset-0 m-auto max-w-sm p-6 flex items-center justify-center">
                <div>
                  <h1 className="text-white text-4xl font-semibold">Masuk</h1>
                  <p className="text-slate-100 text-[15px] font-medium mt-6 leading-relaxed">
                    Masuk ke akun Anda dan lanjutkan perjalanan menuju kemudahan meminjam buku di perpustakaan sekolah.
                  </p>
                </div>
              </div>
            </div>
          </div>

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
                Nama Lengkap
              </label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama Lengkap"
                className="w-full p-3 border-2 border-blue-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 shadow-sm"
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
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-3 rounded-2xl font-semibold hover:bg-blue-900 transition-all shadow-md"
            >
              Login
            </button>

            <p className="text-sm mt-6 text-center text-slate-600">
              Belum punya akun?{" "}
              <a
                href="/register"
                className="text-blue-600 font-medium tracking-wide hover:underline ml-1"
              >
                Daftar di sini
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
  