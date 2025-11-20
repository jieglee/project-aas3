"use client";

export default function ProfileStats({ stats }) {
    return (
        <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-6 mt-6 transition hover:shadow-lg">

            <h3 className="text-xl font-semibold text-[#0E2565] mb-6">
                Statistik Peminjaman
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Total Peminjaman */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-gray-600 text-sm">Total Peminjaman</p>
                    <p className="text-3xl font-bold text-blue-900 mt-1">{stats.totalPeminjaman}</p>
                </div>

                {/* Total Denda */}
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-gray-600 text-sm">Total Denda Belum Dibayar</p>
                    <p className="text-3xl font-bold text-red-600 mt-1">Rp {stats.totalDenda}</p>
                </div>

            </div>
        </div>
    );
}
