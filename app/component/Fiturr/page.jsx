export default function Fitur() {
  return (
    <section className="w-full py-20 bg-linear-to-b from-blue-100 to-white text-center">
      <h2 className="text-3xl font-bold mb-12">
        <span className="text-black">Fitur</span>{" "}
        <span className="text-blue-700">Unggulan</span>
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-12 px-6 md:px-20">
        <div className="flex flex-col items-center max-w-xs text-center">
          <div className="text-blue-800 text-5xl mb-4">📱</div>
          <h3 className="font-bold text-lg text-blue-800 mb-2">Peminjaman Online</h3>
          <p className="text-gray-700">Pinjam buku dengan mudah melalui sistem kami</p>
        </div>

        <div className="flex flex-col items-center max-w-xs text-center">
          <div className="text-blue-800 text-5xl mb-4">🔔</div>
          <h3 className="font-bold text-lg text-blue-800 mb-2">Notifikasi Pengembalian</h3>
          <p className="text-gray-700">Dapatkan pengingat otomatis saat waktu pengembalian tiba</p>
        </div>

        <div className="flex flex-col items-center max-w-xs text-center">
          <div className="text-blue-800 text-5xl mb-4">🔁</div>
          <h3 className="font-bold text-lg text-blue-800 mb-2">Riwayat Buku Otomatis</h3>
          <p className="text-gray-700">Pantau semua riwayat peminjaman dengan mudah</p>
        </div>
      </div>
    </section>
  );
}
