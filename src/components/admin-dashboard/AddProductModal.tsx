"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { X, UploadCloud, Image as ImageIcon } from 'lucide-react';

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddProduct: (product: any) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onAddProduct }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'DISPOSABLE',
        sku: '',
        price: '',
        stock: '',
        status: 'PUBLISHED'
    });
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create a fake URL for preview
            const url = URL.createObjectURL(file);
            setImagePreview(url);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Generate a random ID
        const newId = Math.floor(Math.random() * 900000) + 100000;
        
        const newProduct = {
            id: newId.toString(),
            name: formData.name,
            category: formData.category,
            sku: formData.sku,
            price: parseFloat(formData.price || '0'),
            stock: parseInt(formData.stock || '0', 10),
            maxStock: Math.max(parseInt(formData.stock || '0', 10) * 2, 100), // arbitrary max stock for the bar
            status: formData.status,
            image: imagePreview || "/cards/card1.webp" // fallback image
        };

        onAddProduct(newProduct);
        
        // Reset and close
        setFormData({
            name: '', category: 'DISPOSABLE', sku: '', price: '', stock: '', status: 'PUBLISHED'
        });
        setImagePreview(null);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h2 className="text-lg font-black text-slate-800">Add New Product</h2>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Form Body */}
                <div className="flex-1 overflow-y-auto p-6">
                    <form id="add-product-form" onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Image Upload Area */}
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Product Image</label>
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 cursor-pointer transition-colors ${
                                    imagePreview ? 'border-blue-500 bg-blue-50/50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'
                                }`}
                            >
                                {imagePreview ? (
                                    <div className="relative w-32 h-32 rounded-xl overflow-hidden shadow-sm bg-white border border-slate-200">
                                        <Image src={imagePreview} alt="Preview" fill className="object-contain p-2" unoptimized />
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                                            <UploadCloud size={24} className="text-blue-500" />
                                        </div>
                                        <p className="text-sm font-bold text-slate-700 mb-1">Click to upload an image</p>
                                        <p className="text-xs font-medium text-slate-400">PNG, JPG or WEBP (Max 5MB)</p>
                                    </>
                                )}
                                <input 
                                    ref={fileInputRef} 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={handleImageUpload} 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product Name */}
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Product Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Frosty Blue Disposable 5000" 
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Category</label>
                                <select 
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                                >
                                    <option value="DISPOSABLE">Disposable</option>
                                    <option value="KITS">Kits</option>
                                    <option value="E-LIQUID">E-Liquid</option>
                                    <option value="ACCESSORIES">Accessories</option>
                                </select>
                            </div>

                            {/* SKU */}
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">SKU</label>
                                <input 
                                    type="text" 
                                    name="sku"
                                    required
                                    value={formData.sku}
                                    onChange={handleChange}
                                    placeholder="e.g. FBD-5000-BLU" 
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all uppercase"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Price ($)</label>
                                <input 
                                    type="number" 
                                    name="price"
                                    required
                                    step="0.01"
                                    min="0"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="24.99" 
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                />
                            </div>

                            {/* Stock */}
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Initial Stock</label>
                                <input 
                                    type="number" 
                                    name="stock"
                                    required
                                    min="0"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="e.g. 150" 
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                />
                            </div>

                            {/* Status */}
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Visibility Status</label>
                                <div className="flex gap-4">
                                    <label className={`flex-1 flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${formData.status === 'PUBLISHED' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                                        <input type="radio" name="status" value="PUBLISHED" checked={formData.status === 'PUBLISHED'} onChange={handleChange} className="w-4 h-4 text-blue-600" />
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">Published</p>
                                            <p className="text-[10px] text-slate-500">Visible on the storefront immediately</p>
                                        </div>
                                    </label>
                                    <label className={`flex-1 flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${formData.status === 'DRAFT' ? 'border-orange-500 bg-orange-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                                        <input type="radio" name="status" value="DRAFT" checked={formData.status === 'DRAFT'} onChange={handleChange} className="w-4 h-4 text-orange-500" />
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">Draft</p>
                                            <p className="text-[10px] text-slate-500">Hide from the storefront for now</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                    <button 
                        type="button" 
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        form="add-product-form"
                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200 transition-colors"
                    >
                        Save Product
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AddProductModal;
