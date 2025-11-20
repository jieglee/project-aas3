"use client";

import React, { useState, useEffect } from "react";
import ProfileCard from "../../../component/user/Profile/ProfileCard";
import InfoPribadi from "../../../component/user/Profile/InfoPribadi";
import ProfileModal from "../../../component/user/Profile/ProfileModal";
import ProfileStats from "../../../component/user/Profile/ProfileStats";

export default function ProfilPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profile, setProfile] = useState({
        nama: "Guest",
        kelas: "Belum diatur",
        email: "N/A",
        phone: "N/A",
    });

    const [stats, setStats] = useState({
        totalPeminjaman: 10,  // sementara dummy
        totalDenda: 15000,    // sementara dummy
    });

    useEffect(() => {
        const stored = localStorage.getItem("profileData");
        if (stored) setProfile(JSON.parse(stored));
    }, []);

    const handleSave = (newData) => {
        setProfile(newData);
        localStorage.setItem("profileData", JSON.stringify(newData));
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-10">
            <div className="max-w-4xl mx-auto">

                <h2 className="text-3xl font-bold text-[#0E2565] mb-8">Profile Saya</h2>

                <ProfileCard profile={profile} onEdit={() => setIsModalOpen(true)} />

                <ProfileStats stats={stats} />

                <InfoPribadi profile={profile} />

                <ProfileModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    initialData={profile}
                    onSave={handleSave}
                />
            </div>
        </div>
    );
}
