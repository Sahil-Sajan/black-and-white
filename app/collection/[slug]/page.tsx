import React from "react";
import Link from "next/link";
import { ProductImages } from "@/src/components/detail-page/image-gallery";
import { ProductInfo } from "@/src/components/detail-page/product-info";
import ProductTabs from "@/src/components/detail-page/producti-tab";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const nameFromSlug = resolvedParams.slug.replace(/-/g, " ");

  // 1. DEFINE THE CONTENT FIRST (Right here!)
  const descriptionContent = (
    <div className="space-y-4">
      <p className="text-gray-600">
        The {nameFromSlug} is an upgraded version of the original Puff Bar,
        featuring a significantly larger capacity and an optimized airflow
        design.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        <li>Disposable - Non-Rechargeable & Non-Refillable</li>
        <li>5% Nicotine Salt Strength</li>
        <li>Approximately 800 Puffs per device</li>
        <li>Integrated 550mAh Battery</li>
      </ul>
    </div>
  );

  const specsContent = (
    <ul className="space-y-2 text-gray-600">
      <li>
        <strong>Battery:</strong> 550mAh
      </li>
      <li>
        <strong>E-liquid:</strong> 3.2mL
      </li>
      <li>
        <strong>Nicotine:</strong> 50mg (5%)
      </li>
    </ul>
  );

  const productImages = [
    "/cards/card6.webp",
    "/cards/card2.webp",
    "/cards/card3.jpg",
    "/cards/card4.jpg",
  ];

  return (
    <main className="mx-auto max-w-[1440px] px-4 lg:px-8 py-12 bg-[#fcfcfc] min-h-screen">
      {/* Breadcrumb */}
      <nav className="flex text-[11px] font-medium text-gray-400 mb-8 items-center gap-2 tracking-wide uppercase">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <span>›</span>
        <Link href="/collection" className="hover:text-black transition-colors">
          Disposable Vapes
        </Link>
        <span>›</span>
        <span className="text-black">{nameFromSlug}</span>
      </nav>

      <div className="bg-white p-4 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-16 border border-zinc-200 rounded-md">
        <ProductImages name={nameFromSlug} images={productImages} />
        <ProductInfo name={nameFromSlug} />
      </div>
      {/* 2. Place the Tabs Component beneath the upper section */}
      <ProductTabs
        description={descriptionContent}
        specifications={<p>Internal Battery: 550mAh, E-liquid: 3.2mL</p>}
        reviewsCount={128}
        reviewsList={<p>No reviews yet. Be the first to review!</p>}
      />
    </main>
  );
}
