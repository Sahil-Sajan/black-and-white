"use client";

import React, { useState } from 'react';
import {
    Download,
    ChevronDown,
    Eye,
    Mail,
    MoreHorizontal,
    Users,
    UserCheck,
    CreditCard,
    TrendingUp
} from 'lucide-react';

// 1. Defined Interface
interface SummaryCardProps {
    title: string;
    value: string | number;
    subtext: string;
    subColor: string;
    icon: React.ReactNode;
}

// 2. Applied Interface to the component
const SummaryCard = ({ title, value, subtext, subColor, icon }: SummaryCardProps) => (
    <div className="bg-white rounded-2xl md:rounded-[2rem] p-6 border border-slate-200 shadow-sm flex flex-col justify-between h-32">
        <div className="flex justify-between items-start">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{title}</p>
            <div className="text-slate-400">{icon}</div>
        </div>
        <div>
            <p className="text-2xl md:text-3xl font-black text-slate-800 mb-1">{value}</p>
            <p className={`text-[11px] font-bold ${subColor}`}>{subtext}</p>
        </div>
    </div>
);

const CUSTOMERS_DATA = [
    {
        id: "CUS-70231",
        name: "Jordan Smith",
        initials: "JS",
        email: "jordan.smith@example.com",
        location: "New York, USA",
        orders: 12,
        totalSpent: 1245.50,
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
        totalSpent: 245.00,
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
    }
];

const CustomersPage = () => {
    const [activeTab, setActiveTab] = useState('All Customers');

    const tabs = [
        { name: 'All Customers', count: '1,204' },
        { name: 'Active', count: '892' },
        { name: 'Inactive', count: '312' },
    ];

    return (
        <div className="w-full lg:max-w-[91.66%] mx-auto px-4 md:px-6 py-6 md:pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl md:text-[28px] font-black tracking-tight text-slate-900 mb-1">Customers</h1>
                    <p className="text-[13px] font-medium text-slate-500">Manage and view your customer base and their purchasing history.</p>
                </div>
                <button className="flex items-center justify-center gap-2 border border-slate-200 bg-white px-5 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm w-full md:w-auto">
                    <Download size={16} /> Export CSV
                </button>
            </div>

            {/* Main Content Area */}
            <div className="bg-white border border-slate-200 rounded-2xl md:rounded-[2rem] shadow-sm mb-8 overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100">
                    <div className="flex gap-6 overflow-x-auto no-scrollbar px-6 pt-4 sm:pt-0">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.name;
                            return (
                                <button
                                    key={tab.name}
                                    onClick={() => setActiveTab(tab.name)}
                                    className={`relative pb-4 text-sm font-bold transition-colors whitespace-nowrap ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
                                        }`}
                                >
                                    {tab.name} {tab.count && <span className="opacity-60 text-xs ml-0.5">({tab.count})</span>}
                                    {isActive && (
                                        <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-blue-600 rounded-t-full" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-3 px-6 py-4 sm:py-0 sm:h-14 sm:border-l border-t sm:border-t-0 border-slate-100 bg-slate-50/30 sm:bg-transparent">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">SORT BY:</span>
                        <button className="flex items-center gap-2 text-sm font-bold text-slate-700">
                            Total Spent <ChevronDown size={14} className="text-slate-400" />
                        </button>
                    </div>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="border-b border-slate-100 bg-white">
                            <tr>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">CUSTOMER</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">LOCATION</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">ORDERS</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">TOTAL SPENT</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">LAST ORDER</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">STATUS</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {CUSTOMERS_DATA.map((customer) => (
                                <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="py-5 px-6 min-w-[240px]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-black border border-blue-100 shrink-0">
                                                {customer.initials}
                                            </div>
                                            <div>
                                                <span className="text-sm font-bold text-slate-800 block mb-0.5">{customer.name}</span>
                                                <span className="text-xs font-medium text-slate-500">{customer.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <p className="text-[13px] font-bold text-slate-600">{customer.location}</p>
                                    </td>
                                    <td className="py-5 px-6 text-center">
                                        <span className="inline-block bg-slate-100 px-3 py-1 rounded-full text-xs font-black text-slate-700">
                                            {customer.orders}
                                        </span>
                                    </td>
                                    <td className="py-5 px-6 text-right">
                                        <p className="text-sm font-black text-slate-800">${customer.totalSpent.toFixed(2)}</p>
                                    </td>
                                    <td className="py-5 px-6">
                                        <p className="text-[13px] font-medium text-slate-600">{customer.lastOrder}</p>
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${customer.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${customer.status === 'ACTIVE' ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                {customer.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="flex items-center justify-end gap-3 text-slate-400">
                                            <button className="hover:text-amber-500 transition-colors" title="Email"><Mail size={16} /></button>
                                            <button className="hover:text-blue-600 transition-colors" title="View"><Eye size={16} /></button>
                                            <button className="hover:text-slate-800 transition-colors" title="More"><MoreHorizontal size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-6 flex flex-col md:flex-row items-center justify-between border-t border-slate-100 gap-4">
                    <p className="text-[13px] font-medium text-slate-500">Showing 1 to 10 of 1,204 results</p>
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto justify-center">
                        <button className="hidden sm:block px-4 py-2 rounded-lg text-sm font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors">Previous</button>
                        <div className="flex items-center gap-1">
                            <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-500 text-white font-bold text-sm shadow-md shadow-blue-200">1</button>
                            <button className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 font-bold border border-transparent hover:border-slate-200 transition-all text-sm">2</button>
                            <button className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 font-bold border border-transparent hover:border-slate-200 transition-all text-sm">3</button>
                        </div>
                        <button className="hidden sm:block px-4 py-2 rounded-lg text-sm font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors">Next</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <SummaryCard title="TOTAL CUSTOMERS" value="1,204" subtext="+12% this month" subColor="text-emerald-500" icon={<Users size={18} />} />
                <SummaryCard title="ACTIVE CUSTOMERS" value="892" subtext="Purchased in last 30 days" subColor="text-slate-400" icon={<UserCheck size={18} className="text-blue-500" />} />
                <SummaryCard title="AVERAGE LTV" value="$450.25" subtext="+5.2% vs last year" subColor="text-emerald-500" icon={<CreditCard size={18} className="text-emerald-500" />} />
                <SummaryCard title="NEW THIS MONTH" value="145" subtext="Record high!" subColor="text-amber-500" icon={<TrendingUp size={18} className="text-purple-500" />} />
            </div>
        </div>
    );
};

export default CustomersPage;