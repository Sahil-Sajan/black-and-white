import { ProductSidebar } from "../../src/components/browse-components/left-filter";
import { ProductHeader } from "../../src/components/browse-components/header-filter";
import { ProductCard } from "../../src/components/browse-components/product-cards";

export default function ProductBrowserPage() {
  // Dummy data for 10 cards
  const products = Array(10).fill({
    name: "Geek Bar Pulse X 25K Disposable Vape - Sour Mango Pineapple",
    price: 15.99,
    image: "/cards/card6.webp",
    isNew: true,
  });

  return (
    <main className="mx-auto max-w-full md:max-w-[91.66%] px-4 py-8 md:py-12 bg-white">
      <p className="text-[10px] md:text-[11px] text-zinc-400 mb-6 md:mb-8 leading-relaxed max-w-3xl italic">
        Shop the best online catalog...
      </p>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-12">
        <ProductSidebar />

        <div className="flex-grow">
          <ProductHeader count={707} />

          {/* GRID UPDATE: 
                       - grid-cols-1: Single large card on mobile
                       - md:grid-cols-3: 3 cards on tablet/small desktop
                       - gap-y-12: More vertical space between large cards
                    */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-16">
            {products.map((p, i) => (
              <ProductCard key={i} {...p} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
