"use client";
import UserRow from "./UserRow";

export default function UserTable({ users, fetchUsers, onEdit }) {
    return (
        <table className="min-w-full text-left text-sm border-collapse">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700 uppercase text-xs border-b-2 border-blue-200">
                <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Nama</th>
                    <th className="px-4 py-3">Kelas</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3 text-center">Phone</th>
                    <th className="px-4 py-3 text-center">Role</th>
                    <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {users && users.length > 0 ? (
                    users.map((user, idx) => (
                        <UserRow key={user.id} user={user} fetchUsers={fetchUsers} zebra={idx % 2 === 0} onEdit={onEdit} />
                    ))
                ) : (
                    <tr>
                        <td colSpan={7} className="text-center py-8 text-gray-500">
                            Tidak ada data pengguna. Tambahkan pengguna baru untuk memulai.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
