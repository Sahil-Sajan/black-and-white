"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const products = [
    { id: 1, name: "VGOD Mix Iced Blue Razz Freebase E-Liquid 60ml", price: 2550, oldPrice: 3000, img: "/cards/card1.webp", sale: "-15%" },
    { id: 2, name: "VGOD Mix Iced Bubble Grapes Freebase E-Liquid 60ml", price: 2550, oldPrice: 3000, img: "/cards/card2.webp", sale: "-15%" },
    { id: 3, name: "VGOD Mix Iced Bubble Watermelon Freebase E-Liquid", price: 2550, oldPrice: 3000, img: "/cards/card3.jpg", sale: "-15%" },
    { id: 4, name: "Juice Head Extra Freeze Apple Watermelon 100ml", price: 3825, oldPrice: 4500, img: "/cards/card4.jpg", sale: "-15%" },
    { id: 5, name: "Vapetasia Killer Kustard Strawberry 60ml", price: 2800, oldPrice: 3200, img: "/cards/card5.webp", sale: "-10%" },
    { id: 6, name: "Nasty Juice Cush Man Mango 60ml", price: 2600, oldPrice: 3100, img: "/cards/card6.webp", sale: "-12%" },
];

const ProductGrid = () => {
    const { addToCart } = useCart();
    return (
        /* FIXED: Set to max-w-[91.66%] (11/12) as requested */
        <section className="mx-auto max-w-[91.66%] px-4 py-16">

            {/* --- Section Header: Matches Bento Style --- */}
            <div className="relative mb-16 flex items-center justify-center">
                <div className="absolute h-[1px] w-full bg-zinc-100"></div>
                <div className="relative bg-white px-10 flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-2">
                        Featured
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black">
                        Our Products
                    </h2>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => {
                    const slug = product.name
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, '');

                    return (
                        <div key={product.id} className="group flex flex-col">

                            {/* Image Wrapper */}
                            <Link href={`/collection/${slug}`} className="relative aspect-square w-full overflow-hidden bg-[#f9f9f9] rounded-sm block">
                                <div className="absolute left-3 top-3 z-10 bg-black px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest">
                                    SALE {product.sale}
                                </div>

                                <Image
                                    src={product.img}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                                />
                            </Link>

                            {/* Product Info */}
                            <div className="mt-6 flex flex-col flex-grow">
                                <Link href={`/collection/${slug}`}>
                                    <h3 className="text-[13px] font-bold text-zinc-800 line-clamp-2 min-h-[40px] leading-snug uppercase tracking-tight group-hover:text-red-600 transition-colors">
                                        {product.name}
                                    </h3>
                                </Link>

                                <div className="mt-3 flex items-center gap-3">
                                    <span className="text-lg font-black text-black">
                                        Rs.{product.price.toLocaleString()}
                                    </span>
                                    <span className="text-sm text-zinc-400 line-through font-medium">
                                        Rs.{product.oldPrice.toLocaleString()}
                                    </span>
                                </div>

                                {/* Add to Cart Button */}
                                <button 
                                    onClick={() => addToCart({ id: slug, name: product.name, price: product.price, image: product.img })}
                                    className="group/btn relative mt-6 w-full bg-black py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-zinc-800 flex items-center justify-center gap-2 overflow-hidden active:scale-95"
                                >
                                    <ShoppingCart size={14} strokeWidth={3} />
                                    <span className="relative">
                                        Add to Cart
                                        <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover/btn:w-full" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ProductGrid;