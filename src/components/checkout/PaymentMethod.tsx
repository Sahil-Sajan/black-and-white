"use client";

interface PaymentMethodProps {
    selected: string;
    accountNo: string;
    onSelect: (val: string) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const PaymentMethod = ({ selected, accountNo, onSelect, onChange }: PaymentMethodProps) => {

    return (
        <div className="mb-10">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-black mb-6">2. PAYMENT METHOD</h2>
            
            <div className="flex border border-zinc-200">
                {/* Cash on Delivery Tab */}
                <label 
                    className={`flex-1 flex items-center justify-center gap-2 p-4 border-b-2 cursor-pointer transition-all ${
                        selected === 'COD' ? 'border-b-red-600 bg-white' : 'border-b-transparent bg-zinc-50 hover:bg-zinc-100 text-zinc-500'
                    }`}
                >
                    <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="COD"
                        checked={selected === 'COD'}
                        onChange={(e) => onSelect(e.target.value)}
                        className="mt-0.5 w-4 h-4 accent-red-600" 
                    />
                    <span className={`text-sm font-bold uppercase ${selected === 'COD' ? 'text-black' : ''}`}>CASH ON DELIVERY</span>
                </label>

                {/* Bank Transfer Tab */}
                <label 
                    className={`flex-1 flex items-center justify-center gap-2 p-4 border-b-2 border-l border-zinc-200 cursor-pointer transition-all ${
                        selected === 'BANK_TRANSFER' ? 'border-b-red-600 bg-white' : 'border-b-transparent bg-zinc-50 hover:bg-zinc-100 text-zinc-500'
                    }`}
                >
                    <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="BANK_TRANSFER"
                        checked={selected === 'BANK_TRANSFER'}
                        onChange={(e) => onSelect(e.target.value)}
                        className="mt-0.5 w-4 h-4 accent-red-600" 
                    />
                    <span className={`text-sm font-bold uppercase ${selected === 'BANK_TRANSFER' ? 'text-black' : ''}`}>BANK TRANSFER</span>
                </label>
            </div>

            {/* Content Area */}
            <div className="border border-t-0 border-zinc-200 p-6 bg-white min-h-[120px]">
                {selected === 'COD' && (
                    <div className="text-sm text-zinc-600 leading-relaxed">
                        <p className="font-bold text-black mb-2 uppercase text-xs tracking-wider">Pay when you receive</p>
                        <p className="mb-4">You have selected Cash on Delivery. Please ensure you have the exact amount ready when our delivery partner arrives at your shipping address.</p>
                        <div className="bg-red-50 p-3 border border-red-100 text-red-700 text-xs font-bold uppercase">
                            Premium delivery fee of Rs. 250 applies for COD orders.
                        </div>
                    </div>
                )}

                {selected === 'BANK_TRANSFER' && (
                    <div className="text-sm text-zinc-600 leading-relaxed space-y-4">
                        <p className="font-bold text-black uppercase text-xs tracking-wider">Direct Bank Transfer</p>
                        <p>Make your payment directly into our bank account. Please provide your Account Number or IBAN below for verification. Your order will not be processed until the payment is verified.</p>
                        
                        <div className="bg-zinc-50 p-4 border border-zinc-100">
                            <p className="font-mono text-xs"><span className="font-bold text-black mr-2 uppercase tracking-wide">Bank Name:</span> Meezan Bank</p>
                            <p className="font-mono text-xs"><span className="font-bold text-black mr-2 uppercase tracking-wide">Account Title:</span> Black and White Vapors</p>
                            <p className="font-mono text-xs"><span className="font-bold text-black mr-2 uppercase tracking-wide">Account No:</span> 0000 1234 5678 9000</p>
                        </div>

                        <div className="mt-4">
                            <label className="block text-xs font-black uppercase tracking-widest text-black mb-2">Your Account/IBAN No (For Verification)</label>
                            <input 
                                type="text"
                                name="accountNo"
                                value={accountNo}
                                onChange={onChange}
                                placeholder="Enter your Account or IBAN number"
                                className="w-full border border-zinc-300 p-3 text-sm focus:border-black outline-none transition-colors"
                                required
                            />
                        </div>
                        
                        <div className="bg-green-50 p-3 border border-green-100 text-green-700 text-xs font-bold uppercase">
                            FREE DELIVERY for all Direct Bank Transfer orders!
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentMethod;
