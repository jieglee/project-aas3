"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SplashScreen({ isVisible, onExitComplete }) {
  return (
    <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
      {isVisible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center 
            bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            y: "-100%",
            borderBottomLeftRadius: "60%",
            borderBottomRightRadius: "60%",
            filter: "blur(10px)",
            transition: {
              duration: 1.4,
              ease: [0.45, 0, 0.55, 1],
            },
          }}
          style={{ overflow: "hidden" }}
        >
          {/* Background Glow */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.25), transparent 70%)",
            }}
          />

          {/* Logo + Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="flex items-center space-x-4 relative"
          >
            {/* Logo with subtle pulse */}
            <motion.div
              animate={{ scale: [1, 1.07, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/logo.png"
                alt="Logo PusTBaka"
                width={70}
                height={70}
                priority
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Smooth Fade Text */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.7,
                ease: "easeOut",
              }}
              className="text-4xl font-extrabold tracking-wide text-white drop-shadow-lg"
            >
              PusTBaka
            </motion.h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
