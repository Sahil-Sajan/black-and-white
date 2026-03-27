"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface ProductProps {
    name: string;
    price: number;
    image?: string; // Made optional to allow the default online image
    isNew?: boolean;
}

export const ProductCard = ({
    name,
    price,
    image = "/cards/card6.webp",
    isNew
}: ProductProps) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const { addToCart } = useCart();

    return (
        <div className="group flex flex-col items-center text-center p-4 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-100 rounded-sm relative">
            <Link href={`/collection/${slug}`} className="w-full flex flex-col items-center flex-grow">
                {/* Image Container */}
                <div className="relative aspect-square w-full bg-[#f9f9f9] mb-6 overflow-hidden rounded-sm">
                    {isNew && (
                        <span className="absolute top-3 right-3 z-10 text-[10px] font-black uppercase tracking-[0.2em] text-[#00a896] bg-white/80 px-2 py-1 backdrop-blur-sm">
                            New
                        </span>
                    )}

                    <Image
                        src={image}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                </div>

                {/* Product Details Header */}
                <h3 className="text-[13px] font-bold text-zinc-800 line-clamp-2 min-h-[40px] px-2 leading-snug uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                    {name}
                </h3>
            </Link>

            <div className="flex flex-col items-center w-full mt-2">
                <p className="text-lg font-black text-black">
                    ${price.toFixed(2)}
                </p>

                {/* Star Rating */}
                <div className="mt-3 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} fill="currentColor" className="text-black" />
                    ))}
                    <span className="ml-2 text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
                        (1 Review)
                    </span>
                </div>

                {/* Add to Cart Button */}
                <button 
                    onClick={() => addToCart({ id: slug, name, price, image })}
                    className="mt-6 w-full bg-black text-white py-4 text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 hover:bg-zinc-800 active:scale-95 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 translate-y-2 lg:group-hover:translate-y-0"
                >
                    <ShoppingCart size={14} strokeWidth={3} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};