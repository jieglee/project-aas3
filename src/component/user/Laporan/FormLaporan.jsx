"use client";

import InputSelect from "./InputSelect";
import InputText from "./InputText";
import InputTextarea from "./InputTextarea";
import UploadFoto from "./UploadFoto";

export default function FormLaporan({
    form,
    handleChange,
    handleFile,
    handleSubmit,
    preview
}) {
    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md p-6 rounded-xl max-w-2xl space-y-5 border border-gray-200"
        >
            <InputSelect
                label="Jenis Laporan"
                name="jenis"
                value={form.jenis}
                onChange={handleChange}
            >
                <option value="">Pilih jenis laporan...</option>
                <option value="Hilang">Buku Hilang</option>
                <option value="Rusak">Buku Rusak</option>
                <option value="Lainnya">Lainnya</option>
            </InputSelect>

            <InputText
                label="Judul Buku"
                name="judul"
                value={form.judul}
                onChange={handleChange}
                placeholder="Contoh: Laskar Pelangi"
            />

            <InputText
                label="Kode Buku"
                name="kodeBuku"
                value={form.kodeBuku}
                onChange={handleChange}
                placeholder="Contoh: BK-0931"
            />

            <InputTextarea
                label="Deskripsi Masalah"
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
                placeholder="Jelaskan kondisi buku atau kronologinya..."
            />

            <UploadFoto preview={preview} onChange={handleFile} />

            <button
                type="submit"
                className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
                Kirim Laporan
            </button>
        </form>
    );
}
