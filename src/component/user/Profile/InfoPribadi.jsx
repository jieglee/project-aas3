"use client";

export default function InfoPribadi({ profile }) {
    return (
        <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-6 mt-6 transition hover:shadow-lg">
            <h3 className="text-xl font-semibold text-[#0E2565] mb-6">Informasi Pribadi</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                    <p className="text-gray-400">Nama Lengkap</p>
                    <p className="font-medium text-gray-800">{profile.nama}</p>
                </div>

                <div>
                    <p className="text-gray-400">Kelas</p>
                    <p className="font-medium text-gray-800">{profile.kelas}</p>
                </div>

                <div>
                    <p className="text-gray-400">Email</p>
                    <p className="font-medium text-gray-800">{profile.email}</p>
                </div>

                <div>
                    <p className="text-gray-400">Nomor Telepon</p>
                    <p className="font-medium text-gray-800">{profile.phone}</p>
                </div>
            </div>
        </div>
    );
}
