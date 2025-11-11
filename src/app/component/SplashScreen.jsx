"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SplashScreen({ isVisible, onExitComplete }) {
  return (
    <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
      {isVisible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1E3A8A]"
          initial={{ y: 0, opacity: 1, borderBottomLeftRadius: "0%", borderBottomRightRadius: "0%" }}
          animate={{ y: 0, opacity: 1 }}
          exit={{
            y: "-100%",
            borderBottomLeftRadius: "50%",
            borderBottomRightRadius: "50%",
            opacity: 1,
            transition: {
              duration: 1.3,
              ease: [0.45, 0, 0.55, 1],
            },
          }}
          style={{ overflow: "hidden" }}
        >
          {/* Logo + Text */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center space-x-3"
          >
            <Image
              src="/logo.png"
              alt="Logo PusTBaka"
              width={65}
              height={65}
              priority
              className="object-contain drop-shadow-lg"
            />
            <h1 className="text-3xl font-bold text-white">PusTBaka</h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
