"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Modal from "../../modal/modal";

export default function Profil() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔹 State utama profil
  const [profile, setProfile] = useState({
    nama: "Guest",
    kelas: "Belum diatur",
    email: "N/A",
    phone: "N/A",
  });

  // 🔹 Load data dari localStorage saat pertama kali halaman dibuka
  useEffect(() => {
    const storedProfile = localStorage.getItem("profileData");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  // 🔹 Simpan data dari modal
  const handleSave = (newData) => {
    setProfile(newData);
    localStorage.setItem("profileData", JSON.stringify(newData));
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white px-6 md:px-20 py-10 relative">
      {/* ===== Card Utama ===== */}
      <div className="border border-[#0E2565] rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-[#0E2565] mb-6">Profile</h2>

        <div className="border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          {/* Info Kiri */}
          <div className="flex items-center space-x-4">
            <Image
              src="/anjing emo.jpg"
              alt="Profile Picture"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-[#0E2565]">
                {profile.nama}
              </h3>
              <p className="text-sm text-gray-500">{profile.kelas}</p>
            </div>
          </div>

          {/* Tombol kanan */}
          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#1E3A8A] text-white px-6 py-2 rounded-full text-sm hover:bg-[#0E2565] transition"
            >
              Edit
            </button>
          </div>
        </div>

        {/* ===== Informasi Pribadi ===== */}
        <div className="border border-gray-200 rounded-xl p-5">
          <h3 className="text-xl font-semibold text-[#0E2565] mb-4">
            Informasi Pribadi
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Nama Lengkap</p>
              <p className="font-medium">{profile.nama}</p>
            </div>
            <div>
              <p className="text-gray-400">Kelas</p>
              <p className="font-medium">{profile.kelas}</p>
            </div>
            <div>
              <p className="text-gray-400">Email</p>
              <p className="font-medium">{profile.email}</p>
            </div>
            <div>
              <p className="text-gray-400">Nomor Telepon</p>
              <p className="font-medium">{profile.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Modal Ubah Data Diri ===== */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ubah Informasi Pribadi"
        initialData={profile}
        onSave={handleSave}
      />
    </div>
  );
}
