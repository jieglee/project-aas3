"use client";

import Image from "next/image";

export default function ProfileCard({ profile, onEdit }) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div className="flex items-center space-x-4">
        <Image
          src="/anjing emo.jpg"
          alt="Profile Picture"
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold text-[#0E2565]">{profile.nama}</h3>
          <p className="text-sm text-gray-500">{profile.kelas}</p>
        </div>
      </div>

      <div className="flex gap-3 mt-4 md:mt-0">
        <button
          onClick={onEdit}
          className="bg-[#1E3A8A] text-white px-6 py-2 rounded-full text-sm hover:bg-[#0E2565] transition"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
