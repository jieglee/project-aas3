export default function ProfileCard({ profile, onEditClick }) {
    return (
        <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
                {/* Profile Image */}
                <div className="relative inline-block mb-4">
                    <img
                        src="/anjing emo.jpg"
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-100"
                    />
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