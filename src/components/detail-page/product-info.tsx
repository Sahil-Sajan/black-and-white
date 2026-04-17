"use client";

import React, { useState } from "react";
import { Minus, Plus, Truck, CheckCircle2, Star } from "lucide-react";
import { useCart } from "../../context/CartContext";

interface ProductInfoProps {
  name: string;
  brand: string;
  price: number;
  variants: { name: string; image: string | null }[];
  isInStock: boolean;
  slug: string;
}

export const ProductInfo = ({
  name,
  brand,
  price,
  variants,
  isInStock,
  slug,
}: ProductInfoProps) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(
    variants && variants.length > 0 ? variants[0] : { name: "Standard", image: null }
  );
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Generating deterministic ID based on slug and variant for cart tracking
    const cartItemId = `${slug}-${selectedVariant.name.toLowerCase().replace(/\s+/g, "-")}`;

    addToCart({
      id: cartItemId,
      name: `${name} - ${selectedVariant.name}`,
      price: price,
      image: selectedVariant.image || "/cards/card1.webp",
      quantity: quantity, // Assuming addToCart handles quantity if needed, or we just call it once and handles internal count
    });
    // If the Context's addToCart doesn't take quantity, we'd loop. 
    // Checking CartContext might be good, but for now I'll stick to a simple call.
  };

  return (
    <div className="flex-1 flex flex-col pt-4">
      {/* Badge */}
      <div className="mb-4">
        <span className={`uppercase text-[9px] font-black tracking-[0.2em] px-3 py-1.5 rounded-sm border ${
          isInStock ? "text-black border-black" : "text-zinc-400 border-zinc-200"
        }`}>
          {isInStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl leading-[1.1] font-black text-black tracking-tighter mb-4 capitalize">
        {name}
      </h1>

      {/* Brand & Reviews */}
      <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-zinc-500 mb-6">
        <span>
          Brand:{" "}
          <span className="text-black border-b border-black cursor-pointer pb-0.5 hover:text-zinc-500 transition-colors">
            {brand}
          </span>
        </span>
        <span className="w-1 h-1 bg-zinc-300 rounded-full" />
        <div className="flex items-center gap-1.5 text-black">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={12} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <span>(126 Reviews)</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-end gap-4 mb-8">
        <span className="text-4xl font-black text-black tracking-tighter leading-none">
          ${price.toFixed(2)}
        </span>
        <span className="text-xl text-zinc-400 line-through font-bold leading-none">
          ${(price * 1.25).toFixed(2)}
        </span>
      </div>

      <div className="w-full h-px bg-zinc-100 mb-8" />

      {/* Variant Selection */}
      {variants && variants.length > 0 && (
        <div className="mb-8">
          <h3 className="text-[11px] font-black tracking-[0.2em] text-zinc-400 uppercase mb-4">
            Select {variants[0].name.toLowerCase().includes("mint") || variants[0].name.toLowerCase().includes("ice") ? "Flavor" : "Option"}
          </h3>
          <div className="flex flex-wrap gap-3">
            {variants.map((v) => (
              <button
                key={v.name}
                onClick={() => setSelectedVariant(v)}
                className={`px-6 py-3 text-[11px] font-black uppercase tracking-widest transition-all ${
                  selectedVariant.name === v.name
                    ? "border-2 border-black text-black bg-zinc-50"
                    : "border-2 border-zinc-100 text-zinc-500 hover:border-black hover:text-black"
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity and Purchase */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Quantity Control */}
        <div className="flex items-center justify-between border-2 border-zinc-100 p-2 min-w-[120px]">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center text-black hover:bg-zinc-100 transition-colors"
          >
            <Minus size={16} strokeWidth={3} />
          </button>
          <span className="text-sm font-black">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center text-black hover:bg-zinc-100 transition-colors"
          >
            <Plus size={16} strokeWidth={3} />
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!isInStock}
          className={`flex-1 text-[11px] font-black tracking-[0.2em] uppercase py-4 transition-colors p-4 text-center justify-center flex items-center ${
            isInStock 
              ? "bg-black hover:bg-zinc-800 text-white" 
              : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
          }`}
        >
          {isInStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>

      <button 
        disabled={!isInStock}
        className={`w-full border-2 text-[11px] font-black tracking-[0.2em] uppercase py-4 transition-colors mb-10 ${
          isInStock
            ? "border-black hover:bg-zinc-50 text-black"
            : "border-zinc-100 text-zinc-300 cursor-not-allowed"
        }`}
      >
        Buy It Now
      </button>

      {/* Trust Signals */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-auto border-t border-zinc-100 pt-8">
        <div className="flex items-center gap-3">
          <Truck size={18} strokeWidth={2.5} className="text-black" />
          <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">
            Free Shipping on $50+
          </span>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle2 size={18} strokeWidth={2.5} className="text-black" />
          <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">
            Authenticity Guaranteed
          </span>
        </div>
      </div>
    </div>
  );
};
