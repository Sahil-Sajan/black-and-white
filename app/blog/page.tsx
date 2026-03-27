import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const BLOG_POSTS = [
    {
        id: "1",
        title: "The Future of Vaping: What to Expect in 2024",
        slug: "the-future-of-vaping",
        excerpt: "From advanced temperature control to sustainable battery technologies, explore what the new year brings to the vaping industry.",
        date: "October 12, 2023",
        author: "Alex Morgan",
        image: "/cards/card1.webp",
        category: "Industry News"
    },
    {
        id: "2",
        title: "Understanding Nicotine Salts",
        slug: "understanding-nicotine-salts",
        excerpt: "Everything you need to know about nicotine salts, how they differ from freebase nicotine, and which devices work best.",
        date: "September 28, 2023",
        author: "Sarah Lewis",
        image: "/cards/card2.webp",
        category: "Guides"
    },
    {
        id: "3",
        title: "Top 5 Disposables Right Now",
        slug: "top-5-disposables",
        excerpt: "We've tested hundreds of disposable vapes. Here is our curated list of the absolute best devices currently on the market.",
        date: "August 05, 2023",
        author: "Mitch Carter",
        image: "/cards/card3.jpg",
        category: "Reviews"
    },
    {
        id: "4",
        title: "How to Maintain Your Reusable Vape Kit",
        slug: "how-to-maintain-your-vape",
        excerpt: "Make your coils last longer and keep your device performing at its best with this comprehensive maintenance guide.",
        date: "July 18, 2023",
        author: "Emily Davis",
        image: "/cards/card4.jpg",
        category: "Tutorials"
    }
];

export default function BlogListingPage() {
    return (
        <div className="bg-[#fcfcfc] min-h-screen pt-12 pb-24 font-sans">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
                
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">Latest Insights</p>
                    <h1 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter mb-6">Our Journal</h1>
                    <p className="text-zinc-500 leading-relaxed font-medium">Explore expert reviews, maintenance guides, and the latest news spanning the full spectrum of vaping culture.</p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {BLOG_POSTS.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col h-full cursor-pointer">
                            {/* Image Container */}
                            <div className="relative w-full aspect-[4/5] bg-white border border-zinc-100 overflow-hidden mb-6 rounded-md">
                                <div className="absolute inset-0 bg-zinc-900/5 group-hover:bg-transparent transition-colors z-10" />
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                />
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="bg-black text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-1">
                                <p className="text-[11px] font-black text-zinc-400 uppercase tracking-widest mb-3">
                                    {post.date} &bull; BY {post.author.toUpperCase()}
                                </p>
                                <h2 className="text-xl font-black text-black leading-snug mb-3 group-hover:text-zinc-600 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-sm font-medium text-zinc-500 leading-relaxed mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                
                                <div className="mt-auto">
                                    <span className="inline-flex items-center text-[11px] font-black text-black uppercase tracking-[0.2em] group-hover:underline">
                                        Read Article
                                        <svg className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}
