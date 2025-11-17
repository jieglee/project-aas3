import { BookOpen } from "lucide-react";

export default function EmptyRiwayat() {
    return (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
            <BookOpen size={60} className="mb-4 text-blue-400" />
            <p className="text-lg font-medium">Belum ada riwayat peminjaman</p>
        </div>
    );
}
