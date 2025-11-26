import { Users } from "lucide-react";

export default function UsersTable({ users, loading }) {
    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-3 p-6 text-center">
                <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-gray-600 text-[10px]">Memuat data pengguna...</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-3 overflow-hidden">
            <div className="p-2.5 border-b border-gray-100">
                <div>
                    <h2 className="text-xs font-bold text-gray-900">Daftar Pengguna Terbaru</h2>
                    <p className="text-[9px] text-gray-500 mt-0.5">5 pengguna terakhir yang terdaftar di sistem</p>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full min-w-max">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-2 py-1.5 text-left text-[9px] font-bold text-gray-600 uppercase whitespace-nowrap">ID</th>
                            <th className="px-2 py-1.5 text-left text-[9px] font-bold text-gray-600 uppercase whitespace-nowrap">Nama</th>
                            <th className="px-2 py-1.5 text-left text-[9px] font-bold text-gray-600 uppercase whitespace-nowrap">Email</th>
                            <th className="px-2 py-1.5 text-left text-[9px] font-bold text-gray-600 uppercase whitespace-nowrap">Role</th>
                            <th className="px-2 py-1.5 text-left text-[9px] font-bold text-gray-600 uppercase whitespace-nowrap">Phone</th>
                            <th className="px-2 py-1.5 text-left text-[9px] font-bold text-gray-600 uppercase whitespace-nowrap">Terdaftar</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-blue-50/50 transition-colors">
                                <td className="px-2 py-1.5 text-[9px] font-semibold text-gray-900 whitespace-nowrap">#{user.id}</td>
                                <td className="px-2 py-1.5 text-[9px] font-semibold text-gray-900 whitespace-nowrap">{user.nama}</td>
                                <td className="px-2 py-1.5 text-[9px] text-gray-600 whitespace-nowrap">{user.email}</td>
                                <td className="px-2 py-1.5 whitespace-nowrap">
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-green-100 text-green-700">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-2 py-1.5 text-[9px] text-gray-600 whitespace-nowrap">{user.phone || '-'}</td>
                                <td className="px-2 py-1.5 text-[9px] text-gray-600 whitespace-nowrap">
                                    {new Date(user.created_at).toLocaleDateString('id-ID', { 
                                        day: '2-digit', 
                                        month: 'short', 
                                        year: 'numeric' 
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {users.length === 0 && (
                <div className="text-center py-6">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Users className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-[10px] font-medium">Belum ada data pengguna</p>
                </div>
            )}
        </div>
    );
}   