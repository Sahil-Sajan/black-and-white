'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data based on your screenshot
const products = [
    {
        name: "Caliburn G2 Pod Kit",
        sold: 124,
        price: "$34.99",
        imageUrl: "/cards/card5.webp",
    },
    {
        name: "Geekvape L200 Mod",
        sold: 98,
        price: "$72.50",
        imageUrl: "/cards/card3.jpg",
    },
    {
        name: "Naked 100 E-Liquid",
        sold: 85,
        price: "$18.99",
        imageUrl: "/cards/card2.webp",
    },
    {
        name: "Vaporesso XROS 3",
        sold: 76,
        price: "$29.99",
        imageUrl: "/cards/card1.webp",
    },
];

const TopSellingProducts = () => {
    return (
        <div className="bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 shadow-sm w-full md:w-[320px] lg:w-[380px] flex flex-col min-h-[420px]">

            {/* Header */}
            <div className="mb-8">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Top Selling Products</h3>
                <p className="text-[13px] font-medium text-slate-400 mt-0.5">Based on last 30 days performance.</p>
            </div>

            {/* Product List - Flex-1 makes it stretch to the "View All" button */}
            <div className="flex-1 space-y-6">
                {products.map((product, index) => (
                    <div key={index} className="flex items-center gap-4">
                        {/* The Online Product Image */}
                        <div className="w-16 h-16 rounded-2xl bg-gray-50/50 flex items-center justify-center p-2 border border-gray-100/50 overflow-hidden">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                width={56}
                                height={56}
                                className="object-contain" // Ensures the product fits inside the box
                                unoptimized // Use this prop for online images to bypass Next.js image optimization during development
                            />
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                            <p className="text-[14px] font-bold text-slate-900 leading-snug">{product.name}</p>
                            <p className="text-[11px] font-medium text-gray-400 mt-0.5">{product.sold} sold this month</p>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                            <p className="text-[15px] font-black text-slate-800">{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Button at the bottom */}
            <Link href="/admin/products" className="block w-full text-center py-3.5 mt-8 bg-blue-50/50 text-[#4A90E2] text-xs font-bold uppercase tracking-widest rounded-full border border-blue-100 hover:bg-blue-100 transition-colors">
                View All Products
            </Link>
        </div>
    );
};

export default TopSellingProducts;