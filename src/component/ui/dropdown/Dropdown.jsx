"use client";
import { useState } from "react";

// Dropdown wrapper
export function Dropdown({ label, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-2 bg-gray-200 rounded"
      >
        {label}
      </button>
      {open && (
        <div className="absolute mt-2 w-40 bg-white border rounded shadow">
          {children}
        </div>
      )}
    </div>
  );
}

// Dropdown item
export function DropdownItem({ onClick, children }) {
  return (
    <div
      onClick={onClick}
      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
    >
      {children}
    </div>
  );
}
