"use client";

import Image from "next/image";

export default function ProfileCard({ profile, onEdit }) {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center mb-8 transition hover:shadow-lg">
      
      <div className="flex items-center space-x-5">
        <Image
          src="/anjing emo.jpg"
          alt="Profile Picture"
          width={90}
          height={90}
          className="rounded-full object-cover border-2 border-[#1E3A8A]"
        />
        <div>
          <h3 className="text-2xl font-semibold text-[#0E2565]">{profile.nama}</h3>
          <p className="text-sm text-gray-500 mt-1">{profile.kelas}</p>
        </div>
      </div>

      <div className="flex gap-3 mt-5 md:mt-0">
        <button
          onClick={onEdit}
          className="bg-[#1E3A8A] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#0E2565] transition"
        >
          Edit Profile
        </button>
      </div>

    </div>
  );
}
