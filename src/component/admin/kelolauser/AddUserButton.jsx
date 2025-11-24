"use client";
import { Plus } from "lucide-react";

export default function AddUserButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
        >
            <Plus className="w-5 h-5" />
            Tambah User
        </button>
    );
}