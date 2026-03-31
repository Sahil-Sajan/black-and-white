export const ProductHeader = ({ count }: { count: number }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-zinc-100 pb-6">
            <span className="text-sm text-zinc-500 font-medium italic">
                Displays 1-60 of {count}
            </span>
            <div className="flex items-center gap-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Sort By</span>
                <select className="border border-zinc-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider outline-none focus:border-black">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                </select>
            </div>
        </div>
    );
};