"use client";

import React from 'react';
import { useCart } from '../../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

const OrderSummarySidebar = () => {
    const { cartItems, cartTotal } = useCart();
    
    // Derived values (just for display purposes to match design)
    const hasItems = cartItems.length > 0;
    const shipping = hasItems ? 0 : 0; // Using 0 to match the "Free" standard shipping layout shown
    const tax = cartTotal * 0.05; // 5% tax estimate
    const total = cartTotal + shipping + tax;

    return (
        <div className="bg-[#f0f0f0] border border-zinc-200 p-6 shadow-sm rounded-md relative overflow-hidden">
            {/* Background Texture/Design element placeholder */}
            <div className="absolute top-0 right-0 w-full h-[200px] opacity-10 bg-gradient-to-b from-gray-300 to-transparent pointer-events-none" />

            <h2 className="text-xl font-black uppercase tracking-tighter text-black mb-6 relative z-10">ORDER SUMMARY</h2>

            {/* Cart Items List */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 relative z-10 pr-2">
                {cartItems.length === 0 ? (
                    <p className="text-zinc-500 text-sm">Your cart is empty.</p>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4 p-3 bg-white/60 border border-white rounded-sm shadow-sm backdrop-blur-sm">
                            <div className="relative w-16 h-16 shrink-0 bg-white border border-zinc-100 rounded-sm overflow-hidden">
                                <Image 
                                    src={item.image} 
                                    alt={item.name} 
                                    fill 
                                    className="object-contain p-1" 
                                />
                            </div>
                            <div className="flex flex-col justify-center flex-grow">
                                <h3 className="text-[11px] font-bold text-red-700 uppercase leading-snug tracking-tight underline line-clamp-2">
                                    {item.name}
                                </h3>
                                <div className="mt-1 flex items-center justify-between">
                                    <p className="text-[11px] font-bold text-zinc-600">
                                        {item.quantity} &times; Rs. {item.price.toLocaleString()}
                                    </p>
                                    <p className="text-[12px] font-black text-black">
                                        Rs. {(item.price * item.quantity).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Totals */}
            <div className="space-y-2 border-t border-zinc-300 pt-4 mb-4 relative z-10">
                <div className="flex justify-between text-xs font-black uppercase tracking-wider">
                    <span className="text-zinc-600">SUBTOTAL</span>
                    <span className="text-black">Rs. {cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-xs font-black uppercase tracking-wider">
                    <span className="text-zinc-600">SHIPPING</span>
                    <span className="text-black">Rs. {shipping}</span>
                </div>
                <div className="flex justify-between text-xs font-black uppercase tracking-wider">
                    <span className="text-zinc-600">ESTIMATED TAX</span>
                    <span className="text-black">Rs. {tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
            </div>

            <div className="flex justify-between items-end border-t border-zinc-300 pt-4 mb-6 relative z-10">
                <span className="text-lg font-black uppercase tracking-tighter text-black">ORDER TOTAL</span>
                <span className="text-xl font-black text-red-600">
                    Rs. {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
            </div>

            {/* Discount Code */}
            <div className="flex gap-2 mb-6 relative z-10">
                <input 
                    type="text" 
                    placeholder="DISCOUNT CODE" 
                    className="flex-grow border border-zinc-300 px-3 py-2 text-xs font-medium focus:border-black outline-none transition-colors uppercase"
                />
                <button className="bg-black text-white px-6 py-2 text-xs font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors">
                    APPLY
                </button>
            </div>

            {/* Place Order Button */}
            <button 
                disabled={!hasItems}
                className={`w-full relative z-10 py-4 text-sm font-black uppercase tracking-[0.2em] transition-colors rounded-sm shadow-md ${
                    hasItems 
                    ? "bg-[#cc0000] text-white hover:bg-red-700 active:scale-[0.98]" 
                    : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
                }`}
            >
                PLACE ORDER
            </button>
        </div>
    );
};

export default OrderSummarySidebar;
