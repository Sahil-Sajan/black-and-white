import React from 'react';

interface ShippingAddressProps {
    data: {
        firstName: string;
        lastName: string;
        email: string;
        phoneNo: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ShippingAddress = ({ data, onChange }: ShippingAddressProps) => {
    return (
        <div className="mb-10">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-black mb-6">1. SHIPPING ADDRESS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                    type="text" 
                    name="firstName"
                    placeholder="First Name" 
                    value={data.firstName}
                    onChange={onChange}
                    required
                    className="w-full border border-zinc-300 p-3 text-sm focus:border-black outline-none transition-colors"
                />
                <input 
                    type="text" 
                    name="lastName"
                    placeholder="Last Name" 
                    value={data.lastName}
                    onChange={onChange}
                    className="w-full border border-zinc-300 p-3 text-sm focus:border-black outline-none transition-colors"
                />
                <input 
                    type="email" 
                    name="email"
                    placeholder="Email Address" 
                    value={data.email}
                    onChange={onChange}
                    required
                    className="w-full border border-zinc-300 p-3 text-sm focus:border-black outline-none transition-colors md:col-span-2"
                />
                <input 
                    type="tel" 
                    name="phoneNo"
                    placeholder="Phone Number (e.g., 03211234567)" 
                    value={data.phoneNo}
                    onChange={onChange}
                    required
                    className="w-full border border-zinc-300 p-3 text-sm focus:border-black outline-none transition-colors md:col-span-2"
                />
                <input 
                    type="text" 
                    name="address"
                    placeholder="Street Address / House No / Apartment" 
                    value={data.address}
                    onChange={onChange}
                    required
                    className="w-full border border-zinc-300 p-3 text-sm focus:border-black outline-none transition-colors md:col-span-2"
                />
                <input 
                    type="text" 
                    name="city"
                    placeholder="City" 
                    value={data.city}
                    onChange={onChange}
                    required
                    className="w-full border border-zinc-300 p-3 text-sm focus:border-black outline-none transition-colors"
                />
                <select 
                    name="state"
                    value={data.state}
                    onChange={onChange}
                    required
                    className="w-full border border-zinc-300 p-3 text-sm focus:border-black outline-none transition-colors"
                >
                    <option value="" disabled>Select Province</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Sindh">Sindh</option>
                    <option value="KPK">Khyber Pakhtunkhwa (KPK)</option>
                    <option value="Balochistan">Balochistan</option>
                    <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                    <option value="Azad-Kashmir">Azad Kashmir</option>
                    <option value="Islamabad">Islamabad Capital Territory</option>
                </select>
                <input 
                    type="text" 
                    name="zipCode"
                    placeholder="ZIP/Postal Code (Optional)" 
                    value={data.zipCode}
                    onChange={onChange}
                    className="w-full border border-zinc-300 p-3 text-sm focus:border-black outline-none transition-colors md:col-span-2"
                />
            </div>
            
            <label className="flex items-center gap-2 mt-4 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 accent-black" defaultChecked />
                <span className="text-sm font-semibold text-zinc-800 group-hover:text-black transition-colors">
                    My billing address is the same as my shipping address
                </span>
            </label>
        </div>
    );
};

export default ShippingAddress;
