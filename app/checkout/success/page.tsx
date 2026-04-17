"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

const SuccessContent = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    return (
        <div className="max-w-[600px] mx-auto text-center">
            <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center border-4 border-green-100 animate-bounce">
                    <CheckCircle className="text-green-500" size={48} strokeWidth={2.5} />
                </div>
            </div>

            <h1 className="text-4xl font-black uppercase tracking-tighter text-black mb-4">
                ORDER SUCCESSFUL!
            </h1>
            
            <p className="text-zinc-500 mb-10 leading-relaxed font-medium">
                Thank you for your purchase. We've received your order and are getting it ready for shipment. 
                A confirmation email has been sent to your provided address.
            </p>

            <div className="bg-[#f9f9f9] border-2 border-zinc-100 rounded-xl p-8 mb-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-200/20 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                
                <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">Order Identification</p>
                    <p className="text-2xl font-mono font-black text-black tracking-widest uppercase">
                        {orderId || "ORD-XXXX-XXXX"}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <Link 
                    href="/collection" 
                    className="flex items-center justify-center gap-3 bg-black text-white px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all rounded-sm shadow-lg active:scale-95"
                >
                    <Package size={16} />
                    Continue Shopping
                </Link>
                
                <Link 
                    href="/dashboard/orders" 
                    className="flex items-center justify-center gap-3 bg-white text-black border-2 border-black px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-zinc-50 transition-all rounded-sm shadow-sm active:scale-95"
                >
                    Track Order
                    <ArrowRight size={16} />
                </Link>
            </div>
            
            <p className="mt-12 text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                Black & White - Premium Vaping Experience
            </p>
        </div>
    );
};

export default function OrderSuccessPage() {
    return (
        <main className="min-h-screen bg-white py-24 px-4">
            <Suspense fallback={<div className="text-center py-20 font-black uppercase tracking-widest">Loading confirmation...</div>}>
                <SuccessContent />
            </Suspense>
        </main>
    );
}
