"use client";

import { useState, useEffect } from "react";
import { Users, UserCheck, BookOpen, Library, Eye, Edit, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Stats Card Component
function StatsCard({ icon, label, value, color }) {
    const colorClasses = {
        blue: "bg-blue-500",
        green: "bg-green-500",
        purple: "bg-purple-500",
        orange: "bg-orange-500"
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-gray-600 text-sm font-medium mb-2">{label}</p>
                    <h3 className="text-4xl font-bold text-gray-900">{value}</h3>
                </div>
                <div className={`${colorClasses[color]} p-4 rounded-2xl`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

// Chart Tab Component
function ChartTab({ active, setActive }) {
    return (
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
                onClick={() => setActive("weekly")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    active === "weekly"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                }`}
            >
                Mingguan
            </button>
            <button
                onClick={() => setActive("monthly")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    active === "monthly"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                }`}
            >
                Bulanan
            </button>
        </div>
    );
}

// Statistics Chart Component
function StatisticsChart() {
    const [activeTab, setActiveTab] = useState("weekly");

    const options = {
        legend: { show: false },
        colors: ["#3B82F6"],
        chart: {
            fontFamily: "Inter, sans-serif",
            height: 310,
            type: "area",
            toolbar: { show: false },
        },
        stroke: { curve: "smooth", width: 3 },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.1,
            },
        },
        markers: { size: 0, hover: { size: 5 } },
        grid: {
            borderColor: "#f1f1f1",
            yaxis: { lines: { show: true } },
            xaxis: { lines: { show: false } }
        },
        dataLabels: { enabled: false },
        tooltip: {
            enabled: true,
            y: {
                formatter: (val) => val + " peminjaman"
            }
        },
        yaxis: {
            labels: {
                style: { fontSize: "12px", colors: ["#64748b"] }
            }
        },
    };

    const weeklyOptions = {
        ...options,
        xaxis: {
            categories: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: "#64748b", fontSize: "12px" } }
        },
    };

    const weeklySeries = [
        { name: "Peminjaman", data: [12, 15, 18, 13, 20, 17, 22] },
    ];

    const monthlyOptions = {
        ...options,
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: "#64748b", fontSize: "12px" } }
        },
    };

    const monthlySeries = [
        { name: "Peminjaman", data: [140, 110, 120, 180, 200, 190, 210, 250, 240, 260, 280, 300] },
    ];

    const currentChart = {
        options: activeTab === "weekly" ? weeklyOptions : monthlyOptions,
        series: activeTab === "weekly" ? weeklySeries : monthlySeries,
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">
                        Grafik Aktivitas Peminjaman
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Aktivitas peminjaman berdasarkan minggu & bulan
                    </p>
                </div>
                <ChartTab active={activeTab} setActive={setActiveTab} />
            </div>

            <div className="w-full">
                <ReactApexChart
                    options={currentChart.options}
                    series={currentChart.series}
                    type="area"
                    height={310}
                />
            </div>
        </div>
    );
}

// Main Dashboard Component
export default function AdminDashboard() {
    const [admin, setAdmin] = useState(null);
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({
        totalUsers: 0,
        userRole: 0,
        totalBuku: 0,
        dipinjam: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsed = JSON.parse(userData);
            setAdmin(parsed);
        }
        fetchUsers();
        fetchStats();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/users");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            // Filter hanya user dengan role 'user', bukan admin
            const filteredUsers = Array.isArray(data) 
                ? data.filter(u => u.role === 'user').slice(0, 5) 
                : [];
            setUsers(filteredUsers);
        } catch (err) {
            console.error("Error fetching users:", err);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const [usersRes, booksRes] = await Promise.all([
                fetch("/api/users"),
                fetch("/api/buku")
            ]);

            const usersData = await usersRes.json();
            const booksData = await booksRes.json();

            setStats({
                totalUsers: Array.isArray(usersData) ? usersData.length : 0,
                userRole: Array.isArray(usersData) ? usersData.filter(u => u.role === 'user').length : 0,
                totalBuku: Array.isArray(booksData) ? booksData.length : 0,
                dipinjam: 2 // Nanti bisa diganti dengan data real dari API peminjaman
            });
        } catch (err) {
            console.error("Error fetching stats:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Yakin ingin menghapus user ini?")) return;

        try {
            const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchUsers();
                fetchStats();
                alert("User berhasil dihapus");
            } else {
                const data = await res.json();
                alert(data.error || "Gagal menghapus user");
            }
        } catch (err) {
            console.error("Error deleting user:", err);
            alert("Terjadi kesalahan saat menghapus user");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-6 shadow-lg">
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Admin</h1>
                <p className="text-blue-100">
                    Selamat datang kembali, <span className="font-semibold">{admin?.nama || "Admin"}</span>! 
                    Berikut ringkasan perpustakaan hari ini.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatsCard
                    icon={<Users className="w-8 h-8 text-white" />}
                    label="Total Users"
                    value={stats.totalUsers}
                    color="blue"
                />
                <StatsCard
                    icon={<UserCheck className="w-8 h-8 text-white" />}
                    label="User Role"
                    value={stats.userRole}
                    color="green"
                />
                <StatsCard
                    icon={<Library className="w-8 h-8 text-white" />}
                    label="Total Buku"
                    value={stats.totalBuku}
                    color="purple"
                />
                <StatsCard
                    icon={<BookOpen className="w-8 h-8 text-white" />}
                    label="Dipinjam"
                    value={stats.dipinjam}
                    color="orange"
                />
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Daftar Users PERPUSTB</h2>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">NIPD</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Nama</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Created At</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user, index) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.nama}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                            user
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(user.created_at).toLocaleDateString('id-ID', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => window.location.href = `/admin/users/${user.id}`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Lihat Detail"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => window.location.href = `/admin/users/edit/${user.id}`}
                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Hapus"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Belum ada data user</p>
                    </div>
                )}
            </div>

            {/* Statistics Chart */}
            <StatisticsChart />
        </div>
    );
}