"use client"

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Eye, Heart, ShoppingCart } from 'lucide-react'; // Optional: for the hover icons

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Category = '30mg' | '40mg' | '50mg' | '60mg' | '70mg' | '100mg';

const LiquidCarousel = () => {
    const [activeTab, setActiveTab] = useState<Category>('30mg');

    const categories: Category[] = ['30mg', '40mg', '50mg', '60mg', '70mg', '100mg'];

    // Example Data with varied orders for each tab
    const products = [
        // 30mg
        { id: 'l1', brand: 'SLUGGER', name: 'SLUGGER BLUE RASPBERRY 30MG', price: '2,999', oldPrice: '3,499', category: '30mg', img: '/liquid11.avif' },
        { id: 'l2', brand: 'VAPETASIA', name: 'VAPETASIA KILLER KUSTARD 30MG', price: '3,199', oldPrice: '3,699', category: '30mg', img: '/liquid22.webp' },
        { id: 'l3', brand: 'NASTY', name: 'NASTY JUICE BAD BLOOD 30MG', price: '2,899', oldPrice: '3,299', category: '30mg', img: '/liquid33.webp' },
        { id: 'l4', brand: 'DINNER LADY', name: 'LEMON TART 30MG', price: '3,299', oldPrice: '3,799', category: '30mg', img: '/liquid44.avif' },
        { id: 'l5', brand: 'BLVK', name: 'BLVK UNICORN APPLE 30MG', price: '2,999', oldPrice: '3,399', category: '30mg', img: '/liquid55.avif' },

        // 40mg
        { id: 'l6', brand: 'VAPETASIA', name: 'VAPETASIA KILLER KUSTARD 40MG', price: '3,199', oldPrice: '3,699', category: '40mg', img: '/liquid22.webp' },
        { id: 'l7', brand: 'NASTY', name: 'NASTY JUICE BAD BLOOD 40MG', price: '2,899', oldPrice: '3,299', category: '40mg', img: '/liquid33.webp' },
        { id: 'l8', brand: 'DINNER LADY', name: 'LEMON TART 40MG', price: '3,299', oldPrice: '3,799', category: '40mg', img: '/liquid44.avif' },
        { id: 'l9', brand: 'BLVK', name: 'BLVK UNICORN APPLE 40MG', price: '2,999', oldPrice: '3,399', category: '40mg', img: '/liquid55.avif' },
        { id: 'l10', brand: 'SLUGGER', name: 'SLUGGER BLUE RASPBERRY 40MG', price: '2,999', oldPrice: '3,499', category: '40mg', img: '/liquid11.avif' },

        // 50mg
        { id: 'l11', brand: 'NASTY', name: 'NASTY JUICE BAD BLOOD 50MG', price: '2,899', oldPrice: '3,299', category: '50mg', img: '/liquid33.webp' },
        { id: 'l12', brand: 'DINNER LADY', name: 'LEMON TART 50MG', price: '3,299', oldPrice: '3,799', category: '50mg', img: '/liquid44.avif' },
        { id: 'l13', brand: 'BLVK', name: 'BLVK UNICORN APPLE 50MG', price: '2,999', oldPrice: '3,399', category: '50mg', img: '/liquid55.avif' },
        { id: 'l14', brand: 'SLUGGER', name: 'SLUGGER BLUE RASPBERRY 50MG', price: '2,999', oldPrice: '3,499', category: '50mg', img: '/liquid11.avif' },
        { id: 'l15', brand: 'VAPETASIA', name: 'VAPETASIA KILLER KUSTARD 50MG', price: '3,199', oldPrice: '3,699', category: '50mg', img: '/liquid22.webp' },

        // 60mg
        { id: 'l16', brand: 'DINNER LADY', name: 'LEMON TART 60MG', price: '3,299', oldPrice: '3,799', category: '60mg', img: '/liquid44.avif' },
        { id: 'l17', brand: 'BLVK', name: 'BLVK UNICORN APPLE 60MG', price: '2,999', oldPrice: '3,399', category: '60mg', img: '/liquid55.avif' },
        { id: 'l18', brand: 'SLUGGER', name: 'SLUGGER BLUE RASPBERRY 60MG', price: '2,999', oldPrice: '3,499', category: '60mg', img: '/liquid11.avif' },
        { id: 'l19', brand: 'VAPETASIA', name: 'VAPETASIA KILLER KUSTARD 60MG', price: '3,199', oldPrice: '3,699', category: '60mg', img: '/liquid22.webp' },
        { id: 'l20', brand: 'NASTY', name: 'NASTY JUICE BAD BLOOD 60MG', price: '2,899', oldPrice: '3,299', category: '60mg', img: '/liquid33.webp' },

        // 70mg
        { id: 'l21', brand: 'BLVK', name: 'BLVK UNICORN APPLE 70MG', price: '2,999', oldPrice: '3,399', category: '70mg', img: '/liquid55.avif' },
        { id: 'l22', brand: 'SLUGGER', name: 'SLUGGER BLUE RASPBERRY 70MG', price: '2,999', oldPrice: '3,499', category: '70mg', img: '/liquid11.avif' },
        { id: 'l23', brand: 'VAPETASIA', name: 'VAPETASIA KILLER KUSTARD 70MG', price: '3,199', oldPrice: '3,699', category: '70mg', img: '/liquid22.webp' },
        { id: 'l24', brand: 'NASTY', name: 'NASTY JUICE BAD BLOOD 70MG', price: '2,899', oldPrice: '3,299', category: '70mg', img: '/liquid33.webp' },
        { id: 'l25', brand: 'DINNER LADY', name: 'LEMON TART 70MG', price: '3,299', oldPrice: '3,799', category: '70mg', img: '/liquid44.avif' },

        // 100mg
        { id: 'l26', brand: 'SLUGGER', name: 'SLUGGER BLUE RASPBERRY 100MG', price: '2,999', oldPrice: '3,499', category: '100mg', img: '/liquid11.avif' },
        { id: 'l27', brand: 'NASTY', name: 'NASTY JUICE BAD BLOOD 100MG', price: '2,899', oldPrice: '3,299', category: '100mg', img: '/liquid33.webp' },
        { id: 'l28', brand: 'BLVK', name: 'BLVK UNICORN APPLE 100MG', price: '2,999', oldPrice: '3,399', category: '100mg', img: '/liquid55.avif' },
        { id: 'l29', brand: 'VAPETASIA', name: 'VAPETASIA KILLER KUSTARD 100MG', price: '3,199', oldPrice: '3,699', category: '100mg', img: '/liquid22.webp' },
        { id: 'l30', brand: 'DINNER LADY', name: 'LEMON TART 100MG', price: '3,299', oldPrice: '3,799', category: '100mg', img: '/liquid44.avif' },
    ];

    // Filter logic
    const filteredProducts = products.filter(p => p.category === activeTab);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 font-sans group">
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 mb-8 pb-2">
                <h2 className="text-2xl font-bold  text-gray-800 uppercase">Liquids</h2>
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
                            <div className="bg-white p-2 border border-transparent hover:border-gray-100 hover:shadow-lg transition-all duration-300 group/card relative rounded-sm h-full flex flex-col">
                                
                                {/* Image Container */}
                                <div className="aspect-square mb-4 relative flex items-center justify-center bg-[#f9f9f9] rounded-sm overflow-hidden">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="max-h-[80%] object-contain transition-transform duration-500 group-hover/card:scale-110"
                                    />
                                </div>

                                {/* Product Info beneath Image */}
                                <div className="mt-2 text-center pb-2">
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">{product.brand}</p>
                                    <h3 className="text-[11px] font-bold text-gray-800 uppercase leading-tight h-8 mb-2 px-1">
                                        {product.name}
                                    </h3>
                                    
                                    <div className="flex items-baseline justify-center gap-2">
                                        <span className="text-black font-bold text-sm">Rs.{product.price}</span>
                                        <span className="text-gray-400 line-through text-[10px]">Rs.{product.oldPrice}</span>
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

export default LiquidCarousel;