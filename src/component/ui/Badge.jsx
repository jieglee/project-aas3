"use client";

export default function Badge({ color = "gray", children }) {
  let bgColor = "bg-gray-200 text-gray-800";

  switch (color) {
    case "success":
      bgColor = "bg-green-200 text-green-800";
      break;
    case "error":
      bgColor = "bg-red-200 text-red-800";
      break;
    case "yellow":
      bgColor = "bg-yellow-200 text-yellow-800";
      break;
    case "blue":
      bgColor = "bg-blue-200 text-blue-800";
      break;
  }

  return (
    <span className={`px-2 py-1 rounded text-sm font-semibold ${bgColor}`}>
      {children}
    </span>
  );
}
