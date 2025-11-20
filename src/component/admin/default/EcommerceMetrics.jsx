"use client";
import React from "react";
import Badge from "../../ui/Badge"; 
import { FiArrowUp, FiArrowDown, FiBox, FiClock } from "react-icons/fi";

const LibraryMetrics = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">

      {/* Buku Tersedia */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl">
          <FiBox className="text-green-600 text-2xl" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500">Buku Tersedia</span>
            <h4 className="mt-2 font-bold text-gray-800 text-xl">830</h4>
          </div>
          <Badge color="success">
            <FiArrowUp className="mr-1" />
            1.2%
          </Badge>
        </div>
      </div>

      {/* Buku Dipinjam */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-xl">
          <FiBox className="text-yellow-600 text-2xl" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500">Buku Dipinjam</span>
            <h4 className="mt-2 font-bold text-gray-800 text-xl">410</h4>
          </div>
          <Badge color="warning">
            <FiArrowDown className="mr-1" />
            3.8%
          </Badge>
        </div>
      </div>

      {/* Buku Terlambat Pengembalian */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl">
          <FiClock className="text-red-600 text-2xl" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500">Buku Terlambat</span>
            <h4 className="mt-2 font-bold text-gray-800 text-xl">25</h4>
          </div>
          <Badge color="error">
            <FiArrowDown className="mr-1" />
            2.5%
          </Badge>
        </div>
      </div>

    </div>
  );
};

export default LibraryMetrics;
