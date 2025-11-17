"use client";

export default function InputText({ label, name, value, onChange, placeholder }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
                {label}
            </label>
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
        </div>
    );
}
