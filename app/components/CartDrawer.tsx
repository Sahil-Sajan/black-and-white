"use client";

import React, { useEffect, useState } from 'react';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
    const { cartItems, removeFromCart, cartTotal } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!mounted) return null;

    return (
        <>
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Slide-out Drawer */}
            <div 
                className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-200">
                    <h2 className="text-sm font-black uppercase tracking-widest text-black flex items-center gap-2">
                        <ShoppingCart size={18} />
                        Your Cart ({cartItems.length})
                    </h2>
                    <button 
                        onClick={onClose}
                        className="text-zinc-400 hover:text-black transition-colors"
                    >
                        <X size={24} strokeWidth={2} />
                    </button>
                </div>

                {/* Cart Items Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                            <ShoppingCart size={48} strokeWidth={1} className="mb-4 text-zinc-300" />
                            <p className="text-xs font-medium uppercase tracking-wider">Your cart is empty</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="relative w-24 h-24 bg-[#f9f9f9] border border-zinc-100 rounded-sm shrink-0 overflow-hidden">
                                    <Image 
                                        src={item.image} 
                                        alt={item.name} 
                                        fill 
                                        className="object-contain p-2" 
                                    />
                                </div>
                                <div className="flex flex-col justify-center flex-grow">
                                    <Link href={`/collection/${item.id}`} onClick={onClose} className="hover:text-blue-600 transition-colors">
                                        <h3 className="text-[12px] font-bold text-black uppercase leading-snug line-clamp-2">
                                            {item.name}
                                        </h3>
                                    </Link>
                                    <div className="mt-2 flex items-center justify-between">
                                        <p className="text-[14px] font-black text-black">
                                            ${item.price.toFixed(2)}
                                        </p>
                                        <p className="text-[11px] font-bold text-zinc-400">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="mt-2 self-start flex items-center gap-1 text-[10px] font-bold text-red-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={12} /> Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer Actions */}
                {cartItems.length > 0 && (
                    <div className="p-6 border-t border-zinc-200 bg-zinc-50 space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Subtotal</span>
                            <span className="text-lg font-black text-black">${cartTotal.toFixed(2)}</span>
                        </div>
                        <p className="text-[10px] text-zinc-400 font-medium mb-4">
                            Shipping & taxes calculated at checkout
                        </p>
                        
                        <div className="grid grid-cols-1 gap-3">
                            <Link 
                                href="/checkout"
                                onClick={onClose}
                                className="w-full bg-[#cc0000] text-white text-center py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-colors hover:bg-red-700 shadow-sm"
                            >
                                Checkout
                            </Link>
                            <Link 
                                href="/cart"
                                onClick={onClose}
                                className="w-full bg-black text-white text-center py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-colors hover:bg-zinc-800"
                            >
                                View Cart
                            </Link>
                            <button 
                                onClick={onClose}
                                className="w-full bg-white text-zinc-600 border border-zinc-300 text-center py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-colors hover:bg-zinc-50 hover:text-black hover:border-black"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
