"use client";
import { FiEdit, FiTrash } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function UserRow({ user, fetchUsers, zebra, onEdit }) {
    const handleDelete = async () => {
        const deletePromise = fetch(`/api/users/${user.id}`, { method: "DELETE" })
            .then(async (res) => {
                if (!res.ok) throw new Error("Gagal menghapus user");
                await fetchUsers();
                return res;
            });

        toast.promise(deletePromise, {
            loading: `Menghapus user "${user.nama}"...`,
            success: `User "${user.nama}" berhasil dihapus!`,
            error: "Terjadi kesalahan saat menghapus user",
        });
    };

    return (
        <tr className={`${zebra ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition`}>
            <td className="px-4 py-3 text-gray-600 font-medium">{user.id}</td>
            <td className="px-4 py-3 text-gray-800 font-semibold">{user.nama}</td>
            <td className="px-4 py-3 text-gray-700">{user.kelas}</td>
            <td className="px-4 py-3 text-blue-600">{user.email}</td>
            <td className="px-4 py-3 text-gray-700 text-center">{user.phone}</td>
            <td className="px-4 py-3 text-center">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                    }`}
                >
                    {user.role}
                </span>
            </td>
            <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-2">
                    <button onClick={() => onEdit(user)} className="text-blue-500 hover:bg-blue-100 p-2 rounded-lg transition">
                        <FiEdit size={18} />
                    </button>
                    <button onClick={handleDelete} className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition">
                        <FiTrash size={18} />
                    </button>
                </div>
            </td>
        </tr>
    );
}