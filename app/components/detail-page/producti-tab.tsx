"use client"

import React, { useState } from 'react';

// Define types for the props
interface Tab {
    label: string;
    count?: number; // Optional review count
    content: React.ReactNode;
}

interface ProductTabsProps {
    description: React.ReactNode; // Content for the Description tab
    specifications: React.ReactNode; // Content for the Specifications tab
    reviewsCount: number; // Number of reviews for the Reviews tab label
    reviewsList: React.ReactNode; // List of actual reviews (maybe a map from data)
}

const ProductTabs: React.FC<ProductTabsProps> = ({
    description,
    specifications,
    reviewsCount,
    reviewsList,
}) => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs: Tab[] = [
        { label: 'Description', content: description },
        { label: 'Specifications', content: specifications },
        { label: 'Reviews', count: reviewsCount, content: reviewsList },
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
              transition-all duration-200 border-b-2 whitespace-nowrap
              ${activeTab === index
                                ? 'text-black border-black'
                                : 'text-zinc-400 border-transparent hover:text-black hover:border-zinc-200'
                            }
            `}
                    >
                        {tab.label} {tab.count ? `(${tab.count})` : ''}
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