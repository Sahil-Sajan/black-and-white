"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  slug: string;
  mainImage?: string;
  images?: string[];
  productImage?: string;
  variants?: { name?: string; image?: string }[];
}

const SimilarProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          if (data.products) {
            // Pick 4 random or first products for "similar"
            setProducts(data.products.slice(0, 4));
          }
        }
      } catch (error) {
        console.error("Failed to fetch similar products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-16">
      <div className="relative mb-12">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-zinc-100"></div>
        </div>
        <div className="relative flex justify-start">
          <h2 className="bg-white pr-8 text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
            Similar Products
          </h2>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-zinc-300" size={32} />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 text-zinc-400 text-xs uppercase tracking-widest">
            No similar products found.
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const imageUrl =
              product.mainImage ||
              product.images?.[0] ||
              product.productImage ||
              product.variants?.[0]?.image ||
              "/cards/card6.webp";

            return (
              <Link
                href={`/collection/${product.slug}`}
                key={product._id}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative aspect-square w-full bg-[#f9f9f9] mb-4 overflow-hidden border border-zinc-100">
                  <span className="absolute top-2 right-2 text-[8px] font-bold uppercase text-[#00a896] border border-[#00a896] px-1 bg-white z-10">
                    New
                  </span>
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-[12px] font-bold text-zinc-800 uppercase tracking-tight line-clamp-2 px-2 h-8">
                  {product.name}
                </h3>
                <p className="mt-2 text-[14px] font-black text-black">
                  Rs.{product.price.toFixed(2)}
                </p>
                <div className="mt-2 flex items-center justify-center gap-1 text-[8px] text-black">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                  <span className="text-zinc-400 font-bold ml-1">(1)</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SimilarProducts;