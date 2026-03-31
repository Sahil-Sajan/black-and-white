"use client";

import React from "react";
import {
  ChevronUp,
  ChevronDown,
  X,
  Edit2,
  ChevronDown as ChevronIcon,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import Image from "next/image";

const CartItems = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="w-full bg-white border border-zinc-200 p-12 text-center flex flex-col items-center justify-center">
        <h2 className="text-xl font-black uppercase tracking-widest text-black mb-4">
          Your Cart is Empty
        </h2>
        <p className="text-sm text-zinc-500 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <a
          href="/collection"
          className="bg-black text-white py-3 px-8 text-xs font-black uppercase tracking-[0.2em] transition-colors hover:bg-zinc-800"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-zinc-200">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 text-[11px] font-black uppercase tracking-widest text-black">
              <th className="text-left p-4 w-2/3">Product</th>
              <th className="text-center p-4 border-l border-zinc-200">
                Quantity
              </th>
              <th className="text-right p-4 border-l border-zinc-200">Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b border-zinc-200">
                <td className="p-6">
                  <div className="flex gap-6">
                    <div className="relative w-24 h-24 bg-white border border-zinc-100 p-2 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                      <h3 className="text-[13px] font-bold text-black uppercase leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-[14px] font-black text-black mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-4 hover:text-red-500 transition-colors"
                      >
                        <X size={12} /> Remove Item
                      </button>
                    </div>
                  </div>
                </td>
                <td className="p-6 border-l border-zinc-200 align-middle">
                  <div className="flex flex-col items-center mx-auto border border-zinc-800 w-10">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-zinc-100 transition-colors border-b border-zinc-800 w-full flex justify-center"
                    >
                      <ChevronUp size={12} />
                    </button>
                    <span className="py-2 text-xs font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-zinc-100 transition-colors border-t border-zinc-800 w-full flex justify-center"
                    >
                      <ChevronDown size={12} />
                    </button>
                  </div>
                </td>
                <td className="p-6 border-l border-zinc-200 text-right align-middle">
                  <span className="text-[16px] font-black text-black">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Note & Shipping Section */}
      <div className="p-6 border-t border-zinc-200">
        <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-black mb-8">
          <Edit2 size={14} /> Add a Note
        </button>

        <div className="space-y-4">
          <button className="flex items-center justify-between w-full text-[11px] font-black uppercase tracking-widest text-black border-b border-zinc-200 pb-2">
            Estimate Shipping & Tax <ChevronIcon size={16} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-black uppercase tracking-wider">
                Country
              </label>
              <select className="border border-zinc-300 p-3 text-xs focus:border-black outline-none transition-colors">
                <option>United States</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-black uppercase tracking-wider">
                State
              </label>
              <select className="border border-zinc-300 p-3 text-xs focus:border-black outline-none transition-colors">
                <option>State</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-black uppercase tracking-wider">
                Zip Code
              </label>
              <input
                type="text"
                className="border border-zinc-300 p-3 text-xs focus:border-black outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
