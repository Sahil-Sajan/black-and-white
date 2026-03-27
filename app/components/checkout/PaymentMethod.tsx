"use client";

import React, { useState } from 'react';

const PaymentMethod = () => {
    const [selectedMethod, setSelectedMethod] = useState('cod');

    return (
        <div className="mb-10">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-black mb-6">3. PAYMENT METHOD</h2>
            
            <div className="flex border border-zinc-200">
                {/* Cash on Delivery Tab */}
                <label 
                    className={`flex-1 flex items-center justify-center gap-2 p-4 border-b-2 cursor-pointer transition-all ${
                        selectedMethod === 'cod' ? 'border-b-red-600 bg-white' : 'border-b-transparent bg-zinc-50 hover:bg-zinc-100 text-zinc-500'
                    }`}
                >
                    <input 
                        type="radio" 
                        name="payment_method" 
                        value="cod"
                        checked={selectedMethod === 'cod'}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="mt-0.5 w-4 h-4 accent-red-600" 
                    />
                    <span className={`text-sm font-bold uppercase ${selectedMethod === 'cod' ? 'text-black' : ''}`}>CASH ON DELIVERY</span>
                </label>

                {/* Bank Transfer Tab */}
                <label 
                    className={`flex-1 flex items-center justify-center gap-2 p-4 border-b-2 border-l border-zinc-200 cursor-pointer transition-all ${
                        selectedMethod === 'bank' ? 'border-b-red-600 bg-white' : 'border-b-transparent bg-zinc-50 hover:bg-zinc-100 text-zinc-500'
                    }`}
                >
                    <input 
                        type="radio" 
                        name="payment_method" 
                        value="bank"
                        checked={selectedMethod === 'bank'}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="mt-0.5 w-4 h-4 accent-red-600" 
                    />
                    <span className={`text-sm font-bold uppercase ${selectedMethod === 'bank' ? 'text-black' : ''}`}>BANK TRANSFER</span>
                </label>
            </div>

            {/* Content Area */}
            <div className="border border-t-0 border-zinc-200 p-6 bg-white min-h-[120px]">
                {selectedMethod === 'cod' && (
                    <div className="text-sm text-zinc-600 leading-relaxed">
                        <p className="font-bold text-black mb-2 uppercase text-xs tracking-wider">Pay when you receive</p>
                        You have selected Cash on Delivery. Please ensure you have the exact amount ready when our delivery partner arrives at your shipping address.
                    </div>
                )}

                {selectedMethod === 'bank' && (
                    <div className="text-sm text-zinc-600 leading-relaxed space-y-4">
                        <p className="font-bold text-black uppercase text-xs tracking-wider">Direct Bank Transfer</p>
                        <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                        
                        <div className="bg-zinc-50 p-4 border border-zinc-100">
                            <p className="font-mono text-xs"><span className="font-bold text-black mr-2 uppercase tracking-wide">Bank Name:</span> Meezan Bank</p>
                            <p className="font-mono text-xs"><span className="font-bold text-black mr-2 uppercase tracking-wide">Account Title:</span> Black and White Vapors</p>
                            <p className="font-mono text-xs"><span className="font-bold text-black mr-2 uppercase tracking-wide">Account No:</span> 0000 1234 5678 9000</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentMethod;
