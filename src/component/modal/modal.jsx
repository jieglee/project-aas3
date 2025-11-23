"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, initialData, onSave, children }) {
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
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop with Blur */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>

          {/* Modal Container */}
          <motion.div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg z-10 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header with Gradient */}
            {title && (
              <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-5">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">{title}</h3>
                  <button
                    className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200"
                    onClick={onClose}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {children || (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-4">
                    {/* Nama Lengkap */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                        placeholder="Masukkan nama lengkap"
                        required
                      />
                    </div>

                    {/* Kelas */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Kelas
                      </label>
                      <input
                        type="text"
                        name="kelas"
                        value={formData.kelas}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                        placeholder="Contoh: XII IPA 1"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                        placeholder="email@example.com"
                        required
                      />
                    </div>

                    {/* Nomor Telepon */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nomor Telepon
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-300"
                        placeholder="08123456789"
                        required
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold px-4 py-3 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold px-4 py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                    >
                      Simpan
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}