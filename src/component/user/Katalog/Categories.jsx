"use client";

import { Filter } from "lucide-react";

export default function Categories({ categoriesList, activeCategory, setActiveCategory }) {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-blue-600" />
                <h2 className="text-base font-semibold text-gray-900">Kategori</h2>
            </div>

            <div className="flex flex-wrap gap-2">
                {categoriesList.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                            activeCategory === category
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}
