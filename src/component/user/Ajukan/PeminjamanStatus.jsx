import { motion } from "framer-motion";

const statusFlow = [
    "idle",
    "pending",
    "admin_check",
    "approved",
    "rejected",
    "borrowed"
];

const statusLabels = {
    idle: "Belum Ajukan",
    pending: "Pending",
    admin_check: "Dicek Admin",
    approved: "Disetujui",
    rejected: "Ditolak",
    borrowed: "Buku Dipinjam"
};

export default function PeminjamanStatus({ status }) {
    return (
        <div className="flex items-center justify-between space-x-4">
            {statusFlow.map((s, i) => (
                <div key={s} className="flex-1">
                    <motion.div
                        animate={{ backgroundColor: statusFlow.indexOf(status) >= i ? "#0E2565" : "#E5E7EB" }}
                        className="h-4 w-full rounded-full mb-1"
                    />
                    <p className="text-xs text-center">{statusLabels[s]}</p>
                </div>
            ))}
        </div>
    );
}
