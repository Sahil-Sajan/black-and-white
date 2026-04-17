"use client";

import React from "react";
import { useCart } from "../../context/CartContext";
import Image from "next/image";
import Link from "next/link";

interface OrderSummarySidebarProps {
  cartTotal: number;
  deliveryCharges: number;
  totalAmount: number;
  paymentMethod: string;
  onPlaceOrder: () => void;
  isDisabled: boolean;
  loading: boolean;
}

const OrderSummarySidebar = ({
  cartTotal,
  deliveryCharges,
  totalAmount,
  paymentMethod,
  onPlaceOrder,
  isDisabled,
  loading,
}: OrderSummarySidebarProps) => {
  const { cartItems } = useCart();

  const hasItems = cartItems.length > 0;

  return (
    <div className="bg-[#f0f0f0] border border-zinc-200 p-6 shadow-sm rounded-md relative overflow-hidden">
      {/* Background Texture/Design element placeholder */}
      <div className="absolute top-0 right-0 w-full h-[200px] opacity-10 bg-gradient-to-b from-gray-300 to-transparent pointer-events-none" />

      <h2 className="text-xl font-black uppercase tracking-tighter text-black mb-6 relative z-10">
        ORDER SUMMARY
      </h2>

      {/* Cart Items List */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 relative z-10 pr-2">
        {cartItems.length === 0 ? (
          <p className="text-zinc-500 text-sm">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-3 bg-white/60 border border-white rounded-sm shadow-sm backdrop-blur-sm"
            >
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
          <span className="text-black">
            Rs. {cartTotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-xs font-black uppercase tracking-wider">
          <span className="text-zinc-600 font-bold">DELIVERY CHARGES {paymentMethod === "COD" ? "(COD)" : ""}</span>
          <span className="text-black">{deliveryCharges > 0 ? `Rs. ${deliveryCharges.toLocaleString()}` : "FREE"}</span>
        </div>
      </div>

      <div className="flex justify-between items-end border-t border-zinc-300 pt-4 mb-6 relative z-10">
        <span className="text-lg font-black uppercase tracking-tighter text-black">
          ORDER TOTAL
        </span>
        <span className="text-xl font-black text-red-600">
          Rs. {totalAmount.toLocaleString()}
        </span>
      </div>



      {/* Place Order Button */}
      <button
        onClick={onPlaceOrder}
        disabled={isDisabled || !hasItems}
        className={`w-full relative z-10 py-4 text-sm font-black uppercase tracking-[0.2em] transition-all rounded-sm shadow-md flex items-center justify-center gap-3 ${!isDisabled && hasItems
            ? "bg-[#cc0000] text-white hover:bg-red-700 active:scale-[0.98]"
            : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
          }`}
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        )}
        {loading ? "PROCESSING..." : "PLACE ORDER"}
      </button>
    </div>
  );
};

export default OrderSummarySidebar;
