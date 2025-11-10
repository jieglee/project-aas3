export default function Register() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl bg-white shadow-lg p-4 lg:p-6 rounded-2xl">
        <div className="grid md:grid-cols-2 items-center gap-6">
          {/* Left Side - Form */}
          <form className="max-w-sm mx-auto w-full p-2 md:p-4">
            <h2 className="text-xl font-semibold text-center text-blue-800 mb-6">
              Register Akun
            </h2>

            {/* Nama & Kelas */}
            <div className="flex gap-3 mb-5">
              <div className="flex-1">
                <label className="block text-slate-900 text-sm font-medium mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="nama"
                  placeholder="Nama Lengkap"
                  className="w-full p-2.5 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 shadow-sm text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-slate-900 text-sm font-medium mb-1">
                  Kelas
                </label>
                <input
                  type="text"
                  name="kelas"
                  placeholder="Kelas"
                  className="w-full p-2.5 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 shadow-sm text-sm"
                />
              </div>
            </div>

            {/* Jurusan */}
            <div className="mb-5">
              <label className="block text-slate-900 text-sm font-medium mb-1">
                Jurusan
              </label>
              <input
                type="text"
                name="jurusan"
                placeholder="Jurusan"
                className="w-full p-2.5 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 shadow-sm text-sm"
              />
            </div>

            {/* Password (NIPD) */}
            <div className="mb-6">
              <label className="block text-slate-900 text-sm font-medium mb-1">
                Password (NIPD)
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password (NIPD)"
                className="w-full p-2.5 border-2 border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 shadow-sm text-sm"
              />
            </div>

            {/* Tombol Register */}
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-900 transition-all shadow-md text-sm"
            >
              Register
            </button>

            <p className="text-xs mt-4 text-center text-slate-600">
              Sudah punya akun?{" "}
              <a
                href="/login"
                className="text-blue-600 font-medium hover:underline ml-1"
              >
                Login di sini
              </a>
            </p>
          </form>

          {/* Right Side - Image */}
          <div className="w-full h-full">
            <div className="relative rounded-md overflow-hidden w-full h-64 md:h-full bg-gray-50 before:absolute before:inset-0 before:bg-indigo-600/70">
              <img
                src="/kanan.jpg"
                className="w-full h-full object-cover"
                alt="register img"
              />
              <div className="absolute inset-0 m-auto max-w-xs p-4 flex items-center justify-center">
                <div>
                  <h1 className="text-white text-2xl font-semibold">
                    Buat Akun Baru
                  </h1>
                  <p className="text-slate-100 text-sm font-medium mt-3 leading-relaxed">
                    Bergabunglah dan jadikan PusTBaka sebagai kemudahan dalam meminjam buku untuk memenuhi kebutuhan bacaan dan referensi Anda setiap hari.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
