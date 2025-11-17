"use client";

import { CheckCircle } from "lucide-react";

export default function SuccessToast({ visible }) {
    if (!visible) return null;

    return (
        <div className="fixed bottom-5 right-5 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
            <CheckCircle size={20} />
            <span>Laporan berhasil dikirim</span>
        </div>
    );
}
