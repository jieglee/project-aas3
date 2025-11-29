"use client";
import { useState } from "react";

export default function AccountInfo({ profile, userId }) {
    return (
        <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">
                        Informasi Akun
                    </h3>
                </div>

                {/* Info Grid */}
                <div className="space-y-4">
                    {/* Nama Lengkap */}
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                        <span className="text-gray-500 text-sm">Nama Lengkap</span>
                        <span className="text-gray-800 font-medium">{profile.nama}</span>
                    </div>

                    {/* Kelas */}
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                        <span className="text-gray-500 text-sm">Kelas</span>
                        <span className="text-gray-800 font-medium">{profile.kelas}</span>
                    </div>

                    {/* Email */}
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                        <span className="text-gray-500 text-sm">Email</span>
                        <span className="text-gray-800 font-medium">{profile.email}</span>
                    </div>

                    {/* Nomor Telepon */}
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                        <span className="text-gray-500 text-sm">Nomor Telepon</span>
                        <span className="text-gray-800 font-medium">{profile.phone}</span>
                    </div>

                    {/* Anggota Sejak */}
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Anggota Sejak</span>
                        <span className="text-gray-800 font-medium">
                            {new Date().toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}