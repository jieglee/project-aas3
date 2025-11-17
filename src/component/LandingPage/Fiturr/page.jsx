export default function Fitur() {
  return (
    <section
  id="fitur"
  className="w-full py-20 bg-linear-to-b from-blue-100 to-white text-center"
>
  <h2 className="text-3xl font-bold mb-12">
    <span className="text-black">Fitur</span>{" "}
    <span className="text-[#1E3A8A]">Unggulan</span>
  </h2>

  <div className="flex flex-col md:flex-row justify-center items-center gap-12 px-6 md:px-20 overflow-x-auto">
    {/* === Fitur 1 === */}
    <div className="flex flex-col items-center max-w-xs text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={60}
        height={60}
        viewBox="0 0 24 24"
        className="mb-4"
      >
        <path
          fill="#1E3A8A"
          d="M15.5 1h-8A2.5 2.5 0 0 0 5 3.5v17A2.5 2.5 0 0 0 7.5 23h8a2.5 2.5 0 0 0 2.5-2.5v-17A2.5 2.5 0 0 0 15.5 1m-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5m4.5-4H7V4h9z"
        />
      </svg>
      <h3 className="font-bold text-lg text-blue-800 mb-2">Peminjaman Online</h3>
      <p className="text-gray-700">
        Pinjam buku dengan mudah melalui sistem kami
      </p>
    </div>

    {/* === Fitur 2 === */}
    <div className="flex flex-col items-center max-w-xs text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={60}
        height={60}
        viewBox="0 0 512 512"
        className="mb-4"
      >
        <path
          fill="#1E3A8A"
          d="M440.08 341.31c-1.66-2-3.29-4-4.89-5.93c-22-26.61-35.31-42.67-35.31-118
          c0-39-9.33-71-27.72-95c-13.56-17.73-31.89-31.18-56.05-41.12a3 3 0 0 1-.82-.67
          C306.6 51.49 282.82 32 256 32s-50.59 19.49-59.28 48.56a3.1 3.1 0 0 1-.81.65
          c-56.38 23.21-83.78 67.74-83.78 136.14c0 75.36-13.29 91.42-35.31 118
          c-1.6 1.93-3.23 3.89-4.89 5.93a35.16 35.16 0 0 0-4.65 37.62
          c6.17 13 19.32 21.07 34.33 21.07H410.5c14.94 0 28-8.06 34.19-21
          a35.17 35.17 0 0 0-4.61-37.66M256 480a80.06 80.06 0 0 0 70.44-42.13
          a4 4 0 0 0-3.54-5.87H189.12a4 4 0 0 0-3.55 5.87A80.06 80.06 0 0 0 256 480"
        />
      </svg>
      <h3 className="font-bold text-lg text-blue-800 mb-2">Notifikasi Pengembalian</h3>
      <p className="text-gray-700">
        Dapatkan pengingat otomatis saat waktu pengembalian tiba
      </p>
    </div>

    {/* === Fitur 3 === */}
    <div className="flex flex-col items-center max-w-xs text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        viewBox="0 0 8 8"
        className="mb-4 scale-125"
      >
        <path
          fill="#1E3A8A"
          d="M7 3l1 2H7c0 4-6 4-6 1h1c0 2 4 2 4-1H5m2-3c0-3-6-3-6 1H0l1 2l2-2H2
          c0-3 4-3 4-1"
        />
      </svg>
      <h3 className="font-bold text-lg text-blue-800 mb-2">Riwayat Buku Otomatis</h3>
      <p className="text-gray-700">
        Pantau semua riwayat peminjaman dengan mudah
      </p>
    </div>
  </div>
</section>

  );
}
