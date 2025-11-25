"use client";

import { useState, useEffect } from "react";
import { Users, UserCheck, BookOpen, Library, Eye, Edit, Trash2, TrendingUp, Calendar, Clock } from "lucide-react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Stats Card Component - COMPACT
function StatsCard({ icon, label, value, color, trend }) {
    const colorClasses = {
        blue: "from-blue-500 to-blue-600",
        green: "from-green-500 to-green-600",
        purple: "from-purple-500 to-purple-600",
        orange: "from-orange-500 to-orange-600"
    };

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center shadow-sm`}>
                    {icon}
                </div>
                {trend && (
                    <div className="flex items-center gap-1 text-green-600 bg-green-50 px-1.5 py-0.5 rounded text-xs font-semibold">
                        <TrendingUp className="w-2.5 h-2.5" />
                        <span>{trend}</span>
                    </div>
                )}
            </div>
            <div>
                <p className="text-gray-500 text-xs font-medium mb-0.5">{label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            </div>
        </div>
    );
}

// Chart Tab Component - COMPACT
function ChartTab({ active, setActive }) {
    return (
        <div className="inline-flex bg-gray-100 rounded-full p-0.5">
            <button
                onClick={() => setActive("weekly")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    active === "weekly"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                }`}
            >
                Mingguan
            </button>
            <button
                onClick={() => setActive("monthly")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    active === "monthly"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                }`}
            >
                Bulanan
            </button>
        </div>
    );
}

// Statistics Chart Component - COMPACT
function StatisticsChart() {
    const [activeTab, setActiveTab] = useState("weekly");

    const options = {
        legend: { show: false },
        colors: ["#3b82f6"],
        chart: {
            fontFamily: "Inter, sans-serif",
            height: 240,
            type: "area",
            toolbar: { show: false },
        },
        stroke: { curve: "smooth", width: 2 },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.35,
                opacityTo: 0.05,
            },
        },
        markers: { size: 0, hover: { size: 4 } },
        grid: {
            borderColor: "#f1f5f9",
            padding: { top: 10, right: 10, bottom: 0, left: 5 },
            yaxis: { lines: { show: true } },
            xaxis: { lines: { show: false } }
        },
        dataLabels: { enabled: false },
        tooltip: {
            enabled: true,
            style: { fontSize: "11px" },
            y: { formatter: (val) => val + " peminjaman" }
        },
        yaxis: {
            labels: { style: { fontSize: "10px", colors: ["#64748b"], fontWeight: 500 } }
        },
    };

    const weeklyOptions = {
        ...options,
        xaxis: {
            categories: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: "#64748b", fontSize: "10px", fontWeight: 500 } }
        },
    };

    const weeklySeries = [{ name: "Peminjaman", data: [12, 15, 18, 13, 20, 17, 22] }];

    const monthlyOptions = {
        ...options,
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: "#64748b", fontSize: "10px", fontWeight: 500 }, rotate: -45 }
        },
    };

    const monthlySeries = [{ name: "Peminjaman", data: [140, 110, 120, 180, 200, 190, 210, 250, 240, 260, 280, 300] }];

    const currentChart = {
        options: activeTab === "weekly" ? weeklyOptions : monthlyOptions,
        series: activeTab === "weekly" ? weeklySeries : monthlySeries,
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <div>
                    <h3 className="text-sm font-bold text-gray-900">Statistik Peminjaman Buku</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Pantau aktivitas peminjaman perpustakaan</p>
                </div>
                <ChartTab active={activeTab} setActive={setActiveTab} />
            </div>
            <ReactApexChart options={currentChart.options} series={currentChart.series} type="area" height={240} />
        </div>
    );
}

// Main Dashboard Component - COMPACT
export default function AdminDashboard() {
    const [admin, setAdmin] = useState(null);
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, userRole: 0, totalBuku: 0, dipinjam: 0 });
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) setAdmin(JSON.parse(userData));
        fetchUsers();
        fetchStats();

        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/users");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            const filteredUsers = Array.isArray(data) ? data.filter(u => u.role === 'user').slice(0, 5) : [];
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
            const [usersRes, booksRes] = await Promise.all([fetch("/api/users"), fetch("/api/buku")]);
            const usersData = await usersRes.json();
            const booksData = await booksRes.json();
            setStats({
                totalUsers: Array.isArray(usersData) ? usersData.length : 0,
                userRole: Array.isArray(usersData) ? usersData.filter(u => u.role === 'user').length : 0,
                totalBuku: Array.isArray(booksData) ? booksData.length : 0,
                dipinjam: 2
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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-3">
                        <div className="w-16 h-16 border-3 border-blue-200 rounded-full"></div>
                        <div className="w-16 h-16 border-3 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
                    </div>
                    <p className="text-gray-700 text-sm font-semibold">Memuat Dashboard...</p>
                </div>
            </div>
        );
    }

    const formattedDate = currentTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    return (
        <div>
            <div className="p-4 lg:p-5">
                {/* Compact Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 mb-1">
                                Selamat Datang, {admin?.nama || "Admin"}! 👋
                            </h1>
                            <p className="text-gray-600 text-sm">Kelola sistem perpustakaan Anda dengan mudah</p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1.5 text-gray-600 text-xs mb-0.5">
                                <Calendar className="w-3 h-3" />
                                <span className="font-medium">{formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-blue-600 text-xs font-semibold">
                                <Clock className="w-3 h-3" />
                                <span>{formattedTime} WIB</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compact Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                    <StatsCard icon={<Users className="w-5 h-5 text-white" />} label="Total Users" value={stats.totalUsers} color="blue" trend="+12%" />
                    <StatsCard icon={<UserCheck className="w-5 h-5 text-white" />} label="User Role" value={stats.userRole} color="green" trend="+8%" />
                    <StatsCard icon={<Library className="w-5 h-5 text-white" />} label="Total Buku" value={stats.totalBuku} color="purple" trend="+5%" />
                    <StatsCard icon={<BookOpen className="w-5 h-5 text-white" />} label="Dipinjam" value={stats.dipinjam} color="orange" />
                </div>

                {/* Compact Users Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-5 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <div>
                                <h2 className="text-base font-bold text-gray-900">Daftar Pengguna Terbaru</h2>
                                <p className="text-xs text-gray-500 mt-0.5">5 pengguna terakhir yang terdaftar di sistem</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2.5 text-left text-xs font-bold text-gray-600 uppercase">ID</th>
                                    <th className="px-4 py-2.5 text-left text-xs font-bold text-gray-600 uppercase">Nama</th>
                                    <th className="px-4 py-2.5 text-left text-xs font-bold text-gray-600 uppercase">Email</th>
                                    <th className="px-4 py-2.5 text-left text-xs font-bold text-gray-600 uppercase">Role</th>
                                    <th className="px-4 py-2.5 text-left text-xs font-bold text-gray-600 uppercase">Phone</th>
                                    <th className="px-4 py-2.5 text-left text-xs font-bold text-gray-600 uppercase">Terdaftar</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-blue-50/50 transition-colors">
                                        <td className="px-4 py-3 text-xs font-semibold text-gray-900">#{user.id}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-semibold text-gray-900">{user.nama}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-gray-600">{user.email}</td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-gray-600">{user.phone || '-'}</td>
                                        <td className="px-4 py-3 text-xs text-gray-600">
                                            {new Date(user.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="px-4 py-3">
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {users.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Users className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 text-sm font-medium">Belum ada data pengguna</p>
                        </div>
                    )}
                </div>

                {/* Compact Chart */}
                <StatisticsChart />
            </div>
        </div>
    );
}