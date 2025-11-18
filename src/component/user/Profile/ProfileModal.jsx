"use client";

import Modal from "../../modal/modal";
import { useState, useEffect } from "react";

export default function ProfileModal({ isOpen, onClose, initialData, onSave }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ubah Informasi Pribadi">
      <div className="space-y-4">
        {["nama", "kelas", "email", "phone"].map((field) => (
          <input
            key={field}
            name={field}
            value={data[field]}
            onChange={handleChange}
            placeholder={field === "phone" ? "Nomor Telepon" : field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition"
          />
        ))}

        <button
          onClick={handleSubmit}
          className="w-full bg-[#1E3A8A] text-white py-2 rounded-xl font-medium hover:bg-[#0E2565] transition"
        >
          Simpan Perubahan
        </button>
      </div>
    </Modal>
  );
}
