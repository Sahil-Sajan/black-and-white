"use client"

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Eye, Heart, ShoppingCart } from 'lucide-react'; // Optional: for the hover icons

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Category = 'Starter Kits' | 'Pod Devices' | 'Disposable Device';

const VapesCarousel = () => {
    const [activeTab, setActiveTab] = useState<Category>('Starter Kits');

    const categories: Category[] = ['Starter Kits', 'Pod Devices', 'Disposable Device'];

    // Example Data
    const products = [
        // Starter Kits (using vape.avif files)
        { id: 'vape', brand: 'OXVA', name: 'OXVA XLIM PRO STARTER KIT', price: '6,499', oldPrice: '7,499', category: 'Starter Kits', img: '/vape.avif' },
        { id: 'vape2', brand: 'UWELL', name: 'UWELL CALIBURN G3 KIT', price: '5,299', oldPrice: '5,999', category: 'Starter Kits', img: '/vape2.avif' },
        { id: 'vape3', brand: 'GEEKVAPE', name: 'GEEKVAPE WENAX Q PRO', price: '4,899', oldPrice: '5,499', category: 'Starter Kits', img: '/vape3.avif' },
        { id: 'vape4', brand: 'VOOPOO', name: 'VOOPOO ARGUS P2 KIT', price: '5,799', oldPrice: '6,299', category: 'Starter Kits', img: '/vape4.avif' },
        { id: 'vape5', brand: 'VAPORESSO', name: 'VAPORESSO XROS 4 MINI', price: '4,199', oldPrice: '4,699', category: 'Starter Kits', img: '/vape5.avif' },
        { id: 'vape6', brand: 'SMOK', name: 'SMOK NOVO 5 KIT', price: '4,999', oldPrice: '5,599', category: 'Starter Kits', img: '/vape6.avif' },
        { id: 'vape7', brand: 'LOST VAPE', name: 'LOST VAPE URSA NANO PRO 2', price: '5,399', oldPrice: '5,999', category: 'Starter Kits', img: '/vape7.avif' },

        // Disposable Device
        { id: 1, brand: 'SLUGGER', name: 'SLUGGER DISPOSABLE MANGO S...', price: '3,599', oldPrice: '3,999', category: 'Disposable Device', img: '/cards/card1.webp' },
        { id: 2, brand: 'SLUGGER', name: 'SLUGGER DISPOSABLE BLUEBERR...', price: '3,599', oldPrice: '3,999', category: 'Disposable Device', img: '/cards/card2.webp' },
        { id: 3, brand: 'SLUGGER', name: 'SLUGGER DISPOSABLE GRAPE PE...', price: '3,599', oldPrice: '3,999', category: 'Disposable Device', img: '/cards/card3.jpg' },
        { id: 4, brand: 'SLUGGER', name: 'SLUGGER DISPOSABLE BLUERAZZ...', price: '3,599', oldPrice: '3,999', category: 'Disposable Device', img: '/cards/card4.jpg' },
        { id: 5, brand: 'SLUGGER', name: 'SLUGGER DISPOSABLE WATERME...', price: '3,599', oldPrice: '3,999', category: 'Disposable Device', img: '/cards/card5.webp' },
    ];

    // Filter logic
    const filteredProducts = products.filter(p => p.category === activeTab);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 font-sans group">
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 mb-8 pb-2">
                <h2 className="text-2xl font-bold  text-gray-800 uppercase">Vapes</h2>
                <div className="flex gap-4 mt-4 md:mt-0">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-4 py-1 text-sm font-medium transition-all rounded-full border ${activeTab === cat
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
            <div className="relative px-8">
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    pagination={{ clickable: true, el: '.custom-pagination' }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 4 },
                        1280: { slidesPerView: 5 },
                    }}
                    className="pb-12"
                >
                    {filteredProducts.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div className="bg-white p-4 border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300 group/card relative rounded-md h-full flex flex-col">

                                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">{product.brand}</p>
                                <h3 className="text-[11px] font-bold text-gray-800 uppercase mb-4 h-8 leading-tight">
                                    {product.name}
                                </h3>

                                <div className="aspect-[3/4] mb-4 relative flex items-center justify-center">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="max-h-full object-contain"
                                    />
                                </div>

                                <div className="mt-auto">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-black font-bold text-lg">Rs.{product.price}</span>
                                        <span className="text-gray-400 line-through text-xs">Rs.{product.oldPrice}</span>
                                    </div>

                                    {/* Actions beneath price - appear on hover */}
                                    <div className="flex gap-2 mt-4 opacity-0 h-0 group-hover/card:opacity-100 group-hover/card:h-10 transition-all duration-300 overflow-hidden">
                                        <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white text-[10px] font-bold uppercase tracking-wider py-2 rounded-sm hover:bg-gray-800 transition-colors">
                                            <ShoppingCart size={14} /> Add to Cart
                                        </button>
                                        <button className="px-3 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors">
                                            <Eye size={14} className="text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Arrows */}
                <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-black transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-black transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>

            {/* Footer Section */}
            <div className="flex flex-col items-center mt-8 gap-4">
                {/* Pagination Dots */}
                <div className="custom-pagination flex justify-center"></div>

                {/* View All Button */}
                <button className="bg-black text-white px-10 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                    View All
                </button>
            </div>

            {/* Global CSS for Swiper override */}
            <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #e5e7eb;
          opacity: 1;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background: #84cc16; /* Green color from your image */
          width: 20px;
          border-radius: 4px;
        }
      `}</style>
        </div>
    );
};

export default VapesCarousel;