"use client";

import React from "react";
import { useCart } from "../../context/CartContext";
import Link from "next/link";

const OrderSummary = () => {
  const { cartTotal, cartItems } = useCart();
  const hasItems = cartItems.length > 0;

  const shipping = hasItems ? 250.0 : 0;
  const total = cartTotal + shipping;

  return (
    <div className="w-full bg-zinc-50 border border-zinc-200">
      <div className="p-4 border-b border-zinc-200 bg-white">
        <h2 className="text-[11px] font-black uppercase tracking-widest text-black">
          Summary
        </h2>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-black text-black mb-4">Order Summary</h3>

        <div className="space-y-3 border-b border-zinc-200 pb-4 mb-4">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-zinc-600">Subtotal:</span>
            <span className="text-black">Rs.{cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs font-medium">
            <span className="text-zinc-600">Standard Delivery:</span>
            <span className="text-black">Rs.{shipping.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-between items-end mb-8">
          <span className="text-xl font-black uppercase tracking-tighter">
            Total:
          </span>
          <span className="text-2xl font-black">Rs.{total.toFixed(2)}</span>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/checkout"
            onClick={(e) => !hasItems && e.preventDefault()}
            className={`w-full py-4 text-[11px] text-center block font-black uppercase tracking-[0.2em] transition-colors ${
              hasItems
                ? "bg-[#1c1c1c] text-white hover:bg-black"
                : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
            }`}
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/collection"
            className="w-full block text-center bg-zinc-100 text-zinc-500 py-4 text-[11px] font-black uppercase tracking-[0.2em] border border-zinc-200 hover:bg-zinc-200 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
