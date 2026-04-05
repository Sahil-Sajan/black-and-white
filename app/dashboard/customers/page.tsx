"use client";

import React, { useState, useEffect } from "react";
import {
  Download,
  Mail,
  Eye,
  MoreHorizontal,
  Users,
  CreditCard,
  TrendingUp,
  MapPin,
  Package,
  Loader2,
  Phone,
} from "lucide-react";
import StatCard from "@/src/components/admin-dashboard/sale-cards";

interface Customer {
  email: string;
  name: string;
  phone: string;
  location: string;
  fullAddress: string;
  totalSpent: number;
  totalOrders: number;
  lastOrderDate: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [stats, setStats] = useState({ totalCustomers: 0, avgLTV: 0, activeCustomers: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("/api/customers");
        const data = await res.json();
        if (res.ok) {
          setCustomers(data.customers);
          setStats(data.stats);
        }
      } catch (err) {
        console.error("Failed to fetch customers:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
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
          value={stats.totalCustomers.toLocaleString()}
          icon={Users}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="TOTAL ORDERS"
          value={customers.reduce((sum, c) => sum + c.totalOrders, 0).toLocaleString()}
          icon={Package}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-500"
        />
        <StatCard
          title="AVERAGE LTV"
          value={`$${stats.avgLTV.toFixed(2)}`}
          icon={CreditCard}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="TOP SPENDER"
          value={customers.length > 0 ? `$${customers[0].totalSpent.toFixed(2)}` : "$0.00"}
          icon={TrendingUp}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* --- MAIN LISTING AREA --- */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">
        {/* 1. MOBILE CARD VIEW (md:hidden) */}
        <div className="grid grid-cols-1 gap-px md:hidden bg-slate-100">
          {isLoading ? (
            <div className="bg-white p-10 text-center">
              <Loader2 size={24} className="animate-spin text-blue-600 mx-auto mb-2" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading customers...</p>
            </div>
          ) : customers.length === 0 ? (
            <div className="bg-white p-10 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No customers found</p>
            </div>
          ) : (
            customers.map((customer, idx) => (
              <div key={idx} className="bg-white p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    ID-{(idx + 1).toString().padStart(5, "0")}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center text-xs font-black border border-slate-100 shrink-0">
                    {getInitials(customer.name)}
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
                      {customer.totalOrders} orders
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
            ))
          )}
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
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <Loader2 size={18} className="animate-spin text-blue-600 mx-auto" />
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No customer records yet</p>
                  </td>
                </tr>
              ) : (
                customers.map((customer, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center text-[10px] font-black border border-slate-200 shrink-0">
                          {getInitials(customer.name)}
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
                      <p className="text-[11px] font-bold text-slate-600 uppercase tracking-tight mb-1">
                        {customer.location}
                      </p>
                      <div className="flex items-center gap-1 text-slate-400">
                         <Phone size={10} />
                         <span className="text-[10px] font-medium tracking-tight">{customer.phone}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <span className="inline-block bg-slate-100 px-3 py-1 rounded-sm text-[10px] font-black text-slate-700">
                        {customer.totalOrders}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-right">
                      <p className="text-sm font-black text-slate-800">
                        ${customer.totalSpent.toFixed(2)}
                      </p>
                    </td>
                    <td className="py-5 px-6">
                      <p className="text-[11px] font-medium text-slate-400 uppercase tracking-tight">
                        {formatDate(customer.lastOrderDate)}
                      </p>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
