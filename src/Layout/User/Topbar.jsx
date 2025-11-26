"use client";
import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";

export default function Topbar({ toggleSidebar, isOpen }) {
  return (
    <header
      className={`fixed top-0 right-0 h-18 flex items-center justify-between px-6 transition-all duration-300
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
        <ProfileDropdown />
      </div>
    </header>
  );
}