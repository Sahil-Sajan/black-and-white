"use client"

import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface ProductTabsProps {
    description: React.ReactNode;
    reviewsList: React.ReactNode;
    reviewsCount: number;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
    description,
    reviewsList,
    reviewsCount,
}) => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { label: 'Description', content: description },
        { label: `Reviews`, count: reviewsCount, content: reviewsList },
    ];

    return (
        <div className="bg-white border-t border-gray-100/70 p-6 md:p-8 mt-12 rounded-t-[2rem]">
            {/* Tab Navigation */}
            <nav className="flex items-center gap-1 border-b border-gray-100/70 mb-8 overflow-x-auto">
                {tabs.map((tab, index) => (
                    <button
                        key={tab.label}
                        onClick={() => setActiveTab(index)}
                        className={`
              text-[11px] font-black uppercase tracking-widest px-8 pb-4 -mb-px 
              transition-all duration-200 border-b-2 whitespace-nowrap flex items-center gap-2
              ${activeTab === index
                                ? 'text-black border-black'
                                : 'text-zinc-400 border-transparent hover:text-black hover:border-zinc-200'
                            }
            `}
                    >
                        {tab.label}
                        {tab.count !== undefined && (
                            <span className="bg-zinc-100 text-zinc-600 text-[9px] font-black rounded-full px-2 py-0.5">
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </nav>

            {/* Tab Content Panel */}
            <div className="text-sm text-slate-700/90 leading-[1.7] max-w-4xl tracking-tight">
                {tabs[activeTab].content}
            </div>
        </div>
    );
};

export default ProductTabs;