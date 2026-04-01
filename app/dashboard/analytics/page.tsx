"use client";
import {
  Download,
  TrendingUp,
  BarChart2,
  DollarSign,
  ShoppingCart,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { motion } from "framer-motion";

const REVENUE_DATA = [
  { name: "Jan", revenue: 4000, orders: 240 },
  { name: "Feb", revenue: 3000, orders: 198 },
  { name: "Mar", revenue: 5000, orders: 305 },
  { name: "Apr", revenue: 2780, orders: 150 },
  { name: "May", revenue: 6890, orders: 402 },
  { name: "Jun", revenue: 8390, orders: 530 },
  { name: "Jul", revenue: 7490, orders: 490 },
];

const CATEGORY_DATA = [
  { name: "Disposables", sales: 4000 },
  { name: "Kits", sales: 3000 },
  { name: "E-Liquids", sales: 2000 },
  { name: "Accessories", sales: 1500 },
];

const AnalyticsPage = () => {
  return (
    <div className="w-full max-w-300 mx-auto pb-10">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-black tracking-tight text-slate-900 mb-1">
            Analytics Overview
          </h1>
          <p className="text-[13px] font-medium text-slate-500">
            Insights and performance metrics for your store.
          </p>
        </div>
        <div className="flex gap-3">
          <select className="border border-slate-200 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 outline-none shadow-sm cursor-pointer">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
          <button className="flex items-center gap-2 border border-slate-200 bg-white px-5 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <p className="uppercase tracking-widest text-slate-400">
              TOTAL REVENUE
            </p>
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <DollarSign size={18} strokeWidth={2.5} />
            </div>
          </div>
          <p className="text-[28px] font-black text-slate-800 mb-1">
            $37,550.00
          </p>
          <p className="text-[11px] font-bold text-emerald-500">+14.2% var</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              TOTAL ORDERS
            </p>
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
              <ShoppingCart size={18} strokeWidth={2.5} />
            </div>
          </div>
          <p className="text-[28px] font-black text-slate-800 mb-1">2,315</p>
          <p className="text-[11px] font-bold text-emerald-500">+5.4% var</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              CONVERSION RATE
            </p>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <TrendingUp size={18} strokeWidth={2.5} />
            </div>
          </div>
          <p className="text-[28px] font-black text-slate-800 mb-1">3.8%</p>
          <p className="text-[11px] font-bold text-red-500">-1.2% var</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              AVERAGE ORDER VALUE
            </p>
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
              <BarChart2 size={18} strokeWidth={2.5} />
            </div>
          </div>
          <p className="text-[28px] font-black text-slate-800 mb-1">$86.20</p>
          <p className="text-[11px] font-bold text-emerald-500">+8.1% var</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Main Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col min-h-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight">
                Revenue Over Time
              </h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Last 7 Months
              </p>
            </div>
          </div>
          <motion.div
            className="flex-1 -ml-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={REVENUE_DATA}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b", fontWeight: 700 }}
                  padding={{ left: 20, right: 20 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b", fontWeight: 700 }}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip
                  cursor={{ stroke: "#3b82f6" }}
                  contentStyle={{
                    borderRadius: "1rem",
                    border: "none",
                    boxShadow:
                      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Sales by Category Bar Chart */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col min-h-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight">
                Sales by Category
              </h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Volume
              </p>
            </div>
          </div>
          <motion.div
            className="flex-1 -ml-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={CATEGORY_DATA}
                layout="vertical"
                margin={{ top: 0, right: 0, left: 20, bottom: 0 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#334155", fontWeight: 700 }}
                  width={80}
                />
                <Tooltip
                  cursor={{ fill: "#f1f5f9" }}
                  contentStyle={{
                    borderRadius: "1rem",
                    border: "none",
                    boxShadow:
                      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="sales"
                  fill="#8b5cf6"
                  radius={[0, 4, 4, 0]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>

      {/* Bottom Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">
            Top Selling Products
          </h3>
          <button className="text-xs font-bold text-blue-600 hover:text-blue-700">
            View All
          </button>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-white border-b border-slate-100">
              <tr>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  PRODUCT
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">
                  UNITS SOLD
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">
                  REVENUE
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">
                  TREND
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 text-sm font-bold text-slate-800">
                  Frosty Blue Disposable 5000
                </td>
                <td className="py-4 px-6 text-sm font-bold text-slate-600 text-right">
                  1,245
                </td>
                <td className="py-4 px-6 text-sm font-black text-emerald-600 text-right">
                  $31,112.55
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
                    <TrendingUp size={12} /> +12%
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 text-sm font-bold text-slate-800">
                  Titan Mod Kit Gen 3
                </td>
                <td className="py-4 px-6 text-sm font-bold text-slate-600 text-right">
                  432
                </td>
                <td className="py-4 px-6 text-sm font-black text-emerald-600 text-right">
                  $38,448.00
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
                    <TrendingUp size={12} /> +8%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
