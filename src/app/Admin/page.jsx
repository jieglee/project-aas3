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
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />
        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>
    </div>
  );
}
