import { FiEdit, FiTrash } from "react-icons/fi";

export default function UserRow({ user, fetchUsers, zebra }) {
    const handleDelete = async () => {
        if (!confirm("Hapus user ini?")) return;
        await fetch(`/api/users/${user.id}`, { method: "DELETE" });
        fetchUsers();
    };

    return (
        <tr className={`${zebra ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}>
            <td className="px-4 py-3 text-gray-600 font-medium">{user.id}</td>
            <td className="px-4 py-3 text-gray-800 font-semibold">{user.nama}</td>
            <td className="px-4 py-3 text-blue-600 underline underline-offset-2">
                {user.email}
            </td>
            <td className="px-4 py-3 text-gray-700 text-center">{user.phone}</td>

            <td className="px-4 py-3 text-center">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                    }`}
                >
                    {user.role}
                </span>
            </td>

            <td className="px-4 py-3 text-center flex justify-center gap-3">
                <button className="text-blue-500 hover:text-blue-700">
                    <FiEdit size={18} />
                </button>
                <button
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-700"
                >
                    <FiTrash size={18} />
                </button>
            </td>
        </tr>
    );
}
