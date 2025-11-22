"use client";
import { useEffect, useState } from "react";
import { BsPeople } from "react-icons/bs";
import SearchBar from "../../../component/admin/kelolauser/SearchBar";
import AddUserButton from "../../../component/admin/kelolauser/AddUserButton";
import UserTable from "../../../component/admin/kelolauser/UserTable";
import UserModal from "../../../component/admin/kelolauser/UserModal";

export default function KelolaUserPage() {
    const [users, setUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [query, setQuery] = useState("");

    const fetchUsers = async (q = "") => {
        try {
            const url = q ? `/api/users?search=${encodeURIComponent(q)}` : "/api/users";
            const res = await fetch(url);
            const data = await res.json();
            setUsers(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            setUsers([]);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearch = (q) => {
        setQuery(q);
        if (!q) return fetchUsers();
        const lower = q.toLowerCase();
        const filtered = users.filter(
            (u) =>
                (u.nama || "").toLowerCase().includes(lower) ||
                (u.email || "").toLowerCase().includes(lower) ||
                (String(u.id) || "").includes(lower)
        );
        setUsers(filtered);
    };

    const openAdd = () => {
        setEditData(null);
        setIsOpen(true);
    };

    const openEdit = (user) => {
        setEditData(user);
        setIsOpen(true);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* HEADER */}
                <div className="bg-white rounded-xl shadow p-6 border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-3 text-gray-800">
                            <span className="bg-blue-100 text-blue-600 p-3 rounded-md flex items-center justify-center">
                                <BsPeople size={22} />
                            </span>
                            Kelola Users
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Manajemen data pengguna perpustakaan
                        </p>
                    </div>
                    <div>
                        <AddUserButton onClick={openAdd} />
                    </div>
                </div>

                {/* SEARCH */}
                <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
                    <SearchBar onSearch={handleSearch} />
                </div>

                {/* TABLE */}
                <div className="bg-white rounded-xl p-4 shadow border border-gray-200 overflow-x-auto">
                    <UserTable users={users} fetchUsers={fetchUsers} onEdit={openEdit} />
                </div>
            </div>

            {/* MODAL */}
            <UserModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                fetchUsers={fetchUsers}
                editData={editData}
            />
        </div>
    );
}
