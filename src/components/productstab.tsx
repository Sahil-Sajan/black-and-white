"use client";
import { useState } from "react";
import Image from "next/image";

const categories = [
    { image: "/categories/starter-kits.png", alt: "Starter Kits" },
    { image: "/categories/e-liquid.png", alt: "E-Liquid" },
    { image: "/categories/disposable.png", alt: "Disposable Vape" },
];

const tabs = [
    { id: "new", label: "New Arrivals" },
    { id: "best", label: "Best Selling" },
    { id: "sale", label: "Sale" },
];

export default function StoreFront() {
    const [activeTab, setActiveTab] = useState("new");

    return (
        <div className="w-full max-w-[1400px] mx-auto px-4 py-8 font-sans">
            {/* 1. TOP ROW: 3 Category Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        className="relative w-full aspect-[2.5/1] bg-[#f8f9fa] overflow-hidden rounded-sm group cursor-pointer"
                    >
                        <Image
                            src={cat.image}
                            alt={cat.alt}
                            fill
                            className="object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                ))}
            </div>

            {/* 2. MIDDLE ROW: Filter Tabs */}
            <div className="relative mb-10 border-b border-gray-200">
                <div className="flex justify-center items-center space-x-12">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-4 text-[16px] transition-colors relative ${isActive ? "text-[#333] font-bold" : "text-gray-500 hover:text-black"
                                    }`}
                            >
                                {tab.label}

                                {/* Active Indicator: Perfectly Aligned Green Line and Dot */}
                                {isActive && (
                                    <div className="absolute bottom-[-1px] left-0 w-full flex flex-col items-center">
                                        {/* The Green Line (sits exactly on the gray border) */}
                                        <div className="w-full h-[2.5px] bg-[#86C33C]" />

                                        {/* The small Dot centered under the line */}
                                        <div className="w-2 h-2 bg-[#86C33C] rounded-full mt-[-3px]" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 3. Products Grid */}
            <div className="text-center text-gray-400 py-10">
                {/* Your product cards will go here */}
            </div>
        </div>
    );
}