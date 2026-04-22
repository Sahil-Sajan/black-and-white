"use client";

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroSlider = () => {
    // Array for your 6 images
    const slides = [
        { id: 1, img: '/crousel/c1.jpeg', title: "YOUR NEXT FAVORITE MOD HAS ARRIVED", link: "/box-mods" },
        { id: 2, img: '/crousel/c2.jpeg', title: "EXPLORE THE LATEST RELEASES", link: "/new-arrivals" },
        { id: 3, img: '/crousel/c3.jpeg', title: "PREMIUM E-LIQUIDS COLLECTION", link: "/e-liquids" },
    ];

    return (
        <div className="relative w-full group overflow-hidden">
            {/* --- Swiper Slider --- */}
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect={'fade'}
                navigation={{
                    prevEl: '.hero-prev',
                    nextEl: '.hero-next',
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="w-full h-[250px] sm:h-[400px] md:h-[600px] lg:h-[730px] xl:h-[800px]"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-full w-full">
                            <Image
                                src={slide.img}
                                alt={`Slide ${slide.id}`}
                                fill
                                className="object-cover"
                                priority={slide.id === 1}
                            />
                        </div>
                    </SwiperSlide>
                ))}

                {/* --- Custom Navigation (Glassmorphism Style) --- */}
                <button className="hero-prev absolute left-2 md:left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 md:p-3 backdrop-blur-md transition-all hover:bg-white/30 opacity-0 group-hover:opacity-100 border border-white/20 hidden sm:flex">
                    <ChevronLeft size={24} className="text-white" />
                </button>
                <button className="hero-next absolute right-2 md:right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 md:p-3 backdrop-blur-md transition-all hover:bg-white/30 opacity-0 group-hover:opacity-100 border border-white/20 hidden sm:flex">
                    <ChevronRight size={24} className="text-white" />
                </button>
            </Swiper>

            {/* --- Global Custom Pagination Styling --- */}
            <style jsx global>{`
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: white !important;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          background: #8b0000 !important; /* Matches your brand red */
          width: 24px;
          border-radius: 5px;
        }
        .swiper-pagination-lock {
          display: none;
        }
      `}</style>
        </div>
    );
};

export default HeroSlider;