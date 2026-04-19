import { notFound } from "next/navigation";
import ProductDetailView from "@/src/components/detail-page/ProductDetailView";
import ProductTabs from "@/src/components/detail-page/producti-tab";
import { DeliveryBanner, NicotineWarningMarquee } from "@/src/components/Banner";

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

  return (
    <div className="bg-white min-h-screen">
      <NicotineWarningMarquee />
      
      <main className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <ProductDetailView product={product} />

        {/* Bottom: Tabs & Content */}
        <ProductTabs 
          description={
            <div className="space-y-6">
              <p className="text-zinc-600 leading-relaxed text-base italic">
                {product.description || "Discover the next generation of vaping with our curated collection."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-4">Features</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-zinc-500 font-bold text-xs uppercase tracking-tight">
                      <span className="w-1.5 h-1.5 bg-slate-900 rounded-full"></span> Premium Build Quality
                    </li>
                    <li className="flex items-center gap-2 text-zinc-500 font-bold text-xs uppercase tracking-tight">
                      <span className="w-1.5 h-1.5 bg-slate-900 rounded-full"></span> Ergonomic Design
                    </li>
                    <li className="flex items-center gap-2 text-zinc-500 font-bold text-xs uppercase tracking-tight">
                      <span className="w-1.5 h-1.5 bg-slate-900 rounded-full"></span> Long Lasting Battery Life
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-4">In The Box</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-zinc-500 font-bold text-xs uppercase tracking-tight">
                      <span className="w-1.5 h-1.5 bg-slate-900 rounded-full"></span> 1x {product.name}
                    </li>
                    <li className="flex items-center gap-2 text-zinc-500 font-bold text-xs uppercase tracking-tight">
                      <span className="w-1.5 h-1.5 bg-slate-900 rounded-full"></span> 1x User Manual
                    </li>
                    <li className="flex items-center gap-2 text-zinc-500 font-bold text-xs uppercase tracking-tight">
                      <span className="w-1.5 h-1.5 bg-slate-900 rounded-full"></span> Warranty Card
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          }
          specifications={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6 bg-slate-50/50 p-8 rounded-3xl">
              <div className="flex justify-between py-3 border-b border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Brand</span>
                <span className="text-xs font-black text-slate-900">{product.brand}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</span>
                <span className="text-xs font-black text-slate-900">{product.category}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Type</span>
                <span className="text-xs font-black text-slate-900">Vape Device</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Availability</span>
                <span className={`text-xs font-black ${product.isInStock ? "text-emerald-600" : "text-red-600"}`}>
                  {product.isInStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          }
          reviewsCount={12}
          reviewsList={
            <div className="space-y-10 py-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-6 pb-10 border-b border-slate-100 last:border-0">
                  <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-sm shrink-0">
                    {i === 1 ? "AM" : "SL"}
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                       <p className="text-sm font-black text-slate-900">{i === 1 ? "Ahmed Malik" : "Sara Khan"}</p>
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Verified Purchase</span>
                    </div>
                    <p className="text-xs text-zinc-500 font-bold leading-relaxed max-w-2xl italic">
                      &quot;Absolutely fantastic experience. The product quality is top-notch and the flavor is consistent throughout.&quot;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          }
        />
      </main>

      <DeliveryBanner />
    </div>
  );
}
