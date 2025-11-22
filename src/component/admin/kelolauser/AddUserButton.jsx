"use client";

export default function AddUserButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow-md transition"
        >
            + Tambah User
        </button>
    );
}
