"use client";

import { Upload } from "lucide-react";

export default function UploadFoto({ onChange, preview }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
                Upload Foto (opsional)
            </label>

            <div className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:bg-blue-50 transition">
                <input
                    type="file"
                    onChange={onChange}
                    accept="image/*"
                    className="hidden"
                    id="upload"
                />
                <label htmlFor="upload" className="cursor-pointer flex flex-col items-center">
                    <Upload size={28} className="text-blue-900" />
                    <span className="text-sm text-gray-800 mt-2">
                        Klik untuk unggah foto (jika ada)
                    </span>
                </label>

                {preview && (
                    <img
                        src={preview}
                        className="mt-4 w-32 h-32 object-cover rounded-lg mx-auto shadow"
                    />
                )}
            </div>
        </div>
    );
}
