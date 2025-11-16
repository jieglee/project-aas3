import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationPopup({ isOpen, onClose, book }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // auto close 4 detik
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!book) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          className="fixed top-24 right-6 z-50 w-80 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center font-semibold">
            Notifikasi
            <button onClick={onClose} className="text-white font-bold">✕</button>
          </div>

          {/* Konten buku */}
          <div className="flex p-4 gap-4">
            <img
              src={book.cover || "/placeholder.png"}
              alt={book.title}
              className="w-16 h-20 object-cover rounded-md border"
            />
            <div className="flex flex-col justify-between">
              <h3 className="text-gray-800 font-semibold">{book.title}</h3>
              <p className="text-gray-500 text-sm">{book.author}</p>
              <span className="mt-2 text-xs text-green-600 font-medium">
                📖 Sudah dipinjam
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
