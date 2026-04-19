"use client";

import React, { useState } from "react";
import { ProductImages } from "./image-gallery";
import ProductInfo from "./product-info";

interface Variant {
  name: string;
  image: string | null;
  _id: string;
}

interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  isInStock: boolean;
  slug: string;
  mainImage: string | null;
  variants: Variant[];
}

export default function ProductDetailView({ product }: { product: Product }) {
  // Focus image (starts with mainImage)
  const [activeImage, setActiveImage] = useState<string | null>(product.mainImage);

  // Prepare images for thumbnails
  const images = [
    product.mainImage,
    ...product.variants.map((v) => v.image),
  ].filter((img): img is string => !!img);

  const handleVariantChange = (variantImage: string | null) => {
    // If variant has an image, use it. Otherwise, fallback to product mainImage.
    setActiveImage(variantImage || product.mainImage);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
      {/* Left: Gallery */}
      <ProductImages
        name={product.name}
        images={images.length > 0 ? images : ["/cards/card1.webp"]}
        activeImage={activeImage}
      />

      {/* Right: Info */}
      <ProductInfo 
        product={product} 
        onVariantChange={handleVariantChange}
      />
    </div>
  );
}
