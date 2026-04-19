"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

interface RevenueData {
  name: string;
  revenue: number;
}

const RevenueForecastChart = ({ data }: { data?: RevenueData[] }) => {
  // Use provided data or fallback to empty default
  const chartData = data || [];

  return (
    /* Reduced padding from p-8 to p-5 on mobile */
    <div className="bg-white p-3 md:p-4 rounded-2xl md:rounded-2xl border border-gray-100 shadow-sm flex-1 flex flex-col h-full min-h-80 md:min-h-105">
      {/* Chart Header - Stacked on very small screens, row otherwise */}
      <div className="flex flex-row items-center justify-between mb-6 md:mb-8">
        <h3 className="text-lg md:text-xl font-black text-slate-800 tracking-tight">
          Revenue Forecast
        </h3>
        <span className="text-[9px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-gray-100/50">
          Last 6 Months
        </span>
      </div>

      {/* Actual Chart */}
      <motion.div
        /* Adjusted negative margins so chart touches the edges better on small screens */
        className="flex-1 -ml-4 md:-ml-6 -mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            /* Margin adjustment to prevent labels from cutting off */
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              /* Smaller font for mobile ticks */
              tick={{ fontSize: 9, fill: "#6B7280", fontWeight: "bold" }}
              interval={"preserveStartEnd"}
              padding={{ left: 10, right: 10 }}
            />

            <YAxis hide={true} />

            {/* Tooltip: simplified for touch devices */}
            <Tooltip
              cursor={{ stroke: "#10b981", strokeWidth: 1 }}
              contentStyle={{
                borderRadius: "0.75rem",
                border: "1px solid #E5E7EB",
                padding: "0.5rem",
                fontSize: "12px",
              }}
              labelStyle={{ fontWeight: "bold", color: "#111827" }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={2.5}
              fill="url(#colorRevenue)"
              isAnimationActive={true}
              animationDuration={1500}
            />

            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default RevenueForecastChart;
