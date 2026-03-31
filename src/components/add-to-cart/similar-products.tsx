import React from 'react';
import Image from 'next/image';

const SimilarProducts = () => {
    const products = [
        { id: 1, name: "Geek Bar Pulse X 25K - Sour Mango", price: 15.99, image: "/cards/card6.webp" },
        { id: 2, name: "Geek Bar Pulse X 25K - Blackberry", price: 15.99, image: "/cards/card6.webp" },
        { id: 3, name: "Geek Bar Pulse X 25K - Watermelon", price: 15.99, image: "/cards/card6.webp" },
        { id: 4, name: "Geek Bar Pulse X 25K - B-Pop", price: 15.99, image: "/cards/card6.webp" },
    ];

    return (
        <section className="py-16">
            <div className="relative mb-12">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-zinc-100"></div>
                </div>
                <div className="relative flex justify-start">
                    <h2 className="bg-white pr-8 text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">Similar Products</h2>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div key={product.id} className="group flex flex-col items-center text-center">
                        <div className="relative aspect-square w-full bg-[#f9f9f9] mb-4 overflow-hidden border border-zinc-100">
                            <span className="absolute top-2 right-2 text-[8px] font-bold uppercase text-[#00a896] border border-[#00a896] px-1 bg-white z-10">New</span>
                            <Image src={product.image} alt={product.name} fill className="object-contain p-4 transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <h3 className="text-[12px] font-bold text-zinc-800 uppercase tracking-tight line-clamp-2 px-2 h-8">{product.name}</h3>
                        <p className="mt-2 text-[14px] font-black text-black">${product.price.toFixed(2)}</p>
                        <div className="mt-2 flex items-center justify-center gap-1 text-[8px]">
                            {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                            <span className="text-zinc-400 font-bold ml-1">(1)</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SimilarProducts;