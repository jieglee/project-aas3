"use client";

import { Sparkles } from "lucide-react";

function Categories({ categories, activeCategory, setActiveCategory, loading }) {
    if (loading) {
        return (
            <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">Kategori</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-28 h-11 bg-gray-200 rounded-xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Kategori</h3>
            </div>
            <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                            activeCategory === cat
                                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200 scale-105"
                                : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Categories;