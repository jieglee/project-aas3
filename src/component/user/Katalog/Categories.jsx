"use client";


export default function Categories({ categoriesList, activeCategory, setActiveCategory }) {
    return (
        <div className="mb-8">
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
