import React from 'react';
import Image from 'next/image';

export const NicotineWarningMarquee = () => {
    const warningText = "WARNING: This product contains nicotine. Nicotine is an addictive chemical.";
    const repeatedText = Array(10).fill(warningText);

    return (
        <div className="hidden md:flex relative overflow-hidden border-b border-gray-200 bg-white py-3">
            <div
                className="flex whitespace-nowrap animate-marquee"
                style={{ animationDuration: '60s' }}
            >
                <div className="flex shrink-0">
                    {repeatedText.map((text, i) => (
                        <span key={`a-${i}`} className="mx-8 text-md font-bold uppercase tracking-wide text-black">
                            {text}
                        </span>
                    ))}
                </div>
                <div className="flex shrink-0">
                    {repeatedText.map((text, i) => (
                        <span key={`b-${i}`} className="mx-8 text-sm font-bold uppercase tracking-wide text-black">
                            {text}
                        </span>
                    ))}
                </div>
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent"></div>
        </div>
    );
};

export const DeliveryBanner: React.FC = () => {
    return (
        <div className="hidden md:block w-full">
            <div className="max-w-[1400px] mx-auto w-full h-[500px] overflow-hidden relative">
                <Image
                    src="/banner.png"
                    alt="Same-Day Delivery in Karachi for All Your Needs - Orders before 3:00 PM"
                    fill
                    className="mt-20 object-cover"
                />
            </div>
        </div>
    );
};
