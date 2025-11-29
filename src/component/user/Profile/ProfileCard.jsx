"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";

export default function ProfileCard({ profile, onEditClick }) {
    const [photoPreview, setPhotoPreview] = useState(null);

    // Load foto dari localStorage setiap kali component di-render
    useEffect(() => {
        const savedPhoto = localStorage.getItem("userPhoto");
        if (savedPhoto) {
            setPhotoPreview(savedPhoto);
        } else {
            setPhotoPreview(null);
        }
    }, [profile]); // Re-run ketika profile berubah

    return (
        <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
                {/* Profile Image */}
                <div className="relative inline-block mb-4">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-gray-100 bg-gradient-to-br from-blue-50 to-indigo-50">
                        {photoPreview ? (
                            <img
                                src={photoPreview}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <User className="w-16 h-16 text-indigo-300" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Name & ID */}
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                    {profile.nama}
                </h2>
                <p className="text-gray-400 text-sm mb-3">
                    {profile.kelas || "XI"}
                </p>

                {/* Role Badge */}
                <span className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-4 py-1 rounded-full mb-6">
                    user
                </span>

                {/* Edit Button */}
                <button
                    onClick={onEditClick}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
                >
                    Edit Profil
                </button>
            </div>
        </div>
    );
}