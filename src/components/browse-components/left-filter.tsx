"use client"
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const FilterSection = ({
    title,
    paramKey,
    options,
    isOpen: initialOpen = false,
    children
}: {
    title: string;
    paramKey?: string;
    options?: string[];
    isOpen?: boolean;
    children?: React.ReactNode;
}) => {
    const [isOpen, setIsOpen] = useState(initialOpen);
    const router = useRouter();
    const searchParams = useSearchParams();

    const activeValue = paramKey ? searchParams.get(paramKey) : null;

    const handleCheck = (opt: string) => {
        if (!paramKey) return;
        const params = new URLSearchParams(searchParams.toString());
        
        if (opt === "All") {
            params.delete(paramKey);
        } else if (activeValue === opt) {
            params.delete(paramKey);
        } else {
            params.set(paramKey, opt);
        }
        router.push(`/collection?${params.toString()}`, { scroll: false });
    };

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
                <div className="mt-5 space-y-3 max-h-60 overflow-y-auto pr-2 no-scrollbar animate-in fade-in slide-in-from-top-1 duration-200">
                    {/* All Option */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            className="peer hidden"
                            checked={!activeValue}
                            onChange={() => handleCheck("All")}
                        />
                        <div className="h-[14px] w-[14px] border border-zinc-300 rounded-[2px] peer-checked:bg-black peer-checked:border-black transition-all flex items-center justify-center">
                            <div className="h-1.5 w-1.5 bg-white rounded-full opacity-0 peer-checked:opacity-100" />
                        </div>
                        <span className="text-[13px] font-medium text-zinc-500 group-hover:text-black transition-colors">
                            All
                        </span>
                    </label>

                    {options.map((opt) => (
                        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                className="peer hidden"
                                checked={activeValue === opt}
                                onChange={() => handleCheck(opt)}
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

            {isOpen && children && (
                <div className="mt-5 animate-in fade-in slide-in-from-top-1 duration-200">
                    {children}
                </div>
            )}
        </div>
    );
};

export const ProductSidebar = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const [minPriceTemp, setMinPriceTemp] = useState(searchParams.get('minPrice') || '');
    const [maxPriceTemp, setMaxPriceTemp] = useState(searchParams.get('maxPrice') || '');

    const [brands, setBrands] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const res = await fetch('/api/products');
                if (res.ok) {
                    const data = await res.json();
                    if (data.products) {
                        const uniqueBrands = Array.from(new Set(data.products.map((p: any) => p.brand).filter(Boolean))) as string[];
                        const uniqueCats = Array.from(new Set(data.products.map((p: any) => p.category).filter(Boolean))) as string[];
                        setBrands(uniqueBrands.sort());
                        setCategories(uniqueCats.sort());
                    }
                }
            } catch (error) {
                console.error("Filter fetch error:", error);
            }
        };
        fetchFilters();
    }, []);

    const handlePriceFilter = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (minPriceTemp) params.set('minPrice', minPriceTemp); else params.delete('minPrice');
        if (maxPriceTemp) params.set('maxPrice', maxPriceTemp); else params.delete('maxPrice');
        router.push(`/collection?${params.toString()}`, { scroll: false });
    };

    const FilterContent = () => {
        const categoriesInUrl = searchParams.get('category')?.toLowerCase() || '';
        const isLiquidActive = categoriesInUrl.includes('liquid') || categoriesInUrl.includes('juice') || categoriesInUrl.includes('flavor');

        return (
            <>
                <FilterSection 
                    title="Brand" 
                    paramKey="brand"
                    isOpen={true} 
                    options={['OXVA', 'VOOPOO', 'VAPORESSO', 'UWLL', 'PAVA']} 
                />
                
                <FilterSection title="Price" isOpen={true}>
                    <form onSubmit={handlePriceFilter} className="flex gap-2 items-center">
                        <input 
                            type="number" 
                            value={minPriceTemp}
                            onChange={(e) => setMinPriceTemp(e.target.value)}
                            placeholder="Min" 
                            className="w-full text-xs p-3 border border-zinc-200 rounded-sm outline-none focus:border-black bg-zinc-50" 
                        />
                        <span className="text-zinc-400">-</span>
                        <input 
                            type="number"
                            value={maxPriceTemp}
                            onChange={(e) => setMaxPriceTemp(e.target.value)} 
                            placeholder="Max" 
                            className="w-full text-xs p-3 border border-zinc-200 rounded-sm outline-none focus:border-black bg-zinc-50" 
                        />
                        <button type="submit" className="bg-black text-white px-4 py-2.5 text-[10px] font-bold uppercase rounded-sm hover:bg-zinc-800 transition-colors">
                            Go
                        </button>
                    </form>
                </FilterSection>
                
                <FilterSection 
                    title="Product Type" 
                    paramKey="category"
                    options={categories} 
                />
                
                {isLiquidActive && (
                    <FilterSection 
                        title="Nicotine Strength" 
                        paramKey="mg"
                        options={['0mg', '3mg', '6mg', '12mg', '20mg', '25mg', '30mg', '35mg', '50mg', '55mg', '60mg']} 
                    />
                )}
                {isLiquidActive && (
                    <FilterSection 
                        title="Capacity" 
                        paramKey="capacity"
                        options={['10ml', '30ml', '60ml', '100ml', '120ml']} 
                    />
                )}
            </>
        );
    };

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

                    <div className="flex-1 overflow-y-auto px-5 pb-10 no-scrollbar">
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
            <aside className="w-64 flex-shrink-0 hidden lg:block sticky top-8 h-fit self-start overflow-y-auto max-h-[calc(100vh-4rem)] pr-4 no-scrollbar">
                <FilterContent />

                <style jsx global>{`
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;  /* IE and Edge */
                        scrollbar-width: none;  /* Firefox */
                    }
                `}</style>
            </aside>
        </>
    );
};