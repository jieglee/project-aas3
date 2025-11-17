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
                <input
                    name="nama"
                    value={data.nama}
                    onChange={handleChange}
                    placeholder="Nama lengkap"
                    className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                    name="kelas"
                    value={data.kelas}
                    onChange={handleChange}
                    placeholder="Kelas"
                    className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    placeholder="Nomor Telepon"
                    className="w-full border px-3 py-2 rounded-lg"
                />

                <button
                    onClick={handleSubmit}
                    className="w-full bg-[#1E3A8A] text-white py-2 rounded-lg hover:bg-[#0E2565]"
                >
                    Simpan
                </button>
            </div>
        </Modal>
    );
}
