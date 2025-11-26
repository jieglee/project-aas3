import { Clock } from "lucide-react";

export default function InfoAlert() {
    return (
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-5 max-w-3xl mx-auto">
            <div className="flex gap-3">
                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                    <p className="text-sm text-blue-900 font-semibold mb-1">Perhatian</p>
                    <p className="text-xs text-blue-800 leading-relaxed">
                        Masa peminjaman maksimal <span className="font-bold">20 hari</span>. 
                        Keterlambatan pengembalian akan dikenakan denda <span className="font-bold">Rp 5.000 per hari</span>. 
                        Mohon kembalikan buku tepat waktu.
                    </p>
                </div>
            </div>
        </div>
    );
}