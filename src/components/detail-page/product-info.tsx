"use client";

import React, { useState } from "react";
import { 
  ShoppingCart, 
  Minus, 
  Plus, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  CheckCircle2
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

interface ProductInfoProps {
  product: {
    _id: string;
    name: string;
    brand: string;
    price: number;
    description: string;
    isInStock: boolean;
    slug: string;
    variants: {
      name: string;
      image: string | null;
      _id: string;
    }[];
  };
  onVariantChange?: (image: string | null) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, onVariantChange }) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    const variant = product.variants?.[selectedVariant];
    addToCart({
      id: variant ? `${product._id}-${variant._id}` : product._id,
      name: product.name,
      price: product.price,
      variant: variant?.name || '',
      image: variant?.image || "/cards/card1.webp",
      quantity: quantity
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const incrementQty = () => setQuantity(q => q + 1);
  const decrementQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  return (
    <div className="flex-1 space-y-8">
      {/* Brand & Title */}
      <div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2 block">
          {product.brand}
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">
          {product.name}
        </h1>
        <div className="flex items-center gap-2 mt-4">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${
            product.isInStock 
              ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
              : "bg-red-50 text-red-600 border-red-100"
          }`}>
            <CheckCircle2 size={12} />
            <span className="text-[10px] font-black uppercase tracking-wider">
              {product.isInStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-l border-slate-200 pl-3">
            SKU: BW-{product._id.slice(-6).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-4">
        <span className="text-3xl font-black text-slate-950">
          Rs {product.price.toLocaleString()}
        </span>
      </div>

      {/* Variants - only render if variants exist */}
      {product.variants && product.variants.length > 0 && (
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            Select Variant: <span className="text-slate-900">{product.variants[selectedVariant]?.name}</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {product.variants.map((v, idx) => (
              <button
                key={v._id}
                onClick={() => {
                  setSelectedVariant(idx);
                  if (onVariantChange) onVariantChange(v.image);
                }}
                className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border ${
                  selectedVariant === idx 
                  ? "bg-white text-black border-black shadow-sm" 
                  : "bg-white border-slate-200 text-slate-400 hover:border-black hover:text-black"
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & Add to Cart */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center justify-between bg-slate-50 border border-slate-100 p-2 rounded-2xl w-full sm:w-auto overflow-hidden">
            <button 
              onClick={decrementQty}
              className="w-10 h-10 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-600"
            >
              <Minus size={16} />
            </button>
            <span className="w-12 text-center font-black text-slate-900">{quantity}</span>
            <button 
              onClick={incrementQty}
              className="w-10 h-10 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-600"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.isInStock}
            className={`flex-1 relative group px-10 py-5 rounded-[20px] text-xs font-black uppercase tracking-[0.2em] transition-all overflow-hidden ${
              isAdded 
              ? "bg-emerald-500 text-white" 
              : "bg-black text-white hover:shadow-2xl hover:shadow-slate-300 hover:-translate-y-1"
            }`}
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.div 
                  key="check" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }}
                  className="flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={18} /> Added to Cart
                </motion.div>
              ) : (
                <motion.div 
                  key="cart" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }}
                  className="flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} /> Add to Cart
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
            <Truck size={20} />
          </div>
          <div>
             <p className="text-[11px] font-black text-slate-900 uppercase">Fast Delivery</p>
             <p className="text-[9px] font-bold text-slate-400">Within 24 Hours</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>
          <div>
             <p className="text-[11px] font-black text-slate-900 uppercase">Secure Payment</p>
             <p className="text-[9px] font-bold text-slate-400">100% Protected</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center">
            <RotateCcw size={20} />
          </div>
          <div>
             <p className="text-[11px] font-black text-slate-900 uppercase">Return Policy</p>
             <p className="text-[9px] font-bold text-slate-400">7 Day Exchange</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
