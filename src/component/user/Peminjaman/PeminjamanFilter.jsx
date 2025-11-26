import { Clock, AlertTriangle, CheckCircle, XCircle, Package } from 'lucide-react';

export default function PeminjamanFilter({ peminjaman, activeFilter, setActiveFilter }) {
    const filters = [
        { label: 'Menunggu', value: 'Menunggu', icon: Clock, color: 'yellow' },
        { label: 'Dipinjam', value: 'Dipinjam', icon: Package, color: 'blue' },
        { label: 'Terlambat', value: 'Terlambat', icon: AlertTriangle, color: 'red' },
        { label: 'Selesai', value: 'Dikembalikan', icon: CheckCircle, color: 'green' },
        { label: 'Ditolak', value: 'Ditolak', icon: XCircle, color: 'gray' },
    ];

    const getStatusCount = (status) => {
        return peminjaman.filter(item => item.status === status).length;
    };

    return (
        <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
                {filters.map((filter) => {
                    const Icon = filter.icon;
                    const count = getStatusCount(filter.value);
                    const isActive = activeFilter === filter.value;

                    const colorClasses = {
                        yellow: {
                            active: 'bg-yellow-500 text-white border-yellow-600',
                            inactive: 'bg-white text-gray-700 border-gray-300 hover:border-yellow-500'
                        },
                        blue: {
                            active: 'bg-blue-600 text-white border-blue-700',
                            inactive: 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
                        },
                        red: {
                            active: 'bg-red-600 text-white border-red-700',
                            inactive: 'bg-white text-gray-700 border-gray-300 hover:border-red-600'
                        },
                        green: {
                            active: 'bg-green-600 text-white border-green-700',
                            inactive: 'bg-white text-gray-700 border-gray-300 hover:border-green-600'
                        },
                        gray: {
                            active: 'bg-gray-600 text-white border-gray-700',
                            inactive: 'bg-white text-gray-700 border-gray-300 hover:border-gray-600'
                        }
                    };

                    return (
                        <button
                            key={filter.value}
                            onClick={() => setActiveFilter(filter.value)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all text-sm font-semibold border-2 ${
                                isActive 
                                    ? colorClasses[filter.color].active
                                    : colorClasses[filter.color].inactive
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{filter.label}</span>
                            <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                                isActive ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
                            }`}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}