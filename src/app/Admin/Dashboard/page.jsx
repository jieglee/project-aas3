"use client";

import { useState, useEffect } from "react";
import { Users, UserCheck, BookOpen, Library } from "lucide-react";
import StatsCard from "../../../component/admin/Dashboard/StatsCard";
import WelcomeHeader from "../../../component/admin/Dashboard/WelcomeHeader";
import UsersTable from "../../../component/admin/Dashboard/UsersTable";
import StatisticsChart from "../../../component/admin/Dashboard/StatisticsChart";

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

    return (
        <div className="max-w-full overflow-x-hidden">
            <div className="p-3 lg:p-4 space-y-3">
                <WelcomeHeader adminName={admin?.nama} currentTime={currentTime} />

                {/* Stats Cards - Diperkecil */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                    <StatsCard 
                        icon={<Users className="w-4 h-4 md:w-5 md:h-5 text-white" />} 
                        label="Total Users" 
                        value={stats.totalUsers} 
                        color="blue" 
                        trend="+12%" 
                    />
                    <StatsCard 
                        icon={<UserCheck className="w-4 h-4 md:w-5 md:h-5 text-white" />} 
                        label="User Role" 
                        value={stats.userRole} 
                        color="green" 
                        trend="+8%" 
                    />
                    <StatsCard 
                        icon={<Library className="w-4 h-4 md:w-5 md:h-5 text-white" />} 
                        label="Total Buku" 
                        value={stats.totalBuku} 
                        color="purple" 
                        trend="+5%" 
                    />
                    <StatsCard 
                        icon={<BookOpen className="w-4 h-4 md:w-5 md:h-5 text-white" />} 
                        label="Dipinjam" 
                        value={stats.dipinjam} 
                        color="orange" 
                    />
                </div>

                <UsersTable users={users} loading={false} />

                <StatisticsChart />
            </div>
        </div>
    );
}