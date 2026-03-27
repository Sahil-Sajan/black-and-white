"use client";

import React, { useState } from 'react';
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
    CreditCard
} from 'lucide-react';

const ORDERS_DATA = [
    {
        id: "ORD-90231",
        customer: "Jordan Smith",
        initials: "JS",
        date: "Oct 24, 2023",
        amount: 124.50,
        payment: "Visa (**** 4242)",
        status: "PENDING",
    },
    {
        id: "ORD-90199",
        customer: "Elena Martinez",
        initials: "EM",
        date: "Oct 23, 2023",
        amount: 45.00,
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
    }
];

const OrderManagementPage = () => {
    const [activeTab, setActiveTab] = useState('All Orders');

    const tabs = [
        { name: 'All Orders', count: '2,451' },
        { name: 'Pending', count: '12' },
        { name: 'Processing', count: '45' },
        { name: 'Shipped', count: '89' },
        { name: 'Completed', count: '2,305' },
    ];

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'PENDING': return 'bg-amber-100 text-amber-600';
            case 'PAID': return 'bg-emerald-100 text-emerald-600';
            case 'SHIPPED': return 'bg-blue-100 text-blue-600';
            case 'CANCELLED': return 'bg-slate-100 text-slate-500';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        /* Updated width to 11/12 (91.66%) on desktop */
        <div className="w-full lg:max-w-[91.66%] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:pb-10 transition-all duration-300">

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-8 sm:mb-12">
                <div className="space-y-1">
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">Order Management</h1>
                    <p className="text-sm sm:text-base font-medium text-slate-500">Real-time overview of your marketplace sales and logistics.</p>
                </div>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-200 bg-white px-6 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm active:scale-95">
                    <Download size={18} /> Export CSV
                </button>
            </div>

            {/* Main Content Area */}
            <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-[2.5rem] shadow-sm mb-10 overflow-hidden">

                {/* Tabs & Filters */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-slate-100 px-6 sm:px-8 py-0 gap-4">
                    <div className="flex gap-8 overflow-x-auto w-full pt-5 lg:pt-0 scrollbar-hide">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.name;
                            return (
                                <button
                                    key={tab.name}
                                    onClick={() => setActiveTab(tab.name)}
                                    className={`relative pb-5 text-sm font-bold transition-colors whitespace-nowrap ${isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-800'}`}
                                >
                                    {tab.name} {tab.count && <span className="opacity-50 text-xs ml-1">({tab.count})</span>}
                                    {isActive && (
                                        <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-blue-600 rounded-t-full" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-4 lg:h-16 lg:pl-8 lg:border-l border-slate-100 self-end lg:self-auto shrink-0 py-4 lg:py-0">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sort By</span>
                        <button className="flex items-center gap-2 text-sm font-bold text-slate-700 group">
                            Latest <ChevronDown size={14} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="border-b border-slate-100 bg-slate-50/30">
                            <tr>
                                <th className="py-5 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Order ID</th>
                                <th className="py-5 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Customer</th>
                                <th className="py-5 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                                <th className="py-5 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Total</th>
                                <th className="py-5 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Payment</th>
                                <th className="py-5 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                <th className="py-5 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {ORDERS_DATA.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="py-6 px-8">
                                        <span className="text-sm font-bold text-blue-600 hover:underline cursor-pointer">#{order.id}</span>
                                    </td>
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-3">
                                            {order.avatar ? (
                                                <img src={order.avatar} alt={order.customer} className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100" />
                                            ) : (
                                                <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-black border border-slate-200">
                                                    {order.initials}
                                                </div>
                                            )}
                                            <span className="text-sm font-bold text-slate-800">{order.customer}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-8">
                                        <p className="text-[13px] font-bold text-slate-600">{order.date}</p>
                                    </td>
                                    <td className="py-6 px-8">
                                        <p className="text-sm font-black text-slate-900">${order.amount.toFixed(2)}</p>
                                    </td>
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-2 bg-slate-50 w-fit px-3 py-1.5 rounded-lg border border-slate-100">
                                            <CreditCard size={14} className="text-slate-400" />
                                            <span className="text-[12px] font-bold text-slate-600">{order.payment}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-8">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${getStatusStyles(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-6 px-8">
                                        <div className="flex items-center justify-end gap-4 text-slate-300">
                                            <button className="hover:text-blue-600 transition-colors"><Eye size={18} /></button>
                                            <button className="hover:text-amber-500 transition-colors"><Printer size={18} /></button>
                                            <button className="hover:text-slate-900 transition-colors"><Edit3 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-8 py-6 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 gap-4 bg-slate-50/20">
                    <p className="text-xs sm:text-[13px] font-bold text-slate-400 uppercase tracking-wider">Showing 1-10 of 2,451</p>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 border border-slate-200 hover:bg-white hover:shadow-sm transition-all">Prev</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 text-white font-bold text-sm shadow-lg shadow-slate-200">1</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 font-bold hover:bg-white hover:border-slate-200 border border-transparent transition-all">2</button>
                        <button className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 border border-slate-200 hover:bg-white hover:shadow-sm transition-all">Next</button>
                    </div>
                </div>
            </div>

            {/* Bottom Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <SummaryCard title="TODAY'S REVENUE" value="$4,290.00" subtext="+12.5% vs yesterday" icon={<TrendingUp size={20} />} color="emerald" />
                <SummaryCard title="AVERAGE ORDER" value="$68.50" subtext="Stable vs last week" icon={<BarChart2 size={20} />} color="blue" />
                <SummaryCard title="PENDING ORDERS" value="12" subtext="Immediate action" icon={<Clock size={20} />} color="amber" />
                <SummaryCard title="TOP CATEGORY" value="Disposables" subtext="42% of total sales" icon={<Star size={20} />} color="purple" />
            </div>
        </div>
    );
};

// Internal Component for Cleanliness
const SummaryCard = ({ title, value, subtext, icon, color }: any) => {
    const colors: any = {
        emerald: "bg-emerald-50 text-emerald-500",
        blue: "bg-blue-50 text-blue-500",
        amber: "bg-amber-50 text-amber-500",
        purple: "bg-purple-50 text-purple-500"
    };

    return (
        <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm transition-all hover:shadow-md group">
            <div className="flex justify-between items-start mb-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 leading-tight">{title}</p>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${colors[color]}`}>
                    {icon}
                </div>
            </div>
            <p className="text-3xl font-black text-slate-900 mb-2">{value}</p>
            <p className={`text-[11px] font-bold ${color === 'emerald' ? 'text-emerald-500' : 'text-slate-400'}`}>{subtext}</p>
        </div>
    );
};

export default OrderManagementPage;