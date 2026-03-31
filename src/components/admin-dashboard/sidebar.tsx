'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutGrid,
    Package,
    ShoppingCart,
    Users,
    Wind,
    Menu,
    X,
} from 'lucide-react';

const Sidebar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { label: 'Dashboard', icon: LayoutGrid, href: '/dashboard' },
        { label: 'Products', icon: Package, href: '/dashboard/products' },
        { label: 'Orders', icon: ShoppingCart, href: '/dashboard/orders' },
        { label: 'Customers', icon: Users, href: '/dashboard/customers' },
    ];

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* --- MOBILE TOP BAR --- */}
            <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                        <Wind size={18} />
                    </div>
                    <span className="font-black text-[11px] uppercase tracking-widest text-slate-900">B&W Vapors</span>
                </div>
                <button
                    onClick={toggleSidebar}
                    className="p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                >
                    <Menu size={22} />
                </button>
            </div>

            {/* --- OVERLAY (Mobile only) --- */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* --- SIDEBAR --- */}
            <aside className={`
                /* Mobile: Fixed overlay slider */
                fixed inset-y-0 left-0 z-[70] w-[280px] bg-white border-r border-slate-100 flex flex-col
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}

                /* Desktop: Stick in place as a column */
                lg:relative lg:inset-auto lg:z-10 lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto hide-scrollbar
            `}>

                {/* Brand Header */}
                <div className="p-8 pb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-slate-950 rounded-[14px] flex-shrink-0 flex items-center justify-center text-white shadow-xl shadow-slate-200">
                            <Wind size={22} />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-sm font-black text-slate-900 leading-tight uppercase tracking-tight">
                                Black & White
                            </h2>
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest px-1.5 py-0.5 bg-blue-50 rounded-md w-fit mt-0.5">
                                Admin
                            </span>
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 space-y-1.5">
                    <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Main Menu</p>
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <NextLink
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`
                                    flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative
                                    ${isActive
                                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1'
                                    }
                                `}
                            >
                                <Icon
                                    size={20}
                                    strokeWidth={isActive ? 2.5 : 2}
                                    className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'}
                                />
                                <span className={`text-sm font-bold ${isActive ? 'text-white' : ''}`}>
                                    {item.label}
                                </span>
                                {isActive && (
                                    <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-blue-400" />
                                )}
                            </NextLink>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="p-4 mt-auto space-y-1.5 border-t border-slate-50">
                    <div className="pt-4 text-center">
                        <p className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.3em]">
                            v2.0.4 Sentinel Core
                        </p>
                    </div>
                </div>

                {/* Mobile Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden absolute top-8 right-6 p-2 text-slate-400 hover:text-slate-900 bg-slate-50 rounded-xl"
                >
                    <X size={20} />
                </button>
            </aside>
        </>
    );
};

export default Sidebar;