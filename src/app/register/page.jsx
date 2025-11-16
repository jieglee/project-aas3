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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nama, kelas, email, phone, password } = formData;

    if (!nama || !kelas || !email || !phone || !password) {
      setMessage("⚠️ Semua field wajib diisi!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // filter user yang valid
    const validUsers = users.filter((u) => u && u.email);

    if (validUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      setMessage("❌ Email sudah terdaftar!");
      return;
    }

    validUsers.push(formData);
    localStorage.setItem("users", JSON.stringify(validUsers));
    setMessage("✅ Registrasi berhasil! Mengarahkan ke halaman login...");

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg p-6 md:p-8 rounded-2xl max-w-4xl w-full grid md:grid-cols-2 gap-6">
        {/* Left Side - Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full space-y-4">
          <h2 className="text-2xl font-semibold text-blue-800 text-center mb-4">
            Register Akun
          </h2>

          {message && (
            <p className="text-center text-sm text-blue-700 font-medium">{message}</p>
          )}

          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Nama Lengkap"
            className="w-full p-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-sm"
          />
          <input
            type="text"
            name="kelas"
            value={formData.kelas}
            onChange={handleChange}
            placeholder="Kelas"
            className="w-full p-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-sm"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-sm"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Nomor Telepon"
            className="w-full p-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-sm"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-sm"
          />

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 rounded-xl font-semibold hover:bg-blue-900 transition-all text-sm"
          >
            Register
          </button>

          <p className="text-xs text-center text-gray-600 mt-1">
            Sudah punya akun?{" "}
            <a href="/login" className="text-blue-600 font-medium hover:underline">
              Login di sini
            </a>
          </p>
        </form>

        {/* Right Side - Image */}
        <div className="relative hidden md:flex items-center justify-center rounded-xl overflow-hidden bg-gray-50 h-64 md:h-full">
          <img
            src="/kanan.jpg"
            className="w-full h-full object-cover"
            alt="register image"
          />
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
