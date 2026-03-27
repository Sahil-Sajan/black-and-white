"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const products = [
    {
        id: 1,
        category: "DISPOSABLE VAPES",
        name: "Geek Bar Pulse X 25K Disposable Vape – Sour Mango Pineapple (25000 Puffs) (50mg)",
        price: 5999,
        image: "/cards/card4.jpg",
    },
    {
        id: 2,
        category: "DISPOSABLE VAPES",
        name: "Geek Bar Pulse X 25K Disposable Vape – Blackberry Blueberry (25000 Puffs) (50mg)",
        price: 5999,
        image: "/cards/card5.webp",
    },
    {
        id: 3,
        category: "DISPOSABLE VAPES",
        name: "Geek Bar Pulse X 25K Disposable Vape – Watermelon Ice (25000 Puffs) (50mg)",
        price: 5999,
        image: "/cards/card6.webp",
    },
    {
        id: 4,
        category: "DISPOSABLE VAPES",
        name: "Geek Bar Pulse X 25K Disposable Vape – Blackberry B-Pop (25000 Puffs) (50mg)",
        price: 5999,
        image: "/cards/card2.webp",
    },
];

const NewArrivals = () => {
    return (
        <section className="mx-auto max-w-[91.66%] px-4 py-20 bg-white">
            <div className="flex flex-col lg:flex-row items-center gap-12">

                {/* --- Left Content Area --- */}
                <div className="w-full lg:w-1/3 text-center lg:text-left space-y-6">
                    <h2 className="text-4xl font-black text-black tracking-tighter uppercase">
                        New Arrivals
                    </h2>
                    <p className="text-zinc-500 text-lg leading-relaxed max-w-sm mx-auto lg:mx-0">
                        Check out our latest products. <br />
                        Shop the trends, before they trend.
                    </p>
                    <Link
                        href="/collection"
                        className="inline-flex items-center gap-2 border-2 border-black px-8 py-3 font-bold text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300 group"
                    >
                        <Search size={18} className="group-hover:scale-110 transition-transform" />
                        Browse All Products
                    </Link>
                </div>

                {/* --- Right Carousel Area --- */}
                <div className="w-full lg:w-2/3 relative group">
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation={{
                            prevEl: '.swiper-button-prev-custom',
                            nextEl: '.swiper-button-next-custom',
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 2 },
                            1280: { slidesPerView: 3 },
                        }}
                        className="mySwiper !static"
                    >
                        {products.map((product) => {
                            const slug = product.name
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, '-')
                                .replace(/(^-|-$)+/g, '');

                            return (
                                <SwiperSlide key={product.id}>
                                    <Link href={`/collection/${slug}`} className="flex flex-col items-center text-center group/card block">
                                        <div className="relative aspect-[4/5] w-full mb-4 overflow-hidden bg-[#f9f9f9] rounded-sm">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-contain p-6 transition-transform duration-500 group-hover/card:scale-110"
                                            />
                                        </div>
                                        <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] mb-2">
                                            {product.category}
                                        </span>
                                        <h3 className="text-[13px] font-bold text-zinc-800 line-clamp-2 min-h-[40px] px-2 leading-snug uppercase tracking-tight group-hover/card:text-red-600 transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="mt-2 text-lg font-black text-black">
                                            Rs.{product.price.toLocaleString()}
                                        </p>
                                    </Link>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    {/* --- Navigation Buttons (Chevron Icons) --- */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-[-25px] right-[-25px] flex justify-between pointer-events-none z-20">
                        <button className="swiper-button-prev-custom pointer-events-auto w-12 h-12 flex items-center justify-center bg-white border border-zinc-200 rounded-full shadow-md text-zinc-400 hover:text-black hover:border-black transition-all disabled:opacity-0">
                            <ChevronLeft size={24} />
                        </button>
                        <button className="swiper-button-next-custom pointer-events-auto w-12 h-12 flex items-center justify-center bg-white border border-zinc-200 rounded-full shadow-md text-zinc-400 hover:text-black hover:border-black transition-all disabled:opacity-0">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewArrivals;