"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Eye, ShoppingCart } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Category = 'Disposable Device' | 'Pod Devices' | 'Starter Kits';

const VapesCarousel = () => {
    const categories: Category[] = ['Disposable Device', 'Pod Devices', 'Starter Kits'];
    const [activeTab, setActiveTab] = useState<Category>('Disposable Device');

    const products = [
        { id: 'vape', brand: 'OXVA', name: 'OXVA XLIM PRO STARTER KIT', price: '6,499', oldPrice: '7,499', category: 'Starter Kits', img: '/vape.avif' },
        { id: 'vape2', brand: 'UWELL', name: 'UWELL CALIBURN G3 KIT', price: '5,299', oldPrice: '5,999', category: 'Starter Kits', img: '/vape2.avif' },
        { id: 'vape3', brand: 'GEEKVAPE', name: 'GEEKVAPE WENAX Q PRO', price: '4,899', oldPrice: '5,499', category: 'Starter Kits', img: '/vape3.avif' },
        { id: 'vape4', brand: 'VOOPOO', name: 'VOOPOO ARGUS P2 KIT', price: '5,799', oldPrice: '6,299', category: 'Starter Kits', img: '/vape4.avif' },
        { id: 'vape5', brand: 'VAPORESSO', name: 'VAPORESSO XROS 4 MINI', price: '4,199', oldPrice: '4,699', category: 'Starter Kits', img: '/vape5.avif' },
        { id: 'vape6', brand: 'SMOK', name: 'SMOK NOVO 5 KIT', price: '4,999', oldPrice: '5,599', category: 'Starter Kits', img: '/vape6.avif' },
        { id: 'vape7', brand: 'LOST VAPE', name: 'LOST VAPE URSA NANO PRO 2', price: '5,399', oldPrice: '5,999', category: 'Starter Kits', img: '/vape7.avif' },
        { id: 1, brand: 'SLUGGER', name: 'SLUGGER DISPOSABLE MANGO S...', price: '3,599', oldPrice: '3,999', category: 'Disposable Device', img: '/cards/card1.webp' },
        { id: 2, brand: 'SLUGGER', name: 'SLUGGER DISPOSABLE BLUEBERR...', price: '3,599', oldPrice: '3,999', category: 'Disposable Device', img: '/cards/card2.webp' },
        { id: 3, brand: 'SLUGGER', name: 'SLUGGER DISPOSABLE GRAPE PE...', price: '3,599', oldPrice: '3,999', category: 'Disposable Device', img: '/cards/card3.jpg' },
        { id: 4, brand: 'SLUGGER', name: 'SLUGGER DISPOSABLE BLUERAZZ...', price: '3,599', oldPrice: '3,999', category: 'Disposable Device', img: '/cards/card4.jpg' },
        { id: 5, brand: 'SLUGGER', name: 'SLUGGER DISPOSABLE WATERME...', price: '3,599', oldPrice: '3,999', category: 'Disposable Device', img: '/cards/card5.webp' },
        { id: 'pod1', brand: 'SLUGGER', name: 'SLUGGER POD MANGO S...', price: '3,599', oldPrice: '3,999', category: 'Pod Devices', img: '/vape.avif' },
        { id: 'pod2', brand: 'SLUGGER', name: 'SLUGGER POD BLUEBERR...', price: '3,599', oldPrice: '3,999', category: 'Pod Devices', img: '/vape4.avif' },
        { id: 'pod3', brand: 'SLUGGER', name: 'SLUGGER POD GRAPE PE...', price: '3,599', oldPrice: '3,999', category: 'Pod Devices', img: '/vape2.avif' },
        { id: 'pod4', brand: 'SLUGGER', name: 'SLUGGER POD BLUERAZZ...', price: '3,599', oldPrice: '3,999', category: 'Pod Devices', img: '/cards/card3.jpg' },
        { id: 'pod5', brand: 'SLUGGER', name: 'SLUGGER POD WATERME...', price: '3,599', oldPrice: '3,999', category: 'Pod Devices', img: '/cards/card5.webp' },
    ];

    const filteredProducts = products.filter(p => p.category === activeTab);

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 font-sans group">
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 mb-6 md:mb-8 pb-2">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 uppercase tracking-tight">Vapes</h2>
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-4 md:mt-0">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-3 md:px-4 py-1 text-[10px] md:text-sm font-medium transition-all rounded-full border ${activeTab === cat
                                ? 'border-black text-gray-800'
                                : 'border-transparent text-gray-500 hover:text-black'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Swiper Slider */}
            <div className="relative px-2 md:px-8">
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={10}
                    slidesPerView={1} // Base setting for mobile
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    pagination={{ clickable: true, el: '.custom-pagination' }}
                    breakpoints={{
                        // Changed 480 to 640 to keep single card on small/medium mobile phones
                        640: { slidesPerView: 2, spaceBetween: 15 },
                        768: { slidesPerView: 3, spaceBetween: 20 },
                        1024: { slidesPerView: 4, spaceBetween: 20 },
                        1280: { slidesPerView: 5, spaceBetween: 20 },
                    }}
                    className="pb-12"
                >
                    {filteredProducts.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div className="bg-white p-2 border border-transparent md:hover:border-gray-100 md:hover:shadow-lg transition-all duration-300 group/card relative rounded-sm h-full flex flex-col">
                                <div className="aspect-square mb-3 md:mb-4 relative flex items-center justify-center bg-[#f9f9f9] rounded-sm overflow-hidden">
                                    <Image
                                        src={product.img}
                                        alt={product.name}
                                        fill
                                        className="object-contain transition-transform duration-500 md:group-hover/card:scale-110 p-4"
                                    />
                                    <div className="absolute inset-0 flex items-end justify-center pb-4 translate-y-4 opacity-0 md:group-hover/card:opacity-100 md:group-hover/card:translate-y-0 transition-all duration-300 bg-white/30 backdrop-blur-[2px] z-10">
                                        <div className="flex gap-2">
                                            <button className="flex items-center gap-1 text-[9px] font-bold text-gray-800 bg-white/90 px-2 py-1.5 rounded-sm shadow-sm hover:bg-black hover:text-white transition-colors">
                                                <Eye size={12} /> View
                                            </button>
                                            <button className="flex items-center gap-1 text-[9px] font-bold text-gray-800 bg-white/90 px-2 py-1.5 rounded-sm shadow-sm hover:bg-black hover:text-white transition-colors">
                                                <ShoppingCart size={12} /> Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-2 text-center pb-2">
                                    <p className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">{product.brand}</p>
                                    <h3 className="text-[10px] md:text-[11px] font-bold text-gray-800 uppercase leading-tight h-8 mb-2 px-1">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-baseline justify-center gap-2">
                                        <span className="text-black font-bold text-xs md:text-sm">Rs.{product.price}</span>
                                        <span className="text-gray-400 line-through text-[9px] md:text-[10px]">Rs.{product.oldPrice}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button className="swiper-button-prev-custom hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-black transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button className="swiper-button-next-custom hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-black transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>

            <div className="flex flex-col items-center mt-4 md:mt-8 gap-4">
                <div className="custom-pagination flex justify-center"></div>
                <button className="bg-black text-white px-8 md:px-10 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                    View All
                </button>
            </div>

            <style jsx global>{`
                .custom-pagination .swiper-pagination-bullet {
                    width: 6px;
                    height: 6px;
                    background: #e5e7eb;
                    opacity: 1;
                }
                .custom-pagination .swiper-pagination-bullet-active {
                    background: #84cc16;
                    width: 16px;
                    border-radius: 4px;
                }
                @media (min-width: 768px) {
                    .custom-pagination .swiper-pagination-bullet { width: 8px; height: 8px; }
                    .custom-pagination .swiper-pagination-bullet-active { width: 20px; }
                }
            `}</style>
        </div>
    );
};

export default VapesCarousel;