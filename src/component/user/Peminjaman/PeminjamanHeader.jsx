import { BookOpen } from 'lucide-react';

export default function PeminjamanHeader() {
    return (
        <div className="mb-6">
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Riwayat Peminjaman</h1>
                        <p className="text-gray-600 text-sm">Pantau status peminjaman buku Anda</p>
                    </div>
                </div>
            </div>
        </div>
    );
}