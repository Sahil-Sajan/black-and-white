"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

interface ProductProps {
  name: string;
  price: number;
  slug: string;
  image?: string; // Made optional to allow the default online image
  isNew?: boolean;
  isInStock?: boolean;
}

export const ProductCard = ({
  name,
  price,
  slug,
  image = "/cards/card6.webp",
  isNew,
  isInStock = true,
}: ProductProps) => {
  const { addToCart } = useCart();

  return (
    <div className="group flex flex-col items-center text-center p-4 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-100 rounded-sm relative">
      <Link
        href={`/collection/${slug}`}
        className="w-full flex flex-col items-center grow"
      >
        {/* Image Container */}
        <div className="relative aspect-square w-full bg-[#f9f9f9] mb-6 overflow-hidden rounded-sm">
          {isNew && isInStock && (
            <span className="absolute top-3 right-3 z-10 text-[10px] font-black uppercase tracking-[0.2em] text-[#00a896] bg-white/80 px-2 py-1 backdrop-blur-sm">
              New
            </span>
          )}
          {!isInStock && (
            <span className="absolute top-3 right-3 z-10 text-[10px] font-black uppercase tracking-[0.2em] text-red-600 bg-white/80 px-2 py-1 backdrop-blur-sm">
              Sold Out
            </span>
          )}

          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-110 ${!isInStock ? 'opacity-40 grayscale' : ''}`}
          />
        </div>

        {/* Product Details Header */}
        <h3 className="text-[13px] font-bold text-zinc-800 line-clamp-2 min-h-10 px-2 leading-snug uppercase tracking-tight group-hover:text-blue-600 transition-colors">
          {name}
        </h3>
      </Link>

      <div className="flex flex-col items-center w-full mt-auto pt-4">
        <p className="text-lg font-black text-black">Rs.{price.toLocaleString()}</p>

        {/* Star Rating */}
        <div className="mt-3 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={10}
              fill="currentColor"
              className="text-black"
            />
          ))}
          <span className="ml-2 text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">
            (1 Review)
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart({ id: slug, name, price, image, variant: "Standard" })}
          disabled={!isInStock}
          className={`group/btn relative mt-6 w-full py-4 text-[9px] md:text-[11px] font-black uppercase tracking-[0.15em] overflow-hidden transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${
            isInStock 
            ? "bg-black text-white hover:bg-zinc-900" 
            : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
          }`}
        >
          <span className="relative z-10 flex items-center gap-2">
            {!isInStock ? null : <ShoppingCart size={12} className="md:w-3.5 md:h-3.5 transition-transform duration-300 group-hover/btn:-translate-y-1" strokeWidth={3} />}
            {isInStock ? "Add to Cart" : "Out of Stock"}
          </span>

          {/* Subtle Hover Slide Effect */}
          {isInStock && <div className="absolute inset-0 bg-zinc-800 translate-y-full transition-transform duration-300 group-hover/btn:translate-y-0" />}
        </button>
      </div>

    </div>
  );
};
