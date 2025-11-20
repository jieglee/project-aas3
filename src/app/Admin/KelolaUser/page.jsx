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

    // search handler (client-side quick)
    const handleSearch = (q) => {
        setQuery(q);
        // simple client filter; you can change to query server if large data
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
        <div className="p-6 bg-white min-h-screen">
            <div className="max-w-6xl mx-auto space-y-4">

                {/* HEADER CARD */}
                <div className="bg-white rounded-lg shadow p-6 border border-gray-200 flex justify-between items-start">
                    <div>
                        <h1 className="text-xl font-bold gi flex items-center gap-3 text-gray-800">
                            <span className="bg-blue-100 text-blue-600 p-2 rounded-md flex items-center justify-center">
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

                {/* SEARCH CARD */}
                <div className="bg-white rounded-lg p-4 shadow border border-gray-200">
                    <SearchBar onSearch={handleSearch} />
                </div>

                {/* TABLE CARD */}
                <div className="bg-white rounded-lg p-4 shadow border border-gray-200">
                    <UserTable users={users} fetchUsers={fetchUsers} onEdit={openEdit} />
                </div>
            </div>

            <UserModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                fetchUsers={fetchUsers}
                editData={editData}
            />
        </div>
    );
}
