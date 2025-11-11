"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [showSplash, setShowSplash] = useState(isHome);

  useEffect(() => {
    if (isHome) {
      const timer = setTimeout(() => setShowSplash(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isHome]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Konten utama di bawah */}
      <div className="relative z-0">{children}</div>

      {/* Splash screen di atas */}
      <SplashScreen isVisible={showSplash} onExitComplete={() => {}} />
    </div>
  );
}
