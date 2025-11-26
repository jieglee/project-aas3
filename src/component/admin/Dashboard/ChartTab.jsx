export default function ChartTab({ active, setActive }) {
    return (
        <div className="inline-flex bg-gray-100 rounded-full p-0.5">
            <button
                onClick={() => setActive("weekly")}
                className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all ${
                    active === "weekly"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                }`}
            >
                Mingguan
            </button>
            <button
                onClick={() => setActive("monthly")}
                className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all ${
                    active === "monthly"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                }`}
            >
                Bulanan
            </button>
        </div>
    );
}