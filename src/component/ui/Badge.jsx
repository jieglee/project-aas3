"use client";

export default function Badge({ color = "gray", children }) {
  let bgColor = "bg-gray-200 text-gray-800";

  if (color === "success") bgColor = "bg-green-200 text-green-800";
  if (color === "error") bgColor = "bg-red-200 text-red-800";

  return (
    <span className={`px-2 py-1 rounded text-sm font-semibold ${bgColor}`}>
      {children}
    </span>
  );
}
