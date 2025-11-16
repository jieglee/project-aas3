"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ isOpen, onClose, title, initialData, onSave }) {
  const [formData, setFormData] = useState({
    nama: "",
    kelas: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          ></div>

          {/* Modal Box (lebih kecil) */}
          <motion.div
            className="relative bg-white rounded-xl shadow-lg w-[90%] max-w-md p-5 z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            {title && (
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-semibold text-gray-700">{title}</h3>
                <button
                  className="text-gray-400 hover:text-gray-600 text-lg font-bold"
                  onClick={onClose}
                >
                  &times;
                </button>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="w-full border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Kelas
                  </label>
                  <input
                    type="text"
                    name="kelas"
                    value={formData.kelas}
                    onChange={handleChange}
                    className="w-full border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border rounded-md px-2 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    required
                  />
                </div>
              </div>

              {/* Tombol */}
              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="border border-gray-300 text-gray-600 text-sm px-3 py-1.5 rounded-md hover:bg-gray-100 transition"
                >
                  Tutup
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white text-sm px-3 py-1.5 rounded-md hover:bg-green-700 transition"
                >
                  Simpan
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
