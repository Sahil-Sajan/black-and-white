"use client"

import Image from 'next/image';

const BrandMarquee = () => {
    const row1 = [
        '/brands/image (1).webp',
        '/brands/image (2).webp',
        '/brands/image (3).webp',
        '/brands/image (7).webp',
        '/brands/image 4.avif',
        '/brands/image 5.webp',
        // '/brands/oxva.png',
        // '/brands/pava.png',
        // '/brands/voopo.png',
    ];

    return (
        /* Using w-11/12 and mx-auto to match your DeliveryBanner layout */
        <section className="mx-auto w-11/12 max-w-[1700px] bg-white py-12 md:py-20 overflow-hidden relative rounded-2xl border border-zinc-100 mt-10">

            {/* --- Section Header --- */}
            <div className="relative mb-12 md:mb-16 flex items-center justify-center">
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

            {/* --- Gradient Overlays (Masking the edges) --- */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 md:w-40 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 md:w-40 bg-gradient-to-l from-white via-white/80 to-transparent"></div>

            <div className="flex flex-col">
                <div className="relative flex overflow-hidden">
                    {/* FIX: Animation now uses a consistent loop. 
                        We duplicate the array to ensure there is always content visible during the transition.
                    */}
                    <div className="flex animate-marquee-right whitespace-nowrap">
                        {[...row1, ...row1].map((src, i) => (
                            <div
                                key={i}
                                className="mx-8 md:mx-16 flex h-12 w-28 md:h-16 md:w-36 items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 ease-in-out cursor-pointer"
                            >
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

            <style jsx global>{`
                @keyframes marquee-right {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee-right {
                    animation: marquee-right 25s linear infinite;
                }
                /* Pause on hover for better UX */
                .animate-marquee-right:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default BrandMarquee;