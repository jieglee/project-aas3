import UserRow from "../../../component/admin/kelolauser/UserRow";

export default function UserTable({ users, fetchUsers, onEdit }) {
    return (
        <div className="overflow-x-auto rounded-xl">
            <table className="w-full text-left text-sm">
                <thead className="bg-white text-gray-500 uppercase text-xs border-b">
                    <tr>
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">Nama</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3 text-center">Phone</th>
                        <th className="px-4 py-3 text-center">Role</th>
                        <th className="px-4 py-3 text-center">Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    {users && users.length > 0 ? (
                        users.map((user, idx) => (
                            <UserRow
                                key={user.id}
                                user={user}
                                fetchUsers={fetchUsers}
                                zebra={idx % 2 === 0}
                                onEdit={onEdit}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center py-6 text-gray-500">
                                Tidak ada data pengguna
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
