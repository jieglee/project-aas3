// TopbarPremium.jsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import NotificationPopup from "./NotificationPopup";

export default function Topbar({ toggleSidebar, isOpen }) {
  const [showNotif, setShowNotif] = useState(false);
  const [book, setBook] = useState(null);
  const [hasAlert, setHasAlert] = useState(false);

  useEffect(() => { if (showNotif) setHasAlert(false); }, [showNotif]);

  const handleBorrowNotification = () => {
    setBook({ title: "The Psychology of Money", author: "Morgan Housel", cover: "/psychology.png" });
    setShowNotif(true);
    setHasAlert(true);
  };

  return (
    <>
      <header
        className={`fixed top-0 right-0 h-16 flex items-center justify-between px-6 transition-all duration-300
          ${isOpen ? "left-64" : "left-20"} bg-white/80 backdrop-blur-md border-b border-blue-200 shadow-md z-40`}
      >
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-blue-900 hover:bg-blue-800 transition transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
            <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M3 10h12M3 6h18M3 14h18M3 18h12"/>
          </svg>
        </button>

        <div className="flex items-center gap-6">
          <button
            onClick={handleBorrowNotification}
            className="relative p-2 rounded-full bg-blue-900 hover:bg-blue-800 transition transform hover:scale-110"
          >
            <motion.div animate={hasAlert ? { rotate: [-6, 6, -3, 3, 0] } : { rotate: 0 }} transition={{ duration: 0.5 }}>
              <Bell size={18} className="text-white" />
            </motion.div>
            {hasAlert && <>
              <motion.span animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.3, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1 right-1 w-3 h-3 bg-blue-400 rounded-full blur-sm" />
              <motion.span animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-400 rounded-full" />
            </>}
          </button>
          <ProfileDropdown />
        </div>
      </header>

      <NotificationPopup isOpen={showNotif} onClose={() => setShowNotif(false)} book={book} />
    </>
  );
}
