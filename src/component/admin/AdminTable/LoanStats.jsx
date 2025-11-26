import { Clock, BookOpen, AlertTriangle, Archive } from 'lucide-react';

export default function LoanStats({ loans, activeTab, setActiveTab }) {
    const tabs = [
        { id: "Menunggu", label: "Persetujuan", icon: Clock },
        { id: "Dipinjam", label: "Aktif", icon: BookOpen },
        { id: "Terlambat", label: "Terlambat", icon: AlertTriangle },
        { id: "Dikembalikan", label: "Riwayat", icon: Archive }
    ];

    const getTabCount = (status) => {
        if (status === "Dikembalikan") {
            return loans.filter(l => l.status === "Dikembalikan" || l.status === "Ditolak").length;
        }
        return loans.filter(l => l.status === status).length;
    };

    return (
        <div className="grid grid-cols-4 gap-3 mb-6">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const count = getTabCount(tab.id);
                const isActive = activeTab === tab.id;
                
                let bgClass = '';
                let iconBgClass = '';
                if (tab.id === "Menunggu") {
                    bgClass = isActive ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 hover:bg-orange-50';
                    iconBgClass = isActive ? 'bg-white/20' : 'bg-orange-100';
                } else if (tab.id === "Dipinjam") {
                    bgClass = isActive ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-blue-50';
                    iconBgClass = isActive ? 'bg-white/20' : 'bg-blue-100';
                } else if (tab.id === "Terlambat") {
                    bgClass = isActive ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-red-50';
                    iconBgClass = isActive ? 'bg-white/20' : 'bg-red-100';
                } else {
                    bgClass = isActive ? 'bg-gray-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-50';
                    iconBgClass = isActive ? 'bg-white/20' : 'bg-gray-200';
                }
                
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`${bgClass} p-3 rounded-xl transition-all duration-300 ${isActive ? 'shadow-lg scale-105' : 'shadow hover:shadow-md'}`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className={`${iconBgClass} w-8 h-8 rounded-lg flex items-center justify-center`}>
                                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.id === "Menunggu" ? 'text-orange-600' : tab.id === "Dipinjam" ? 'text-blue-600' : tab.id === "Terlambat" ? 'text-red-600' : 'text-gray-600'}`} />
                            </div>
                            <span className={`text-2xl font-bold ${isActive ? 'text-white' : 'text-gray-900'}`}>{count}</span>
                        </div>
                        <p className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-600'}`}>{tab.label}</p>
                    </button>
                );
            })}
        </div>
    );
}