'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Download, ChevronDown, Filter, ChevronRight, ChevronLeft, Pencil, TrendingUp, Layers, AlertCircle, Package, Plus, MoreVertical } from 'lucide-react';

const PRODUCTS_DATA = [
    {
        id: "928374",
        name: "Frosty Blue Disposable 5000",
        category: "DISPOSABLE",
        sku: "FBD-5000-BLU",
        price: 24.99,
        stock: 142,
        maxStock: 200,
        status: "PUBLISHED",
        image: "/cards/card1.webp",
    },
    {
        id: "928312",
        name: "Titan Mod Kit Gen 3",
        category: "KITS",
        sku: "TIT-MK3-MTL",
        price: 89.00,
        stock: 12,
        maxStock: 50,
        status: "PUBLISHED",
        image: "/cards/card2.webp",
    },
    {
        id: "928455",
        name: "Strawberry Cloud 30ml",
        category: "E-LIQUID",
        sku: "STR-LIQ-30ML",
        price: 14.50,
        stock: 58,
        maxStock: 100,
        status: "DRAFT",
        image: "/cards/card3.jpg",
    },
    {
        id: "928001",
        name: "Zenith Mesh Coils (5pk)",
        category: "ACCESSORIES",
        sku: "ZEN-MSH-CSP",
        price: 19.99,
        stock: 2,
        maxStock: 50,
        status: "PUBLISHED",
        image: "/cards/card4.jpg",
    }
];

const ProductListingPage = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [products, setProducts] = useState(PRODUCTS_DATA);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const getCategoryStyles = (cat: string) => {
        switch (cat) {
            case 'DISPOSABLE': return 'bg-blue-100 text-blue-600';
            case 'KITS': return 'bg-purple-100 text-purple-600';
            case 'E-LIQUID': return 'bg-orange-100 text-orange-600';
            case 'ACCESSORIES': return 'bg-cyan-100 text-cyan-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const getStockColor = (stock: number, max: number) => {
        const ratio = stock / max;
        if (ratio > 0.5) return 'bg-emerald-500';
        if (ratio > 0.1) return 'bg-amber-500';
        return 'bg-red-500';
    };

    return (
        <div className="w-full max-w-[1200px] mx-auto pb-10 px-4 md:px-8 pt-6">

            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-2xl md:text-[28px] font-black tracking-tight text-slate-900 mb-1">Product Listing</h1>
                    <p className="text-xs md:text-[13px] font-medium text-slate-500">Manage inventory and status across all channels.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-8 w-full lg:w-auto">
                    <div className="flex gap-6 md:gap-8 w-full sm:w-auto justify-between sm:justify-start">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">TOTAL PRODUCTS</p>
                            <p className="text-lg md:text-xl font-black text-slate-800">{products.length}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">LOW STOCK</p>
                            <p className="text-lg md:text-xl font-black text-amber-500">{products.filter(p => p.stock < 15).length}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
                    >
                        <Plus size={18} /> Add Product
                    </button>
                </div>
            </div>

            {/* --- FILTERS --- */}
            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 mb-6">
                <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                    {/* Hide-scrollbar used here */}
                    <div className="flex w-full sm:w-auto overflow-x-auto bg-slate-50 border border-slate-200 rounded-full p-1 hide-scrollbar">
                        {['All', 'Published', 'Drafts'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 sm:flex-none whitespace-nowrap px-5 py-2 text-xs font-bold rounded-full transition-colors ${activeTab === tab ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none justify-center flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-50 shadow-sm">
                            <Filter size={14} /> Category <ChevronDown size={14} />
                        </button>
                        <button className="text-xs font-bold text-slate-400 hover:text-slate-600 ml-1">Clear</button>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full xl:w-auto">
                    <button className="flex-1 xl:flex-none justify-center flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-50 shadow-sm transition-colors">
                        Bulk Actions <ChevronDown size={14} />
                    </button>
                    <button className="flex items-center justify-center w-9 h-9 border border-slate-200 bg-white rounded-full text-slate-600 hover:bg-slate-50 shadow-sm transition-colors">
                        <Download size={16} />
                    </button>
                </div>
            </div>

            {/* --- LISTING AREA --- */}

            {/* 1. MOBILE CARD VIEW (Visible below md) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-slate-100 rounded-xl relative border border-slate-200 overflow-hidden p-2">
                                    <Image src={product.image} alt={product.name} fill className="object-contain" />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-800 leading-tight">{product.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">{product.sku}</p>
                                </div>
                            </div>
                            <button className="text-slate-400"><MoreVertical size={18} /></button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-50 mb-3">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">PRICE</p>
                                <p className="text-sm font-black text-slate-800">${product.price}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">STOCK</p>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-1 bg-slate-100 rounded-full">
                                        <div
                                            className={`h-full rounded-full ${getStockColor(product.stock, product.maxStock)}`}
                                            style={{ width: `${(product.stock / product.maxStock) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-[11px] font-black text-slate-800">{product.stock}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded-[4px] text-[9px] font-black uppercase tracking-widest ${getCategoryStyles(product.category)}`}>
                                {product.category}
                            </span>
                            <div className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${product.status === 'PUBLISHED' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{product.status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 2. DESKTOP TABLE VIEW (Visible on md and above) */}
            <div className="hidden md:block bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden mb-8">
                <div className="overflow-x-auto w-full hide-scrollbar">
                    <table className="w-full text-left min-w-[900px]">
                        <thead className="border-b border-slate-100 bg-slate-50/50">
                            <tr>
                                <th className="py-4 px-6 w-12"><input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600" /></th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">PRODUCT</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">CATEGORY</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">SKU</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">PRICE</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">STOCK LEVEL</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">STATUS</th>
                                <th className="py-4 px-6"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="py-5 px-6"><input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600" /></td>
                                    <td className="py-5 px-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-12 h-12 bg-slate-100 rounded-full flex-shrink-0 border border-slate-200 overflow-hidden flex items-center justify-center p-2">
                                                <Image src={product.image} alt={product.name} fill className="object-contain" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-800 mb-0.5">{product.name}</p>
                                                <p className="text-[10px] font-bold text-slate-400">ID: #{product.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <span className={`px-2 py-1 rounded-[4px] text-[9px] font-black uppercase tracking-widest ${getCategoryStyles(product.category)}`}>
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="py-5 px-6">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{product.sku}</p>
                                    </td>
                                    <td className="py-5 px-6">
                                        <p className="text-sm font-black text-slate-800">${product.price.toFixed(2)}</p>
                                    </td>
                                    <td className="py-5 px-6 min-w-[150px]">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${getStockColor(product.stock, product.maxStock)}`}
                                                    style={{ width: `${Math.min((product.stock / product.maxStock) * 100, 100)}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-black text-slate-800 w-6 text-right">{product.stock}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${product.status === 'PUBLISHED' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${product.status === 'PUBLISHED' ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                {product.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6 text-right">
                                        <button className="text-slate-300 hover:text-slate-600 transition-colors p-2">
                                            <Pencil size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- PAGINATION --- */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-6">
                <p className="text-[11px] font-medium text-slate-500">Showing <span className="font-bold text-slate-700">1 - 10</span> of <span className="font-bold text-slate-700">1,284</span></p>
                <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 border border-slate-200 hover:bg-slate-50 transition-colors"><ChevronLeft size={14} /></button>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 text-white font-bold text-xs">1</button>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors">2</button>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 border border-slate-200 hover:bg-slate-50 transition-colors"><ChevronRight size={14} /></button>
                </div>
            </div>
        </div>
    );
};

export default ProductListingPage;