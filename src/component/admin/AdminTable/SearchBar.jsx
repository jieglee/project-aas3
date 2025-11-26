import { Search } from 'lucide-react';

export default function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <div className="mb-5">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Cari peminjam atau judul buku..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    );
}