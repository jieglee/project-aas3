"use client";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { FaBook, FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaBuilding } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Confirm() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id") || "-";
  const name = searchParams.get("name") || "-";
  const userClass = searchParams.get("class") || "-";
  const email = searchParams.get("email") || "-";
  const phone = searchParams.get("phone") || "-";
  const borrowDate = searchParams.get("borrowDate") || "";
  const returnDate = searchParams.get("returnDate") || "";
  const bookTitle = searchParams.get("bookTitle") || "Judul Buku Tidak Diketahui";
  const author = searchParams.get("author") || "Penulis Tidak Diketahui";
  const publisher = searchParams.get("publisher") || "Penerbit Tidak Diketahui";
  const genre = searchParams.get("genre") || "Genre Tidak Diketahui";
  const pages = searchParams.get("pages") || "-";

  const qrValue = JSON.stringify({
    id,
    name,
    userClass,
    email,
    phone,
    borrowDate,
    returnDate,
    bookTitle,
    author,
    publisher,
    genre,
    pages,
  });

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-white/30 flex flex-col md:flex-row"
      >
        {/* QR Code */}
        <div className="md:w-1/2 flex justify-center items-center p-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 rounded-xl blur-3xl opacity-20"></div>
          <div className="relative p-4 bg-white rounded-xl shadow-lg flex flex-col items-center">
            <QRCodeSVG value={qrValue} className="w-48 h-48 sm:w-56 sm:h-56" />
            <p className="text-center text-gray-500 text-sm mt-3">Scan untuk konfirmasi</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="md:w-1/2 p-8 space-y-6 text-gray-800">
          <div className="mb-4">
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Konfirmasi Peminjaman Buku</h1>
            <p className="text-gray-600 text-sm">Tunjukkan QR Code untuk mengambil buku di perpustakaan</p>
          </div>

          {/* User Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Informasi Peminjam</h2>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-3">
                <FaUser className="text-blue-400 w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold">Nama</p>
                  <p className="text-gray-600">{name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaBuilding className="text-purple-400 w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold">Kelas</p>
                  <p className="text-gray-600">{userClass}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-pink-400 w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold">Email</p>
                  <p className="text-gray-600">{email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-green-400 w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold">Telepon</p>
                  <p className="text-gray-600">{phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Book Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Informasi Buku</h2>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-3">
                <FaBook className="text-indigo-400 w-5 h-5" />
                <p><span className="font-semibold">Judul:</span> {bookTitle}</p>
              </div>
              <div>
                <p><span className="font-semibold">Penulis:</span> {author}</p>
              </div>
              <div>
                <p><span className="font-semibold">Penerbit:</span> {publisher}</p>
              </div>
              <div>
                <p><span className="font-semibold">Genre:</span> {genre}</p>
              </div>
              <div>
                <p><span className="font-semibold">Jumlah Halaman:</span> {pages}</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaCalendarAlt className="text-yellow-500 w-5 h-5" />
                <p><span className="font-semibold">Tanggal Pinjam:</span> {formatDate(borrowDate)}</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaCalendarAlt className="text-red-500 w-5 h-5" />
                <p><span className="font-semibold">Tanggal Kembali:</span> {formatDate(returnDate)}</p>
              </div>
            </div>
          </div>

          {/* Print Button */}
          <div className="pt-4 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.print()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg hover:brightness-110 transition"
            >
              Cetak QR Code
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
