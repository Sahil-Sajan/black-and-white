"use client"

import Image from 'next/image';

const BrandMarquee = () => {
    const row1 = [
        '/brands/image.webp',
        '/brands/image (1).webp',
        '/brands/image (2).webp',
        '/brands/image (3).webp',
        '/brands/image (4).webp',
    ];
    const row2 = [
        '/brands/image (5).webp',
        '/brands/image (6).webp',
        '/brands/image (7).webp',
        '/brands/image (8).webp',
        '/brands/image (9).webp',
    ];

    return (
        <section className="mx-auto max-w-[95%] md:max-w-[91.66%] bg-white py-10 md:py-16 overflow-hidden relative">

            {/* --- Section Header --- */}
            <div className="relative mb-10 md:mb-16 flex items-center justify-center">
                <div className="absolute h-[1px] w-full bg-zinc-100"></div>
                <div className="relative bg-white px-6 md:px-10 flex flex-col items-center text-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-2">
                        Partners
                    </span>
                    <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-black">
                        Featured Brands
                    </h2>
                </div>
            </div>

            {/* --- Gradient Overlays (Narrowed for mobile) --- */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32 bg-gradient-to-r from-white to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32 bg-gradient-to-l from-white to-transparent"></div>

            <div className="flex flex-col gap-6 md:gap-12">
                {/* Row 1: Moving Right */}
                <div className="relative flex overflow-hidden">
                    <div className="flex animate-[marqueeRight_30s_linear_infinite] md:animate-[marqueeRight_40s_linear_infinite] whitespace-nowrap">
                        {[...row1, ...row1, ...row1, ...row1].map((src, i) => (
                            /* Responsive sizing: h-12 w-28 on mobile, h-20 w-40 on desktop */
                            <div key={i} className="mx-6 md:mx-12 flex h-12 w-28 md:h-20 md:w-40 items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                                <div className="relative h-full w-full">
                                    <Image
                                        src={src}
                                        alt="Brand Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2: Moving Left */}
                <div className="relative flex overflow-hidden">
                    <div className="flex animate-[marqueeLeft_30s_linear_infinite] md:animate-[marqueeLeft_40s_linear_infinite] whitespace-nowrap">
                        {[...row2, ...row2, ...row2, ...row2].map((src, i) => (
                            <div key={i} className="mx-6 md:mx-12 flex h-12 w-28 md:h-20 md:w-40 items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                                <div className="relative h-full w-full">
                                    <Image
                                        src={src}
                                        alt="Brand Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes marqueeRight {
                    from { transform: translateX(-50%); }
                    to { transform: translateX(0); }
                }
                @keyframes marqueeLeft {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
};

export default BrandMarquee;