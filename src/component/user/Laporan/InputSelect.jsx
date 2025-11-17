"use client";

export default function InputSelect({ label, name, value, onChange, children }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
                {label}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 bg-yellow-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
                {children}
            </select>
        </div>
    );
}
