"use client";

import React, { useState } from "react";

type Category = "New Arrivals" | "Best Selling" | "Liquids/Flavors";

const ProductSection = () => {
  const [activeTab, setActiveTab] = useState<Category>("New Arrivals");
  const categories: Category[] = [
    "New Arrivals",
    "Best Selling",
    "Liquids/Flavors",
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 font-sans">
      {/* Main Outer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">

        {/* Left Large Image Section - HIDDEN ON MOBILE */}
        <div className="hidden md:block md:col-span-4">
          <div className="h-[660px] overflow-hidden rounded-sm sticky top-4 bg-[#f9f9f9]">
            <img
              src="/categories/hh.jpg"
              alt="Promo Left"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Right Content Column - FULL WIDTH ON MOBILE */}
        <div className="col-span-12 md:col-span-8">
          {/* Top Row: 3 Banners */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <div className="overflow-hidden rounded-sm bg-[#f6f6f6] flex items-center justify-center aspect-[16/9] sm:aspect-auto">
              <img
                src="/categories/disposible2.jpg"
                alt="Disposable Vape"
                className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="overflow-hidden rounded-sm bg-[#f6f6f6] flex items-center justify-center aspect-[16/9] sm:aspect-auto">
              <img
                src="/categories/liquid1.jpg"
                alt="E-Liquid"
                className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="overflow-hidden rounded-sm bg-[#f6f6f6] flex items-center justify-center aspect-[16/9] sm:aspect-auto">
              <img
                src="/categories/sss.jpg"
                alt="Starter Kits"
                className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Filter Header Area */}
          <div className="mb-8 overflow-x-auto no-scrollbar">
            <div className="flex justify-center space-x-6 md:space-x-8 border-b border-gray-200 min-w-max md:min-w-0">
              {categories.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-[10px] md:text-sm font-bold uppercase tracking-wider transition-all relative ${activeTab === tab
                    ? "text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black"
                    : "text-gray-400 hover:text-gray-600"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="aspect-[4/5] bg-white mb-3 overflow-hidden rounded-sm relative border border-gray-100">
                  <img
                    src={`/cards/card${item}.${item <= 2 ? "webp" : "jpg"}`}
                    alt="Product"
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform p-2"
                  />
                  <span className="absolute top-2 left-2 bg-black text-white text-[9px] md:text-[10px] px-2 py-0.5 rounded-full">
                    -10%
                  </span>
                </div>
                <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-medium">
                  Brand Name
                </p>
                <h3 className="text-[10px] md:text-[11px] font-bold uppercase mt-1 leading-tight line-clamp-2">
                  Product Title Example {item}
                </h3>
                <div className="mt-2 flex flex-wrap items-baseline gap-1">
                  <p className="text-black font-bold text-xs md:text-sm">
                    Rs. 4,299
                  </p>
                  <span className="text-gray-400 line-through text-[9px] md:text-[10px] font-normal">
                    Rs. 4,799
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;