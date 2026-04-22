"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductItem {
  name: string;
  sold: number;
  price: string;
  imageUrl: string;
}

const TopSellingProducts = ({ products: initialProducts }: { products?: ProductItem[] }) => {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts || []);
  const [isLoading, setIsLoading] = useState(!initialProducts);

  useEffect(() => {
    if (!initialProducts) {
      const fetchProducts = async () => {
        try {
          const res = await fetch("/api/dashboard/stats");
          const data = await res.json();
          if (data.recentProducts) {
            setProducts(data.recentProducts);
          }
        } catch (error) {
          console.error("Failed to fetch recent products", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProducts();
    } else {
        setProducts(initialProducts);
        setIsLoading(false);
    }
  }, [initialProducts]);

  return (
    <div className="bg-white p-3 md:p-4 rounded-2xl md:rounded-2xl border border-gray-100 shadow-sm w-full md:w-[320px] lg:w-95 flex flex-col min-h-105">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-black text-slate-800 tracking-tight">
          Recent Products
        </h3>
      </div>

      {/* Product List - Flex-1 makes it stretch to the "View All" button */}
      <div className="flex-1 space-y-6">
        {isLoading ? (
          // Skeleton Loading
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-4 animate-pulse">
              <div className="w-16 h-16 rounded-2xl bg-slate-100" />
              <div className="flex-1">
                <div className="h-4 bg-slate-100 rounded-lg w-3/4 mb-2" />
                <div className="h-3 bg-slate-100 rounded-lg w-1/2" />
              </div>
              <div className="w-16 h-4 bg-slate-100 rounded-lg" />
            </div>
          ))
        ) : products.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm font-bold">
            No products found
          </div>
        ) : (
          products.map((product, index) => (
            <div key={index} className="flex items-center gap-4 group cursor-default">
              {/* The Online Product Image */}
              <div className="w-16 h-16 rounded-2xl bg-gray-50/50 flex items-center justify-center p-2 border border-gray-100/50 overflow-hidden transition-all group-hover:border-blue-100 group-hover:bg-blue-50/30">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={56}
                  height={56}
                  className="object-contain h-full w-full transition-transform group-hover:scale-110"
                  unoptimized
                />
              </div>

              {/* Details */}
              <div className="flex-1 overflow-hidden">
                <p className="text-[14px] font-bold text-slate-900 leading-snug truncate group-hover:text-blue-600 transition-colors">
                  {product.name}
                </p>
                <p className="text-[11px] font-medium text-gray-400 mt-0.5">
                  {product.sold} units sold
                </p>
              </div>

              {/* Price */}
              <div className="text-right shrink-0">
                <p className="text-[15px] font-black text-slate-800">
                  {product.price}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Button at the bottom */}
      <Link
        href="/dashboard/products"
        className="block w-full text-center py-3.5 mt-8 bg-blue-50/50 text-[#4A90E2] text-xs font-bold uppercase tracking-widest rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors"
      >
        View All Products
      </Link>
    </div>
  );
};

export default TopSellingProducts;
