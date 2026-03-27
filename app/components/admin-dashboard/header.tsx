'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Search, Bell, User } from 'lucide-react';

const AdminHeader = () => {
    const pathname = usePathname();

    const getTitle = () => {
        const path = pathname.split('/').pop();
        if (!path || path === 'admin' || path === 'dashboard') return 'Dashboard';

        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    return (
        <header className="h-20 w-full bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 lg:sticky top-0 z-10">
            {/* Left Side: Dynamic Title */}
            <div className="flex flex-col">
                <h1 className="text-lg md:text-xl font-black text-slate-800 leading-tight">
                    {getTitle()}
                </h1>
                {/* Hidden on mobile to save vertical space */}
                <p className="text-[11px] md:text-[13px] font-medium text-slate-400 mt-0.5 hidden sm:block">
                    Welcome back, Admin.
                </p>
            </div>

            {/* Right Side: Search & Profile */}
            <div className="flex items-center gap-3 md:gap-6">

                {/* Search Icon only on mobile, full bar on desktop */}
                <button className="p-2.5 md:hidden text-slate-600 hover:bg-gray-50 rounded-xl">
                    <Search size={20} />
                </button>

                {/* Desktop Search Bar */}
                <div className="relative hidden md:block w-48 lg:w-72 transition-all">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-11 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-400"
                    />
                </div>

                {/* Notifications */}
                <button className="relative p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                    <Bell size={20} className="text-slate-600" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {/* Vertical Divider - Hidden on very small screens */}
                <div className="h-8 w-px bg-gray-100 mx-1 hidden xs:block"></div>

                {/* User Profile */}
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="text-right hidden lg:block">
                        <p className="text-sm font-black text-slate-800 leading-none">Alex Rivera</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Super Admin</p>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 overflow-hidden border border-gray-100 cursor-pointer hover:border-slate-300 transition-colors">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;