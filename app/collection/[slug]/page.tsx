import { notFound } from "next/navigation";
import ProductDetailView from "@/src/components/detail-page/ProductDetailView";
import ProductTabs from "@/src/components/detail-page/producti-tab";
import { NicotineWarningMarquee } from "@/src/components/Banner";
import { REVIEWS } from "@/src/components/detail-page/reviews";

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
  variants: {
    name: string;
    image: string | null;
    _id: string;
  }[];
}

async function getProductBySlug(slug: string): Promise<Product | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/products/slug/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.product || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

/** Deterministic review count from slug — same product always shows same count */
function getReviewCount(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) & 0xffffffff;
  }
  // Map to a range of 4–15
  return 4 + (Math.abs(hash) % 12);
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const reviewCount = getReviewCount(slug);
  const productReviews = REVIEWS.slice(0, reviewCount);

  return (
    <div className="bg-white min-h-screen">
      <NicotineWarningMarquee />

      <main className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <ProductDetailView product={product} />

        {/* Bottom: Tabs & Content */}
        <ProductTabs
          description={
            <div className="space-y-6">
              <p className="text-zinc-600 leading-relaxed text-base">
                {product.description || "Premium quality product directly from our official catalog. Designed for durability and performance."}
              </p>
            </div>
          }
          reviewsCount={reviewCount}
          reviewsList={
            <div className="space-y-8 py-4">
              {productReviews.map((review) => (
                <div key={review.id} className="flex gap-5 pb-8 border-b border-slate-100 last:border-0">
                  <div className="w-11 h-11 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xs shrink-0">
                    {review.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <p className="text-sm font-black text-slate-900">{review.name}</p>
                      <span className="flex gap-0.5">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <svg key={i} className="w-3 h-3 text-amber-400 fill-amber-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        ))}
                      </span>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Verified Purchase</span>
                      <span className="text-[9px] text-slate-400 ml-auto">{review.date}</span>
                    </div>
                    <p className="text-xs text-zinc-500 font-medium leading-relaxed max-w-2xl">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          }
        />
      </main>
    </div>
  );
}
