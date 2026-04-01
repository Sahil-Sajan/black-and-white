"use client";

import React from "react";
import {
  Download,
  Mail,
  Eye,
  MoreHorizontal,
  Users,
  UserCheck,
  CreditCard,
  TrendingUp,
  MapPin,
  Package,
} from "lucide-react";
import StatCard from "@/src/components/admin-dashboard/sale-cards";

const CUSTOMERS_DATA = [
  {
    id: "CUS-70231",
    name: "Jordan Smith",
    initials: "JS",
    email: "jordan.smith@example.com",
    location: "New York, USA",
    orders: 12,
    totalSpent: 1245.5,
    lastOrder: "Oct 24, 2023",
    status: "ACTIVE",
  },
  {
    id: "CUS-70199",
    name: "Elena Martinez",
    initials: "EM",
    email: "elena.m@example.com",
    location: "Miami, USA",
    orders: 3,
    totalSpent: 245.0,
    lastOrder: "Oct 23, 2023",
    status: "ACTIVE",
  },
  {
    id: "CUS-70152",
    name: "Marcus Chen",
    initials: "MC",
    email: "m.chen89@example.com",
    location: "Toronto, CAN",
    orders: 1,
    totalSpent: 89.99,
    lastOrder: "Sep 15, 2023",
    status: "INACTIVE",
  },
  {
    id: "CUS-70112",
    name: "Lisa Brown",
    initials: "LB",
    email: "lisa.brown@example.com",
    location: "London, UK",
    orders: 24,
    totalSpent: 3418.99,
    lastOrder: "Oct 22, 2023",
    status: "ACTIVE",
  },
];

export default function CustomersPage() {
  return (
    <div className="w-full max-w-300 mx-auto pb-10 px-3 md:px-4 pt-5">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-[28px] font-black tracking-tight text-slate-900 mb-1">
            Customers
          </h1>
          <p className="text-xs md:text-[13px] font-medium text-slate-500">
            Manage your global customer database.
          </p>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-4 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm shrink-0">
          <Download size={18} /> Export CSV
        </button>
      </div>

      {/* --- SUMMARY STATS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="TOTAL CUSTOMERS"
          value="1,204"
          icon={Users}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="ACTIVE"
          value="892"
          icon={UserCheck}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-500"
        />
        <StatCard
          title="AVERAGE LTV"
          value="$450.25"
          icon={CreditCard}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="NEW THIS MONTH"
          value="145"
          icon={TrendingUp}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* --- MAIN LISTING AREA --- */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">
        {/* 1. MOBILE CARD VIEW (md:hidden) */}
        <div className="grid grid-cols-1 gap-px md:hidden bg-slate-100">
          {CUSTOMERS_DATA.map((customer) => (
            <div key={customer.id} className="bg-white p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                  {customer.id}
                </span>
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${customer.status === "ACTIVE" ? "bg-emerald-500" : "bg-slate-300"}`}
                  />
                  <span
                    className={`text-[9px] font-black uppercase tracking-widest ${customer.status === "ACTIVE" ? "text-emerald-500" : "text-slate-400"}`}
                  >
                    {customer.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center text-xs font-black border border-slate-100 shrink-0">
                  {customer.initials}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-black text-slate-800 truncate">
                    {customer.name}
                  </p>
                  <p className="text-[10px] font-medium text-slate-500 truncate lowercase">
                    {customer.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <MapPin size={10} /> Location
                  </p>
                  <p className="text-xs font-bold text-slate-700">
                    {customer.location}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <Package size={10} /> Orders
                  </p>
                  <p className="text-xs font-bold text-slate-700">
                    {customer.orders} orders
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                    Total Spent
                  </p>
                  <p className="text-base font-black text-slate-900">
                    ${customer.totalSpent.toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-slate-50 rounded-lg text-slate-400">
                    <Mail size={16} />
                  </button>
                  <button className="p-2 bg-slate-50 rounded-lg text-slate-400">
                    <Eye size={16} />
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
                  CUSTOMER
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  LOCATION
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">
                  ORDERS
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">
                  TOTAL SPENT
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  LAST ORDER
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  STATUS
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CUSTOMERS_DATA.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center text-[10px] font-black border border-slate-200 shrink-0">
                        {customer.initials}
                      </div>
                      <div>
                        <span className="text-xs font-black text-slate-800 block mb-0.5">
                          {customer.name}
                        </span>
                        <span className="text-[10px] font-medium text-slate-500 lowercase">
                          {customer.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <p className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                      {customer.location}
                    </p>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <span className="inline-block bg-slate-100 px-3 py-1 rounded-sm text-[10px] font-black text-slate-700">
                      {customer.orders}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <p className="text-sm font-black text-slate-800">
                      ${customer.totalSpent.toFixed(2)}
                    </p>
                  </td>
                  <td className="py-5 px-6">
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-tight">
                      {customer.lastOrder}
                    </p>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${customer.status === "ACTIVE" ? "bg-emerald-500" : "bg-slate-300"}`}
                      />
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest ${customer.status === "ACTIVE" ? "text-emerald-500" : "text-slate-400"}`}
                      >
                        {customer.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center justify-end gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all text-slate-400">
                        <Mail size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all text-slate-400">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-all text-slate-400">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
