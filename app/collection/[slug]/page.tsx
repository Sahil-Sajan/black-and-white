import React from "react";
import Link from "next/link";
import { ProductImages } from "@/src/components/detail-page/image-gallery";
import { ProductInfo } from "@/src/components/detail-page/product-info";
import ProductTabs from "@/src/components/detail-page/producti-tab";

interface Product {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  price: number;
  isInStock: boolean;
  variants: {
    name: string;
    image: string | null;
  }[];
  description: string;
  createdAt: string;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const apiUrl = `${baseUrl}/api/products/slug/${slug}`;

  let product: Product | null = null;

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      product = data.product;
    }
  } catch (error) {
    console.error("Failed to fetch product details:", error);
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-[1440px] px-4 py-32 bg-[#fcfcfc] min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-black mb-4">Product Not Found</h1>
        <p className="text-zinc-500 mb-8">The product you are looking for does not exist or has been removed.</p>
        <Link 
          href="/collection" 
          className="bg-black text-white px-8 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors"
        >
          Back to Collection
        </Link>
      </main>
    );
  }

  const productImages = product.variants
    .map(v => v.image)
    .filter((img): img is string => !!img);

  // If no images in variants, use default
  if (productImages.length === 0) {
    productImages.push("/cards/card6.webp");
  }

  const descriptionContent = (
    <div className="space-y-4">
      <p className="text-gray-600 whitespace-pre-line">
        {product.description}
      </p>
    </div>
  );

  return (
    <main className="mx-auto max-w-[1440px] px-4 lg:px-8 py-12 bg-[#fcfcfc] min-h-screen">
      {/* Breadcrumb */}
      <nav className="flex text-[11px] font-medium text-gray-400 mb-8 items-center gap-2 tracking-wide uppercase">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <span>›</span>
        <Link href="/collection" className="hover:text-black transition-colors">
          {product.category || "Collection"}
        </Link>
        <span>›</span>
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="bg-white p-4 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-16 border border-zinc-200 rounded-md">
        <ProductImages name={product.name} images={productImages} />
        <ProductInfo 
          name={product.name} 
          brand={product.brand}
          price={product.price}
          variants={product.variants}
          isInStock={product.isInStock}
          slug={product.slug}
        />
      </div>
      
      <ProductTabs
        description={descriptionContent}
        specifications={
          <ul className="space-y-2 text-gray-600">
            <li><strong>Brand:</strong> {product.brand}</li>
            <li><strong>Category:</strong> {product.category}</li>
            <li><strong>Status:</strong> {product.isInStock ? "In Stock" : "Out of Stock"}</li>
          </ul>
        }
        reviewsCount={126}
        reviewsList={<p className="text-zinc-500 py-8 italic text-center">No reviews verified yet for this batch.</p>}
      />
    </main>
  );
}
