"use client";

import React, { useState } from 'react';
import { Minus, Plus, Truck, CheckCircle2, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface ProductInfoProps {
    name: string;
}

export const ProductInfo = ({ name }: ProductInfoProps) => {
    const { addToCart } = useCart();
    const [selectedFlavor, setSelectedFlavor] = useState('Cool Mint');
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        // Generating deterministic ID based on name and flavor for cart tracking
        const cartItemId = `${name.replace(/\s+/g, '-').toLowerCase()}-${selectedFlavor.toLowerCase()}`;
        
        for(let i = 0; i < quantity; i++) {
            addToCart({
                id: cartItemId,
                name: `${name} - ${selectedFlavor}`,
                price: 14.99,
                image: "/cards/card1.webp",
            });
        }
    };

    return (
        <div className="flex-1 flex flex-col pt-4">
            {/* Badge */}
            <div className="mb-4">
                <span className="uppercase text-[9px] font-black tracking-[0.2em] text-black border border-black px-3 py-1.5 rounded-sm">
                    In Stock
                </span>
            </div>

            <h1 className="text-4xl md:text-5xl leading-[1.1] font-black text-black tracking-tighter mb-4 capitalize">
                {name}
            </h1>

            {/* Brand & Reviews */}
            <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-zinc-500 mb-6">
                <span>
                    Brand: <span className="text-black border-b border-black cursor-pointer pb-0.5 hover:text-zinc-500 transition-colors">VaporElite</span>
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
                <span className="text-4xl font-black text-black tracking-tighter leading-none">$14.99</span>
                <span className="text-xl text-zinc-400 line-through font-bold leading-none">$19.99</span>
            </div>

            <div className="w-full h-px bg-zinc-100 mb-8" />

            {/* Flavor Selection */}
            <div className="mb-8">
                <h3 className="text-[11px] font-black tracking-[0.2em] text-zinc-400 uppercase mb-4">Select Flavor</h3>
                <div className="flex flex-wrap gap-3">
                    {['Blue Razz', 'Cool Mint', 'Lush Ice', 'Peach Ice'].map((flavor) => (
                        <button 
                            key={flavor} 
                            onClick={() => setSelectedFlavor(flavor)}
                            className={`px-6 py-3 text-[11px] font-black uppercase tracking-widest transition-all ${
                                selectedFlavor === flavor 
                                    ? 'border-2 border-black text-black bg-zinc-50' 
                                    : 'border-2 border-zinc-100 text-zinc-500 hover:border-black hover:text-black'
                            }`}
                        >
                            {flavor}
                        </button>
                    ))}
                </div>
            </div>

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
                    className="flex-1 bg-black hover:bg-zinc-800 text-white text-[11px] font-black tracking-[0.2em] uppercase py-4 transition-colors p-4 text-center justify-center flex items-center"
                >
                    Add to Cart
                </button>
            </div>

            <button className="w-full border-2 border-black hover:bg-zinc-50 text-black text-[11px] font-black tracking-[0.2em] uppercase py-4 transition-colors mb-10">
                Buy It Now
            </button>

            {/* Trust Signals */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-auto border-t border-zinc-100 pt-8">
                <div className="flex items-center gap-3">
                    <Truck size={18} strokeWidth={2.5} className="text-black" />
                    <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">Free Shipping on $50+</span>
                </div>
                <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} strokeWidth={2.5} className="text-black" />
                    <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">Authenticity Guaranteed</span>
                </div>
            </div>
        </div>
    );
};