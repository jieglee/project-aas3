"use client";

import RiwayatItem from "./RiwayatItem";

export default function RiwayatList({ data, formatTanggal }) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
                <RiwayatItem key={item.id} item={item} formatTanggal={formatTanggal} />
            ))}
        </div>
    );
}
