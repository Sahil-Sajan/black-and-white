"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, SlidersHorizontal, X } from 'lucide-react';

const FilterSection = ({
    title,
    options,
    isOpen: initialOpen = false
}: {
    title: string;
    options?: string[];
    isOpen?: boolean
}) => {
    const [isOpen, setIsOpen] = useState(initialOpen);

    return (
        <div className="border-b border-zinc-200 py-5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between group"
            >
                <span className="text-[14px] font-bold uppercase tracking-wider text-zinc-800 group-hover:text-black transition-colors">
                    {title}
                </span>
                {isOpen ? (
                    <ChevronDown size={18} className="text-zinc-400" strokeWidth={2.5} />
                ) : (
                    <ChevronRight size={18} className="text-zinc-400" strokeWidth={2.5} />
                )}
            </button>

            {isOpen && options && (
                <div className="mt-5 space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar animate-in fade-in slide-in-from-top-1 duration-200">
                    {options.map((opt) => (
                        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                className="peer hidden"
                            />
                            <div className="h-[14px] w-[14px] border border-zinc-300 rounded-[2px] peer-checked:bg-black peer-checked:border-black transition-all flex items-center justify-center">
                                <div className="h-1.5 w-1.5 bg-white rounded-full opacity-0 peer-checked:opacity-100" />
                            </div>
                            <span className="text-[13px] font-medium text-zinc-500 group-hover:text-black transition-colors">
                                {opt}
                            </span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export const ProductSidebar = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const FilterContent = () => (
        <>
            <FilterSection
                title="Brand"
                isOpen={true}
                options={[
                    'Solaris', 'South', 'Spaceman', 'Suorin', 'SWFT',
                    'True Story', 'Tyson 2.0', 'Uwell', 'Vapengin'
                ]}
            />
            <FilterSection title="Price" />
            <FilterSection title="Product Type" />
            <FilterSection title="Starter Kit Type" />
            <FilterSection title="Capacity" />
            <FilterSection title="Nicotine Strength" />
            <FilterSection title="Flavor Profile" />
            <FilterSection title="Color" />
            <FilterSection title="Wattage" />
        </>
    );

    return (
        <>
            {/* --- MOBILE FILTER BUTTON --- */}
            <div className="lg:hidden w-full mb-6 flex justify-end">
                <button
                    onClick={() => setIsMobileOpen(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-zinc-200 rounded-md font-bold text-xs uppercase tracking-widest hover:bg-zinc-50 transition-colors"
                >
                    <SlidersHorizontal size={14} />
                    Filters
                </button>
            </div>

            {/* --- MOBILE DRAWER --- */}
            <div className={`fixed inset-0 z-[150] lg:hidden transition-opacity duration-300 ${isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />

                {/* Content */}
                <div className={`absolute right-0 top-0 h-full w-[85%] max-w-xs bg-white shadow-xl transition-transform duration-300 ease-out flex flex-col ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex items-center justify-between p-5 border-b border-zinc-100">
                        <span className="font-black uppercase tracking-tighter text-lg">Filters</span>
                        <button onClick={() => setIsMobileOpen(false)} className="p-1 hover:bg-zinc-100 rounded-full">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-5 pb-10 custom-scrollbar">
                        <FilterContent />
                    </div>

                    <div className="p-5 border-t border-zinc-100">
                        <button
                            onClick={() => setIsMobileOpen(false)}
                            className="w-full bg-black text-white py-4 font-bold text-xs uppercase tracking-widest rounded-sm"
                        >
                            View Results
                        </button>
                    </div>
                </div>
            </div>

            {/* --- DESKTOP SIDEBAR --- */}
            <aside className="w-64 flex-shrink-0 hidden lg:block sticky top-8 h-fit self-start overflow-y-auto max-h-[calc(100vh-4rem)] pr-4 custom-scrollbar">
                <FilterContent />

                <style jsx global>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: #f4f4f5;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #d4d4d8;
                        border-radius: 10px;
                    }
                `}</style>
            </aside>
        </>
    );
};