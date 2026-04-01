"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Plus, 
  ChevronLeft, 
  Trash2, 
  Image as ImageIcon,
  CheckCircle2,
  BadgeInfo,
  Tag,
  Layers,
  LayoutGrid
} from "lucide-react";

interface Variant {
  id: string;
  name: string;
  image: string | null;
}

import { BRANDS, CATEGORIES, MG_OPTIONS } from "@/src/lib/data";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "DISPOSABLE",
    mg: "",
    price: "",
    description: "",
    isInStock: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [variants, setVariants] = useState<Variant[]>([
    { id: Math.random().toString(36).substr(2, 9), name: "", image: null }
  ]);

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { id: Math.random().toString(36).substr(2, 9), name: "", image: null },
    ]);
  };

  const removeVariant = (id: string) => {
    if (variants.length > 1) {
      setVariants((prev) => prev.filter((v) => v.id !== id));
    }
  };

  const handleVariantNameChange = (id: string, name: string) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, name } : v))
    );
  };

  const handleVariantImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVariants((prev) =>
        prev.map((v) => (v.id === id ? { ...v, image: url } : v))
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        variants
      };
      
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setMessage({ type: "success", text: "Product saved successfully!" });
      
      // Reset form
      setFormData({
        name: "",
        brand: "",
        category: "DISPOSABLE",
        mg: "",
        price: "",
        description: "",
        isInStock: true,
      });
      setVariants([{ id: Math.random().toString(36).substr(2, 9), name: "", image: null }]);
      
    } catch (error: any) {
      console.error(error);
      setMessage({ type: "error", text: error.message || "Failed to save product" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-300 mx-auto pb-20 px-3 md:px-4 pt-5">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <Link 
            href="/dashboard/products"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors mb-3 group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Inventory</span>
          </Link>
          <h1 className="text-2xl md:text-[28px] font-black tracking-tight text-slate-900 leading-tight">
            New Product
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Configure catalogs, brands, and variations.
          </p>
        </div>

        <div className="flex items-center gap-3">
           <Link 
            href="/dashboard/products"
            className="px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-colors bg-white border border-slate-200"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg shadow-blue-50 disabled:opacity-50"
          >
            <CheckCircle2 size={16} /> {isLoading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Core Data */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section: Basic Details */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <BadgeInfo size={14} className="text-blue-500" />
                Product Information
              </h2>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Product Name</label>
                  <input 
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Frosty Blue Disposable"
                    className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm font-bold text-slate-800 focus:border-blue-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Brand</label>
                  <select 
                    name="brand"
                    required
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm font-bold text-slate-800 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Brand</option>
                    {BRANDS.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Nicotine Strength (MG)</label>
                  <select 
                    name="mg"
                    value={formData.mg}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm font-bold text-slate-800 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select MG</option>
                    {MG_OPTIONS.map(mg => (
                      <option key={mg} value={mg}>{mg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Description</label>
                <textarea 
                  name="description"
                  rows={8}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide a detailed description..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm font-medium text-slate-800 focus:border-blue-500 transition-all outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section: Variants */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <Layers size={14} className="text-orange-500" />
                Variations & Images
              </h2>
              <button
                type="button"
                onClick={addVariant}
                className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-[0.2em]"
              >
                <Plus size={14} /> Add New
              </button>
            </div>

            <div className="p-8 space-y-6">
              {variants.map((variant) => (
                <div key={variant.id} className="group p-6 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/30 transition-all relative">
                  {variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(variant.id)}
                      className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}

                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Variant Image */}
                    <div 
                      onClick={() => fileInputRefs.current[variant.id]?.click()}
                      className={`w-32 h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all shrink-0 bg-white ${
                        variant.image ? "border-blue-500" : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {variant.image ? (
                        <div className="relative w-full h-full p-2">
                          <Image src={variant.image} alt="Variant" fill className="object-contain" />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <ImageIcon size={20} className="text-slate-300" />
                          <span className="text-[10px] font-black text-slate-300 uppercase">Image</span>
                        </div>
                      )}
                      <input 
                        ref={el => { fileInputRefs.current[variant.id] = el }}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleVariantImageUpload(variant.id, e)}
                      />
                    </div>

                    {/* Variant Name */}
                    <div className="flex-1 space-y-2">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Variation Name / Flavor</label>
                      <input 
                        type="text"
                        required
                        value={variant.name}
                        onChange={(e) => handleVariantNameChange(variant.id, e.target.value)}
                        placeholder="e.g. Strawberry Ice"
                        className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm font-bold text-slate-800 focus:border-blue-500 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Meta & Pricing */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Card: Pricing */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <Tag size={14} className="text-emerald-500" />
                Pricing & InStock
              </h2>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Base Price ($)</label>
                <input 
                  type="number"
                  name="price"
                  required
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="24.99"
                  className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm font-black text-slate-800 focus:border-blue-500 transition-all outline-none"
                />
              </div>

              <div className="flex items-center justify-between py-4 border-y border-slate-50">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Stock</span>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, isInStock: !prev.isInStock }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      formData.isInStock ? "bg-emerald-500" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.isInStock ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Card: Category */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <LayoutGrid size={14} className="text-purple-500" />
                Classification
              </h2>
            </div>
            <div className="p-8">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Category Group</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm font-bold text-slate-800 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

      </form>
    </div>
  );
}
