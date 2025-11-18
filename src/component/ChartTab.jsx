"use client";

export default function ChartTab({ active, setActive }) {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      <button
        onClick={() => setActive("weekly")}
        className={`px-4 py-2 text-sm rounded-md transition ${
          active === "weekly"
            ? "bg-white dark:bg-gray-900 shadow font-semibold"
            : "text-gray-500"
        }`}
      >
        Mingguan
      </button>

      <button
        onClick={() => setActive("monthly")}
        className={`px-4 py-2 text-sm rounded-md transition ${
          active === "monthly"
            ? "bg-white dark:bg-gray-900 shadow font-semibold"
            : "text-gray-500"
        }`}
      >
        Bulanan
      </button>
    </div>
  );
}
