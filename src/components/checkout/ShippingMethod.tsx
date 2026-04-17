"use client";

interface ShippingMethodProps {
    selected: string;
    onSelect: (val: string) => void;
}

const ShippingMethod = ({ selected, onSelect }: ShippingMethodProps) => {
    return (
        <div className="mb-10">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-black mb-6">2. SHIPPING METHOD</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Standard Method */}
                <label 
                    className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                        selected === 'standard' ? 'border-black bg-zinc-50' : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                >
                    <input 
                        type="radio" 
                        name="shipping_method" 
                        value="standard"
                        checked={selected === 'standard'}
                        onChange={(e) => onSelect(e.target.value)}
                        className="mt-1 w-4 h-4 accent-black" 
                    />
                    <div>
                        <p className="text-xs font-black uppercase tracking-wider text-black">STANDARD (3-5 DAYS)</p>
                        <p className="text-sm font-medium text-zinc-600 mt-1">Free</p>
                    </div>
                </label>

                {/* Express Method */}
                <label 
                    className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                        selected === 'express' ? 'border-black bg-zinc-50' : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                >
                    <input 
                        type="radio" 
                        name="shipping_method" 
                        value="express"
                        checked={selected === 'express'}
                        onChange={(e) => onSelect(e.target.value)}
                        className="mt-1 w-4 h-4 accent-black" 
                    />
                    <div>
                        <p className="text-xs font-black uppercase tracking-wider text-black">EXPRESS (1-2 DAYS)</p>
                        <p className="text-sm font-medium text-zinc-600 mt-1">Rs. 500</p>
                    </div>
                </label>

                {/* Priority Method */}
                <label 
                    className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                        selected === 'priority' ? 'border-black bg-zinc-50' : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                >
                    <input 
                        type="radio" 
                        name="shipping_method" 
                        value="priority"
                        checked={selected === 'priority'}
                        onChange={(e) => onSelect(e.target.value)}
                        className="mt-1 w-4 h-4 accent-black" 
                    />
                    <div>
                        <p className="text-xs font-black uppercase tracking-wider text-black">PRIORITY (NEXT DAY)</p>
                        <p className="text-sm font-medium text-zinc-600 mt-1">Rs. 1,000</p>
                    </div>
                </label>

            </div>
        </div>
    );
};

export default ShippingMethod;
