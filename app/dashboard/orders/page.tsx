"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Download,
  ChevronDown,
  Eye,
  Printer,
  Edit3,
  TrendingUp,
  BarChart2,
  Clock,
  Star,
  CreditCard,
  MoreVertical,
  Plus,
} from "lucide-react";
import StatCard from "@/src/components/admin-dashboard/sale-cards";

const ORDERS_DATA = [
  {
    id: "ORD-90231",
    customer: "Jordan Smith",
    initials: "JS",
    date: "Oct 24, 2023",
    amount: 124.5,
    payment: "Visa (**** 4242)",
    status: "PENDING",
  },
  {
    id: "ORD-90199",
    customer: "Elena Martinez",
    initials: "EM",
    date: "Oct 23, 2023",
    amount: 45.0,
    payment: "PayPal",
    status: "PAID",
  },
  {
    id: "ORD-90152",
    customer: "Marcus Chen",
    initials: "MC",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    date: "Oct 23, 2023",
    amount: 210.35,
    payment: "MasterCard",
    status: "SHIPPED",
  },
  {
    id: "ORD-90112",
    customer: "Lisa Brown",
    initials: "LB",
    date: "Oct 22, 2023",
    amount: 18.99,
    payment: "Cash",
    status: "CANCELLED",
  },
];

  const OrderManagementPage = () => {
    // Orders management logic here


  const getStatusStyles = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-100 text-amber-600";
      case "PAID":
        return "bg-emerald-100 text-emerald-600";
      case "SHIPPED":
        return "bg-blue-100 text-blue-600";
      case "CANCELLED":
        return "bg-slate-100 text-slate-500";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="w-full max-w-300 mx-auto pb-10 px-3 md:px-4 pt-5">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-[28px] font-black tracking-tight text-slate-900 mb-1">
            Order Management
          </h1>
          <p className="text-xs md:text-[13px] font-medium text-slate-500">
            Real-time overview of marketplace sales.
          </p>
        </div>
      </div>

      {/* --- SUMMARY STATS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="REVENUE"
          value="$4,290.00"
          icon={TrendingUp}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-500"
        />
        <StatCard
          title="AVG ORDER"
          value="$68.50"
          icon={BarChart2}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-500"
        />
        <StatCard
          title="PENDING ORDERS"
          value="12"
          icon={Clock}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-500"
        />
        <StatCard
          title="TOTAL ORDERS"
          value="50"
          icon={Star}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-500"
        />
      </div>

      {/* --- MAIN LISTING AREA --- */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">


        {/* 1. MOBILE CARD VIEW (md:hidden) */}
        <div className="grid grid-cols-1 gap-px md:hidden bg-slate-100">
          {ORDERS_DATA.map((order) => (
            <div key={order.id} className="bg-white p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-blue-600">
                  #{order.id}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-sm text-[8px] font-black uppercase tracking-widest ${getStatusStyles(order.status)}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {order.avatar ? (
                  <div className="relative w-10 h-10 border border-slate-100 rounded-full overflow-hidden">
                    <Image
                      src={order.avatar}
                      alt={order.customer}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-black border border-slate-100">
                    {order.initials}
                  </div>
                )}
                <div>
                  <p className="text-sm font-black text-slate-800">
                    {order.customer}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                    {order.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                    Total
                  </p>
                  <p className="text-base font-black text-slate-900">
                    ${order.amount.toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-slate-50 rounded-lg text-slate-400">
                    <Eye size={18} />
                  </button>
                  <button className="p-2 bg-slate-50 rounded-lg text-slate-400">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2. DESKTOP TABLE VIEW (md:block) */}
        <div className="hidden md:block w-full overflow-x-auto hide-scrollbar">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="border-b border-slate-100 bg-slate-50/50">
              <tr>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Order ID
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Customer
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Date
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Total
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Payment
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Status
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ORDERS_DATA.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="py-5 px-6">
                    <span className="text-xs font-black text-blue-600 hover:text-blue-700 cursor-pointer transition-colors">
                      #{order.id}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      {order.avatar ? (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-100 shadow-sm">
                          <Image
                            src={order.avatar}
                            alt={order.customer}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center text-[10px] font-black border border-slate-200">
                          {order.initials}
                        </div>
                      )}
                      <span className="text-xs font-black text-slate-800">
                        {order.customer}
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                      {order.date}
                    </p>
                  </td>
                  <td className="py-5 px-6">
                    <p className="text-sm font-black text-slate-900">
                      ${order.amount.toFixed(2)}
                    </p>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-2 bg-slate-50 w-fit px-3 py-1.5 rounded-lg border border-slate-100 group-hover:bg-white transition-colors">
                      <CreditCard size={12} className="text-slate-400" />
                      <span className="text-[10px] font-black text-slate-600 uppercase">
                        {order.payment}
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <span
                      className={`px-2 py-1 rounded-sm text-[8px] font-black uppercase tracking-widest ${getStatusStyles(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center justify-end gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all text-slate-400">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-all text-slate-400">
                        <Printer size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all text-slate-400">
                        <Edit3 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION AREA --- */}
        <div className="px-6 py-5 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 gap-4 bg-slate-50/20">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Showing 1-10 of 2,451
          </p>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-200 hover:bg-white transition-all shadow-sm">
              Prev
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 text-white font-black text-[11px] shadow-lg shadow-slate-200">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 font-black text-[11px] hover:bg-slate-100 transition-all">
              2
            </button>
            <button className="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-200 hover:bg-white transition-all shadow-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagementPage;
