"use client"
import { useRouter, useSearchParams } from "next/navigation";

export const ProductHeader = ({ count }: { count: number }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', e.target.value);
        router.push(`/collection?${params.toString()}`, { scroll: false });
    };

    const currentSort = searchParams.get('sort') || 'featured';

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-zinc-100 pb-6">
            <span className="text-sm text-zinc-500 font-medium italic">
                Displays {count > 0 ? `1-${Math.min(count, 60)}` : '0'} of {count} Products
            </span>
            <div className="flex items-center gap-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Sort By</span>
                <select 
                    value={currentSort}
                    onChange={handleSort}
                    className="border border-zinc-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider outline-none focus:border-black cursor-pointer"
                >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="latest">Newest</option>
                </select>
            </div>
        </div>
    );
};