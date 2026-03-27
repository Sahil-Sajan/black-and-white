import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const BLOG_POSTS = [
    {
        id: "1",
        title: "The Future of Vaping: What to Expect in 2024",
        slug: "the-future-of-vaping",
        excerpt: "From advanced temperature control to sustainable battery technologies, explore what the new year brings to the vaping industry.",
        content: `
            <p>The vaping industry moves incredibly fast. As we head into 2024, the innovations expected to hit the market are nothing short of revolutionary. If you thought the jump from classic pods to disposable powerhouses was massive, wait until you see what's next.</p>
            
            <h3>1. Sustainability is the New Priority</h3>
            <p>Disposable vapes are incredibly convenient, but the environmental toll has drawn criticism. In 2024, expect major brands to shift towards biodegradable chassis and more easily recyclable battery components. Some companies are even exploring closed-loop pod systems that merge the convenience of disposables with the sustainability of reusable kits.</p>

            <h3>2. Smart Temperature Control</h3>
            <p>Hitting a dry coil is the worst. Next-generation chipsets will integrate advanced AI-driven temperature control algorithms that practically eliminate the possibility of a dry hit. These chips monitor the coil's resistance in real-time, shutting off the power milliseconds before the cotton can burn.</p>

            <blockquote>"The evolution of vaping technology isn't just about bigger clouds anymore; it's about perfecting the user experience and guaranteeing safety and consistency."</blockquote>

            <h3>3. E-Liquid Customization</h3>
            <p>We predict a huge rise in modular e-liquid systems, allowing users to precisely control their nicotine intake and mix flavor profiles on the fly via dual-chamber pods. The power is shifting back into the hands of the consumer.</p>

            <p>Stay tuned to Black and White Vapors as we bring you the latest hardware reflecting these incredible 2024 trends!</p>
        `,
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
        content: `
            <p>Nicotine salts have completely completely transformed the low-wattage vaping landscape, but there remains a lot of confusion about what they actually are and why you might want to use them.</p>

            <h3>What exactly is a "Salt"?</h3>
            <p>Don't worry, it's not the table salt you put on your fries. In chemistry, a salt simply refers to the reaction between an acid and a base. Nicotine salts use benzoic or salicylic acid to neutralize the harsh pH of traditional freebase nicotine.</p>

            <h3>The Benefits</h3>
            <ul>
                <li><strong>Smoother Throat Hit:</strong> Because of the altered pH, you can vape a 50mg nicotine salt smoothly, whereas a 50mg freebase e-liquid would be incredibly harsh and painful.</li>
                <li><strong>Faster Absorption:</strong> The chemical structure allows the nicotine to cross the blood-brain barrier much faster, mimicking the immediate satisfaction of a traditional cigarette.</li>
                <li><strong>Better Flavor:</strong> The lower temperatures required to vaporize nic salts preserve the delicate flavor molecules of your e-liquid.</li>
            </ul>

            <p>If you have a pod system or use disposable vapes, you are almost certainly using nicotine salts. For high-wattage sub-ohm tanks, stick to traditional freebase!</p>
        `,
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
        content: `
             <p>The disposable vape market is absolutely flooded. Sifting through the mediocre devices to find the gems is a full-time job—luckily, it's ours. Here are the top 5 disposables we recommend right now.</p>
             
             <h3>1. Elf Bar BC5000</h3>
             <p>A classic for a reason. The dual-coil system ensures flavor persists from the first puff to the 5,000th. The compact box design fits perfectly in the palm.</p>

             <h3>2. Geek Bar Pulse</h3>
             <p>The first disposable with a truly functional smart screen. It shows exactly how much battery and juice you have left, eliminating the dreaded "surprise" dry hit.</p>

             <h3>3. Lost Mary OS5000</h3>
             <p>Boasting a unique textured shell and incredible airflow, the Lost Mary provides one of the tightest, most satisfying MTL (Mouth-To-Lung) draws on the market.</p>

             <h3>4. Flum Pebble</h3>
             <p>Smooth, rounded, and incredibly pocketable. Flum always nails their flavor profiles, but their cooling elements in the Pebble series are unmatched.</p>

             <h3>5. Funky Republic Ti7000</h3>
             <p>A higher capacity disposable boasting a screen and a beautifully sleek metallic finish. It looks like a premium, reusable pod system.</p>
        `,
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
        content: `
            <p>Switching from disposables to a reusable kit is great for your wallet and the environment, but it does require a bit of upkeep. Follow these simple steps to ensure your device performs perfectly.</p>

            <h3>1. Prime Your Coils</h3>
            <p>Never install a brand new coil and immediately hit it. You must add 5-6 drops of e-liquid directly down the center of the coil onto the cotton. Once installed in the tank and filled, let it sit for 10 minutes before your first puff.</p>

            <h3>2. Clean Your Tank Weekly</h3>
            <p>Juice residue builds up over time and ruins flavor. Once a week, disassemble your tank, remove the coil, and rinse the glass and metal components in warm water. Let them dry completely before reassembling.</p>

            <h3>3. Keep the Contacts Clean</h3>
            <p>If your device says "Check Atomizer," you likely have e-liquid on the 510 connection (where the tank screws into the battery). Take a cotton swab dipped in a tiny bit of rubbing alcohol and clean the gold contacts on both the battery and the tank.</p>

            <p>A little love goes a long way in ensuring your vape kit lasts for years to come!</p>
        `,
        date: "July 18, 2023",
        author: "Emily Davis",
        image: "/cards/card4.jpg",
        category: "Tutorials"
    }
];

