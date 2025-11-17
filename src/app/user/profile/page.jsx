"use client";

import React, { useState, useEffect } from "react";
import ProfileCard from "../../../component/user/Profile/ProfileCard";
import InfoPribadi from "../../../component/user/Profile/InfoPribadi";
import ProfileModal from "../../../component/user/Profile/ProfileModal";

export default function ProfilPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [profile, setProfile] = useState({
        nama: "Guest",
        kelas: "Belum diatur",
        email: "N/A",
        phone: "N/A",
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
        <div className="min-h-screen bg-white px-6 md:px-20 py-10">
            <div className="border border-[#0E2565] rounded-2xl p-6">

                <h2 className="text-2xl font-semibold text-[#0E2565] mb-6">Profile</h2>

                <ProfileCard profile={profile} onEdit={() => setIsModalOpen(true)} />

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
