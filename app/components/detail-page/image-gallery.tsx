import React from 'react';
import Image from 'next/image';

interface ProductImagesProps {
    name: string;
    images: string[];
}

export const ProductImages = ({ name, images }: ProductImagesProps) => {
    return (
        <div className="flex-1 flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#f9f9f9] flex items-center justify-center border border-gray-100">
                <Image
                    src={images[0]}
                    alt={name}
                    fill
                    className="object-contain p-12 transition-transform duration-500 hover:scale-105"
                />
            </div>

            {/* Thumbnails Grid */}
            <div className="grid grid-cols-4 gap-4">
                {images.map((src, idx) => (
                    <div
                        key={idx}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-300 ${idx === 0 ? 'border-black opacity-100 bg-white' : 'border-transparent hover:border-gray-200 opacity-70 hover:opacity-100 bg-[#f9f9f9]'
                            }`}
                    >
                        <Image
                            src={src}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            className="object-contain p-2 md:p-4"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};