export async function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    // Await params if using Next.js 14/15, but Next 13 allows direct access, though awaiting is safer for future upgrades.
    // In React 18 / Next 14+ params is technically a promise, awaiting it is best practice if it complains.
    const { slug } = await params; 
    
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <h1 className="text-3xl font-black uppercase text-black mb-4">Post Not Found</h1>
                <Link href="/blog" className="text-sm font-bold border-b border-black pb-1 hover:text-zinc-500 uppercase tracking-widest transition-colors">Return to Blog</Link>
            </div>
        );
    }

    return (
        <article className="bg-white min-h-screen">
            
            {/* Hero Image Area */}
            <div className="w-full h-[50vh] md:h-[60vh] bg-zinc-50 border-b border-zinc-200 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent z-10" />
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-contain p-12 md:p-24 opacity-80"
                    priority
                />
            </div>

            {/* Content Container */}
            <div className="max-w-[800px] mx-auto px-4 lg:px-8 relative z-20 -mt-32">
                
                {/* Title Header Block */}
                <div className="bg-white p-8 md:p-12 border border-zinc-100 shadow-xl rounded-md mb-16 text-center">
                    <span className="inline-block bg-black text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm mb-6">
                        {post.category}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-black leading-[1.1] uppercase tracking-tighter mb-6">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-[11px] font-bold text-zinc-500 uppercase tracking-widest divide-x divide-zinc-200">
                        <span className="pr-4">{post.date}</span>
                        <span className="pl-4">BY {post.author}</span>
                    </div>
                </div>

                {/* Markdown / HTML Content Injection */}
                <div 
                    className="max-w-none pb-24 text-zinc-600 leading-relaxed font-medium text-lg [&>p]:mb-6 [&>h3]:text-2xl [&>h3]:font-black [&>h3]:text-black [&>h3]:uppercase [&>h3]:tracking-tighter [&>h3]:mb-4 [&>h3]:mt-12 [&>blockquote]:border-l-4 [&>blockquote]:border-black [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-xl [&>blockquote]:text-zinc-800 [&>blockquote]:my-10 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-3 [&>ul>li>strong]:text-black [&>a]:text-black [&>a]:border-b [&>a]:border-black [&>a]:pb-0.5 [&>a]:font-bold hover:[&>a]:text-zinc-500"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Footer Navigation */}
                <div className="border-t border-zinc-200 py-12 flex justify-between items-center">
                    <Link href="/blog" className="inline-flex items-center text-[11px] font-black text-black uppercase tracking-[0.2em] hover:text-zinc-500 transition-colors">
                        <svg className="w-3 h-3 mr-2 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        Back to Articles
                    </Link>
                </div>

            </div>
        </article>
    );
}
