"use client";

export default function InfoPribadi({ profile }) {
    return (
        <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="text-xl font-semibold text-[#0E2565] mb-4">Informasi Pribadi</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-gray-400">Nama Lengkap</p>
                    <p className="font-medium">{profile.nama}</p>
                </div>

                <div>
                    <p className="text-gray-400">Kelas</p>
                    <p className="font-medium">{profile.kelas}</p>
                </div>

                <div>
                    <p className="text-gray-400">Email</p>
                    <p className="font-medium">{profile.email}</p>
                </div>

                <div>
                    <p className="text-gray-400">Nomor Telepon</p>
                    <p className="font-medium">{profile.phone}</p>
                </div>
            </div>
        </div>
    );
}
