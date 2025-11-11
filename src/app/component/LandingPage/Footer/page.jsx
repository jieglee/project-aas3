export default function Footer() {
  return (
    <footer className="w-full bg-[#1E2A78] text-white py-12 px-8 md:px-20 font-[Poppins]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        
        {/* Kolom 1 - Logo & Deskripsi */}
        <div className="md:w-[40%]">
          <div className="flex items-center space-x-3 mb-5">
            <img
              src="/logo.png"
              alt="PusTBaka Logo"
              className="w-10 h-10 object-contain"
            />
            <h2 className="text-2xl font-semibold tracking-wide">PusTBaka</h2>
          </div>

          <p className="text-sm leading-relaxed text-gray-100 text-justify mb-5">
            Tempat Buku Ngumpul, Taruna Jadi Unggul! <br />
            Platform perpustakaan digital SMK Taruna Bhakti <br />untuk mencari dan
            meminjam buku dengan mudah.
          </p>

          <div className="text-sm space-y-1 text-gray-200 mb-6">
            <p>Senin – Jumat : 07.30 – 16.00</p>
            <p>Sabtu : 07.30 – 12.30</p>
            <p>Minggu : Tutup</p>
          </div>

          <p className="text-xs text-gray-400">© 2025 PusTBaka</p>
        </div>

        {/* Kolom 2-4 - Disusun sejajar dan simetris */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-20 place-items-start md:place-items-center">
          
          {/* Dukungan */}
          <div>
            <h3 className="text-base font-semibold mb-4">Dukungan</h3>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li className="hover:text-blue-300 cursor-pointer">Panduan Pengguna</li>
              <li className="hover:text-blue-300 cursor-pointer">Layanan Peminjaman</li>
              <li className="hover:text-blue-300 cursor-pointer">Laporan Kendala</li>
              <li className="hover:text-blue-300 cursor-pointer">Testimoni Pembaca</li>
            </ul>
          </div>

          {/* Informasi */}
          <div>
            <h3 className="text-base font-semibold mb-8">Informasi</h3>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li className="hover:text-blue-300 cursor-pointer">Tentang Kami</li>
              <li className="hover:text-blue-300 cursor-pointer">Jam Operasional</li>
              <li className="hover:text-blue-300 cursor-pointer">Kontak Pustakawan</li>
              <li className="hover:text-blue-300 cursor-pointer">Testimoni</li>
            </ul>
          </div>

          {/* Legalitas */}
          <div>
            <h3 className="text-base font-semibold mb-4">Legalitas</h3>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li className="hover:text-blue-300 cursor-pointer">Kebijakan Privasi</li>
              <li className="hover:text-blue-300 cursor-pointer">Syarat dan Ketentuan</li>
              <li className="hover:text-blue-300 cursor-pointer">Hak Cipta & Lisensi</li>
              <li className="hover:text-blue-300 cursor-pointer">Kebijakan Pustaka</li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
