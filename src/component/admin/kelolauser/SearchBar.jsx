import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
    return (
        <div className="relative mb-4">
            <FiSearch className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
                type="text"
                className="w-full border border-gray-300 px-10 py-2 rounded-lg bg-white shadow-sm text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Cari user (nama, email)…"
            />
        </div>
    );
}
