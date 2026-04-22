"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

type Category = "New Arrivals" | "Best Selling" | "Liquids/Flavors";

interface Product {
  _id: string;
  name: string;
  slug: string;
  brand?: string;
  category?: string;
  price: number;
  isInStock: boolean;
  variants?: { name?: string; image?: string }[];
  mainImage?: string;
  images?: string[];
  productImage?: string;
  description?: string;
  createdAt?: string;
}

const ProductSection = () => {
  const [activeTab, setActiveTab] = useState<Category>("New Arrivals");
  const categories: Category[] = [
    "New Arrivals",
    "Best Selling",
    "Liquids/Flavors",
  ];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          if (data.products) {
            setProducts(data.products);
          }
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Compute categories
  const newArrivals = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 4);
  }, [products]);

  const bestSelling = useMemo(() => {
    const pool = products.filter(
      (p) => !newArrivals.some((na) => na._id === p._id)
    );
    // Shuffle the pool for "Best Selling" and pick 4
    return pool.sort(() => 0.5 - Math.random()).slice(0, 4);
  }, [products, newArrivals]);

  const liquids = useMemo(() => {
    return products.filter((p) => {
      const cat = p.category?.toLowerCase() || "";
      const name = p.name?.toLowerCase() || "";
      return (
        cat.includes("liquid") ||
        cat.includes("flavor") ||
        cat.includes("e-liquid") ||
        cat.includes("e-juice") ||
        name.includes("liquid") ||
        name.includes("flavor")
      );
    });
  }, [products]);

  const displayedProducts =
    activeTab === "New Arrivals"
      ? newArrivals
      : activeTab === "Best Selling"
        ? bestSelling
        : liquids;

  return (
    <div className="max-w-7xl mx-auto p-4 font-sans">
      {/* Main Outer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
        {/* Left Large Image Section - HIDDEN ON MOBILE */}
        <div className="hidden md:block md:col-span-4">
          <div className="h-[700px] rounded-sm sticky top-4 bg-[#f9f9f9]">
            <img
              src="/categories/hh.jpg"
              alt="Promo Left"
              className="w-full h-full object-cover "
            />
          </div>
        </div>

        {/* Right Content Column - FULL WIDTH ON MOBILE */}
        <div className="col-span-12 md:col-span-8">
          {/* Top Row: 3 Banners */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <Link href={`/collection?category=Disposable Device`} className="overflow-hidden rounded-sm bg-[#f6f6f6] flex items-center justify-center aspect-[16/9] sm:aspect-auto">
              <img
                src="/categories/disposible2.jpg"
                alt="Disposable Vape"
                className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </Link>

            <Link href={`/collection?category=Liquid`} className="overflow-hidden rounded-sm bg-[#f6f6f6] flex items-center justify-center aspect-[16/9] sm:aspect-auto">
              <img
                src="/categories/liquid1.jpg"
                alt="E-Liquid"
                className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </Link>

            <Link href={`/collection?category=Kits`} className="overflow-hidden rounded-sm bg-[#f6f6f6] flex items-center justify-center aspect-[16/9] sm:aspect-auto">
              <img
                src="/categories/sss.jpg"
                alt="Starter Kits"
                className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </Link>
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
          {loading ? (
            <div className="py-10 text-center text-sm text-gray-500">
              Loading products...
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="py-10 text-center text-sm text-gray-500">
              No products found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {displayedProducts.map((product) => {
                const imageUrl =
                  product.images?.[0] ||
                  product.productImage ||
                  product.mainImage ||
                  product.variants?.[0]?.image ||
                  "/cards/card1.webp";

                return (
                  <Link
                    href={`/collection/${product.slug}`}
                    key={product._id}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-[4/5] bg-white mb-3 overflow-hidden rounded-sm relative border border-gray-100 flex items-center justify-center">
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform p-2"
                      />
                    </div>
                    <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-medium line-clamp-1">
                      {product.brand || product.category || "Brand"}
                    </p>
                    <h3 className="text-[10px] md:text-[11px] font-bold uppercase mt-1 leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-black font-bold text-xs md:text-sm">
                        Rs. {product.price.toLocaleString()}
                      </p>
                      <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-400 group-hover:text-black transition-colors">
                        View
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
