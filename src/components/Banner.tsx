import React from 'react';
import Image from 'next/image';

import { banner } from './images';

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

        </div>
    );
}; export const DeliveryBanner: React.FC = () => {
    return (
        <div className="hidden md:block w-full">

            <div className="mx-auto w-11/12 max-w-[1700px] relative overflow-hidden aspect-[21/6]">
                <Image
                    src={banner}
                    alt="Same-Day Delivery in Karachi"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
        </div>
    );
};