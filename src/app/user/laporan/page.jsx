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
        kodeBuku: "",
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

        if (!form.jenis || !form.judul || !form.kodeBuku || !form.deskripsi) {
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
            kodeBuku: "",
            deskripsi: "",
            foto: null,
        });
        setPreview(null);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Laporan Masalah Buku
            </h1>

            <p className="text-sm text-gray-600 mb-6">
                Laporkan jika kamu menemukan buku yang hilang, rusak, atau masalah lainnya.
            </p>

            <FormLaporan
                form={form}
                handleChange={handleChange}
                handleFile={handleFile}
                handleSubmit={handleSubmit}
                preview={preview}
            />

            <SuccessToast visible={success} />
        </div>
    );
}
