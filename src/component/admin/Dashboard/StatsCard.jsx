import { TrendingUp } from "lucide-react";

export default function StatsCard({ icon, label, value, color, trend }) {
    const colorClasses = {
        blue: "from-blue-500 to-blue-600",
        green: "from-green-500 to-green-600",
        purple: "from-purple-500 to-purple-600",
        orange: "from-orange-500 to-orange-600"
    };

    return (
        <div className="bg-white rounded-lg p-2.5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-1.5">
                <div className={`w-7 h-7 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center shadow-sm`}>
                    {icon}
                </div>
                {trend && (
                    <div className="flex items-center gap-0.5 text-green-600 bg-green-50 px-1.5 py-0.5 rounded text-[9px] font-semibold">
                        <TrendingUp className="w-2 h-2" />
                        <span>{trend}</span>
                    </div>
                )}
            </div>
            <div>
                <p className="text-gray-500 text-[9px] font-medium mb-0.5">{label}</p>
                <h3 className="text-lg font-bold text-gray-900">{value}</h3>
            </div>
        </div>
    );
}