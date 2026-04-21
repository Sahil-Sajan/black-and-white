"use client"

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Eye, ShoppingCart, Loader2 } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Category = 'Disposable Device' | 'Kits';

interface Product {
    _id: string;
    name: string;
    slug: string;
    brand?: string;
    category?: string;
    price: number;
    isInStock: boolean;
    variants?: { name?: string; image?: string }[];
    mainImage?: string;
}

const VapesCarousel = () => {
    const categories: Category[] = ['Disposable Device', 'Kits'];
    const [activeTab, setActiveTab] = useState<Category>('Disposable Device');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                if (res.ok) {
                    const data = await res.json();
                    if (data.products) {
                        setProducts(data.products);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const cat = p.category?.toLowerCase() || '';
            const name = p.name?.toLowerCase() || '';

            const isDisposable = cat.includes('disposable') || name.includes('disposable');
            const isKit = cat.includes('kit') || name.includes('kit') || cat === 'kits';

            if (activeTab === 'Disposable Device') {
                return isDisposable;
            } else if (activeTab === 'Kits') {
                return isKit && !isDisposable;
            }
            return false;
        });
    }, [products, activeTab]);

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
                {loading ? (
                    <div className="py-20 flex flex-col justify-center items-center gap-3 text-gray-500">
                        <Loader2 className="animate-spin text-black" size={24} />
                        <span className="text-xs font-bold tracking-widest uppercase">Loading {activeTab}...</span>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="py-20 flex justify-center items-center text-gray-500 text-sm font-bold tracking-widest uppercase">
                        No products found for {activeTab}.
                    </div>
                ) : (
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        pagination={{ clickable: true, el: '.custom-pagination' }}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 15 },
                            768: { slidesPerView: 3, spaceBetween: 20 },
                            1024: { slidesPerView: 4, spaceBetween: 20 },
                            1280: { slidesPerView: 5, spaceBetween: 20 },
                        }}
                        className="pb-12"
                    >
                        {filteredProducts.map((product) => {
                            const imageUrl = product.mainImage || product.variants?.[0]?.image || '/cards/card6.webp';

                            return (
                                <SwiperSlide key={product._id}>
                                    <div className="bg-white p-2 border border-transparent md:hover:border-gray-100 md:hover:shadow-lg transition-all duration-300 group/card relative rounded-sm h-full flex flex-col">
                                        <div className="aspect-square mb-3 md:mb-4 relative flex items-center justify-center bg-[#f9f9f9] rounded-sm overflow-hidden">
                                            <Image
                                                src={imageUrl}
                                                alt={product.name}
                                                fill
                                                className="object-contain transition-transform duration-500 md:group-hover/card:scale-110 p-4"
                                            />
                                            <div className="absolute inset-0 flex items-end justify-center pb-4 translate-y-4 opacity-0 md:group-hover/card:opacity-100 md:group-hover/card:translate-y-0 transition-all duration-300 bg-white/30 backdrop-blur-[2px] z-10">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`/collection/${product.slug}`}
                                                        className="flex items-center gap-1 text-[9px] font-bold text-gray-800 bg-white/90 px-2 py-1.5 rounded-sm shadow-sm hover:bg-black hover:text-white transition-colors"
                                                    >
                                                        <Eye size={12} /> View
                                                    </Link>
                                                    <button className="flex items-center gap-1 text-[9px] font-bold text-gray-800 bg-white/90 px-2 py-1.5 rounded-sm shadow-sm hover:bg-black hover:text-white transition-colors">
                                                        <ShoppingCart size={12} /> Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-2 text-center pb-2">
                                            <p className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">{product.brand || product.category || 'VAPE'}</p>
                                            <Link href={`/collection/${product.slug}`}>
                                                <h3 className="text-[10px] md:text-[11px] font-bold text-gray-800 uppercase leading-tight h-8 mb-2 px-1 hover:text-gray-500 transition-colors">
                                                    {product.name}
                                                </h3>
                                            </Link>
                                            <div className="flex items-baseline justify-center gap-2">
                                                <span className="text-black font-bold text-xs md:text-sm">Rs.{product.price?.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                )}

                <button className="swiper-button-prev-custom hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-black transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button className="swiper-button-next-custom hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-black transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>

            <div className="flex flex-col items-center mt-4 md:mt-8 gap-4">
                <div className="custom-pagination flex justify-center"></div>
                <Link href="/collection" className="bg-black text-white px-8 md:px-10 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                    View All
                </Link>
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