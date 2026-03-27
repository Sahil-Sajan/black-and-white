import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
    { id: 1, title: 'VAPES', image: '/categories/vapes.png', span: 'md:col-span-1' },
    { id: 2, title: 'NIC SALTS', image: '/categories/nic-salts.png', span: 'md:col-span-2' },
    { id: 3, title: 'STARTER KITS', image: '/categories/starter-kits.png', span: 'md:col-span-1' },
    { id: 4, title: 'ACCESSORIES', image: '/categories/accessories.png', span: 'md:col-span-2' },
    { id: 5, title: 'HEETS', image: '/categories/heets.png', span: 'md:col-span-1' },
    { id: 6, title: 'E-LIQUIDS', image: '/categories/e-liquids.png', span: 'md:col-span-1' },
];

const CategoryGrid = () => {
    return (
        <section className="w-full md:w-11/12 mx-auto bg-white px-4 py-10 md:py-20">
            {/* --- Heading --- */}
            <div className="relative mb-10 md:mb-16 flex items-center justify-center">
                <div className="absolute h-[1px] w-full bg-zinc-100"></div>
                <div className="relative bg-white px-6 md:px-10 flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-2 text-center">
                        Browse our
                    </span>
                    <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-black text-center">
                        Top Categories
                    </h2>
                </div>
            </div>

            {/* --- Bento Grid --- */}
            {/* grid-cols-2 on mobile ensures the images don't stretch to full-width/long blocks */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[450px]">
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        href="/collection"
                        className={`group relative overflow-hidden bg-zinc-100 rounded-sm transition-all duration-700 ease-in-out hover:shadow-2xl ${cat.span}`}
                    >
                        <Image
                            src={cat.image}
                            alt={cat.title}
                            fill
                            priority
                            className="object-cover object-center transition-transform duration-1000 ease-in-out group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />

                        {/* Text labels and overlays removed as requested */}
                        <div className="absolute inset-0 bg-black/5 transition-opacity duration-500 group-hover:bg-transparent" />
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategoryGrid;