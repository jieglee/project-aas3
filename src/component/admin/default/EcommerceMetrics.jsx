"use client";
import React from "react";
import Badge from "../../ui/Badge"; // pastikan shadcn badge sudah di-generate
import { FiArrowUp, FiArrowDown, FiBox } from "react-icons/fi"; // Feather icons


export const EcommerceMetrics = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">

      {/* Total Books */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
          <FiBox className="text-gray-800 size-6" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500">Total Buku</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm">1,240</h4>
          </div>
          <Badge color="success">
            <FiArrowUp />
            2.4%
          </Badge>
        </div>
      </div>

      {/* Available Books */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl">
          <FiBox className="text-green-600 size-6" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500">Buku Tersedia</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm">830</h4>
          </div>
          <Badge color="success">
            <FiArrowUp />
            1.2%
          </Badge>
        </div>
      </div>

      {/* Borrowed Books */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-xl">
          <FiBox className="text-yellow-600 size-6" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500">Buku Dipinjam</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm">410</h4>
          </div>
          <Badge color="error">
            <FiArrowDown className="text-error-500" />
            3.8%
          </Badge>
        </div>
      </div>

    </div>
  );
};
