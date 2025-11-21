import React from "react";
import EcommerceMetrics from "../../component/admin/default/EcommerceMetrics";
import MonthlySalesChart from "../../component/admin/default/MonthlySalesChart";
import MonthlyTarget from "../../component/admin/default/MonthlyTarget";
import StatisticsChart from "../../component/admin/default/StatisticsChart";

export const metadata = {
  title: "Next.js E-commerce Dashboard | TailAdmin",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Ecommerce() {
  return (
    <div className="p-6 grid grid-cols-12 gap-6">
      {/* Kiri: Metrics + Sales Chart */}
      <div className="col-span-12 xl:col-span-8 space-y-6">
        <div className="bg-white rounded-xl shadow p-6">
          <EcommerceMetrics />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <MonthlySalesChart />
        </div>
      </div>

      {/* Kanan: Monthly Target */}
      <div className="col-span-12 xl:col-span-4 space-y-6">
        <div className="bg-white rounded-xl shadow p-6">
          <MonthlyTarget />
        </div>
      </div>

      {/* Bawah: Statistik Chart full-width */}
      <div className="col-span-12">
        <div className="bg-white rounded-xl shadow p-6">
          <StatisticsChart />
        </div>
      </div>
    </div>
  );
}