"use client";

export default function BorrowerForm({ borrowerData, setBorrowerData }) {
    const handleChange = (e) => {
        setBorrowerData({
            ...borrowerData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="mt-8 p-6 bg-white rounded-2xl border border-blue-300 shadow-sm">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
                Data Peminjam
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Nama */}
                <div>
                    <label className="text-sm font-semibold text-gray-600">
                        Nama Lengkap
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={borrowerData.name}
                        onChange={handleChange}
                        placeholder="Masukkan nama lengkap"
                        className="w-full mt-1 p-3 border border-gray-500 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>

                {/* Kelas */}
                <div>
                    <label className="text-sm font-semibold text-gray-600">
                        Kelas
                    </label>
                    <input
                        type="text"
                        name="class"
                        value={borrowerData.class}
                        onChange={handleChange}
                        placeholder="Contoh: X RPL 5"
                        className="w-full mt-1 p-3 border border-gray-500 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="text-sm font-semibold text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={borrowerData.email}
                        onChange={handleChange}
                        placeholder="Masukkan email"
                        className="w-full mt-1 p-3 border border-gray-500 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>

                {/* Nomor HP */}
                <div>
                    <label className="text-sm font-semibold text-gray-600">
                        Nomor Telepon
                    </label>
                    <input
                        type="number"
                        name="phone"
                        value={borrowerData.phone}
                        onChange={handleChange}
                        placeholder="Masukkan nomor telepon"
                        className="w-full mt-1 p-3 border border-gray-500 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>

            </div>
        </div>
    );
}
