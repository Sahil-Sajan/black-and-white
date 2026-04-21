import { ProductSidebar } from "../../src/components/browse-components/left-filter";
import { ProductHeader } from "../../src/components/browse-components/header-filter";
import { ProductCard } from "../../src/components/browse-components/product-cards";

interface Product {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  price: number;
  isInStock: boolean;
  mainImage: string | null;
  variants: {
    name: string;
    image: string | null;
  }[];
  description: string;
  createdAt: string;
}

export default async function ProductBrowserPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string; category?: string; search?: string; minPrice?: string; maxPrice?: string; sort?: string; capacity?: string; mg?: string }>;
}) {
  const { brand, category, search, minPrice, maxPrice, sort, capacity, mg } = await searchParams;

  // Construct API URL with filters
  const params = new URLSearchParams();
  if (brand) params.set("brand", brand);
  if (category) params.set("category", category);
  if (search) params.set("search", search);
  if (minPrice) params.set("minPrice", minPrice);
  if (maxPrice) params.set("maxPrice", maxPrice);
  if (sort) params.set("sort", sort);
  if (capacity) params.set("capacity", capacity);
  if (mg) params.set("mg", mg);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const apiUrl = `${baseUrl}/api/products${params.toString() ? `?${params.toString()}` : ""}`;

  let products: Product[] = [];
  let totalCount = 0;

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      products = data.products || [];
      totalCount = data.stats?.total || 0;
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <main className="mx-auto max-w-full md:max-w-[91.66%] px-4 py-8 md:py-12 bg-white">
      <p className="text-[10px] md:text-[11px] text-zinc-400 mb-6 md:mb-8 leading-relaxed max-w-3xl italic">
        Shop the best online catalog...
      </p>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-12">
        <ProductSidebar />

        <div className="grow">
          <ProductHeader count={totalCount} />

          {/* GRID UPDATE: 
                       - grid-cols-1: Single large card on mobile
                       - md:grid-cols-3: 3 cards on tablet/small desktop
                       - gap-y-12: More vertical space between large cards
                    */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-16">
            {products.map((p) => (
              <ProductCard
                key={p._id}
                name={p.name}
                price={p.price}
                slug={p.slug}
                image={p.mainImage || p.variants[0]?.image || "/cards/card6.webp"}
                isNew={new Date(p.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)}
                isInStock={p.isInStock}
              />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-24 bg-zinc-50 rounded-lg border border-dashed border-zinc-200 mt-8">
              <p className="text-zinc-500 font-medium">No products found for this selection.</p>
              <p className="text-zinc-400 text-sm mt-1">Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
