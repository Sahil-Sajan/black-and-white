import React from 'react';

const ShippingAddress = () => {
    return (
        <div className="mb-10">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-black mb-6">1. SHIPPING ADDRESS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                    type="text" 
                    placeholder="First Name" 
                    className="w-full border border-zinc-300 p-3 text-sm focus:border-black outline-none transition-colors"
                />
                <input 
                    type="text" 
                    placeholder="Last Name" 
                    className="w-full border border-zinc-300 p-3 text-sm focus:border-black outline-none transition-colors"
                />
                <input 
                    type="text" 
                    placeholder="Street Address" 
                    className="w-full border border-zinc-300 p-3 text-sm focus:border-black outline-none transition-colors md:col-span-2"
                />
                <input 
                    type="text" 
                    placeholder="City" 
                    className="w-full border border-zinc-300 p-3 text-sm focus:border-black outline-none transition-colors"
                />
                <select className="w-full border border-zinc-300 p-3 text-sm focus:border-black outline-none transition-colors">
                    <option value="" disabled selected>State/Province</option>
                    <option>California</option>
                    <option>New York</option>
                    <option>Texas</option>
                </select>
                <input 
                    type="text" 
                    placeholder="ZIP/Postal Code" 
                    className="w-full border border-zinc-300 p-3 text-sm focus:border-black outline-none transition-colors"
                />
                <select className="w-full border border-zinc-300 p-3 text-sm focus:border-black outline-none transition-colors">
                    <option value="" disabled selected>Country</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                </select>
            </div>
            
            <label className="flex items-center gap-2 mt-4 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 accent-black" />
                <span className="text-sm font-semibold text-zinc-800 group-hover:text-black transition-colors">
                    My billing address is the same as my shipping address
                </span>
            </label>
        </div>
    );
};

export default ShippingAddress;
