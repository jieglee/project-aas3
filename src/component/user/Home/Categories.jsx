"use client";
export default function Categories({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="flex justify-center flex-wrap gap-3 mb-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`px-4 py-2 rounded-xl ${
            activeCategory === cat ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
  