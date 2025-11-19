"use client";
import React from "react";

export default function Categories({ categories, activeCategory, setActiveCategory, loading }) {
  const safeCategories = categories || [];

  return (
    <div className="flex justify-center flex-wrap gap-3 mb-6">
      {loading ? (
        <p className="text-gray-500">Loading categories...</p>
      ) : safeCategories.length === 0 ? (
        <p className="text-gray-500">No categories available.</p>
      ) : (
        safeCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl ${
              activeCategory === cat ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))
      )}
    </div>
  );
}
