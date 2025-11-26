"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import ChartTab from "../../ChartTab";

// Dynamic import ApexChart
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function StatisticsChart() {
    const [activeTab, setActiveTab] = useState("weekly");

    // ==========================
    //  OPTIONS (STATIC CONFIG)
    // ==========================
    const options = {
        legend: { show: false },
        colors: ["#465FFF", "#9CB9FF"],
        chart: {
            fontFamily: "Outfit, sans-serif",
            height: 260,
            type: "area",
            toolbar: { show: false },
        },
        stroke: { curve: "smooth", width: 2 },
        fill: {
            type: "gradient",
            gradient: { opacityFrom: 0.5, opacityTo: 0 },
        },
        markers: { size: 0, hover: { size: 4 } },
        grid: { yaxis: { lines: { show: true } }, xaxis: { lines: { show: false } } },
        dataLabels: { enabled: false },
        tooltip: { enabled: true },
        yaxis: { labels: { style: { fontSize: "10px", colors: ["#6B7280"] } } },
    };

    // ==========================
    //  WEEKLY CHART
    // ==========================
    const weeklyOptions = {
        ...options,
        xaxis: {
            categories: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { fontSize: "10px" } },
        },
    };

    const weeklySeries = [
        { name: "Peminjaman", data: [12, 15, 18, 13, 20, 17, 22] },
    ];

    // ==========================
    //  MONTHLY CHART
    // ==========================
    const monthlyOptions = {
        ...options,
        xaxis: {
            categories: [
                "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
                "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
            ],
            labels: { style: { fontSize: "10px" } },
        },
    };

    const monthlySeries = [
        { name: "Peminjaman", data: [140, 110, 120, 180, 200, 190, 210, 250, 240, 260, 280, 300] },
    ];

    // ==========================
    //  CURRENT CHART BASED ON TAB
    // ==========================
    const currentChart = {
        options: activeTab === "weekly" ? weeklyOptions : monthlyOptions,
        series: activeTab === "weekly" ? weeklySeries : monthlySeries,
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-white px-3 pb-3 pt-3 sm:px-4 sm:pt-4">
            {/* HEADER */}
            <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:justify-between">
                <div className="w-full">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                        Grafik Aktivitas Peminjaman
                    </h3>
                    <p className="mt-0.5 text-gray-500 text-[9px] dark:text-gray-400">
                        Aktivitas peminjaman berdasarkan minggu & bulan
                    </p>
                </div>

                {/* TAB (Weekly / Monthly) */}
                <div className="flex items-start w-full sm:justify-end">
                    <ChartTab active={activeTab} setActive={setActiveTab} />
                </div>
            </div>

            {/* CHART */}
            <div className="max-w-full overflow-x-auto custom-scrollbar">
                <div className="min-w-[800px] xl:min-w-full">
                    <ReactApexChart
                        options={currentChart.options}
                        series={currentChart.series}
                        type="area"
                        height={260}
                    />
                </div>
            </div>
        </div>
    );
}