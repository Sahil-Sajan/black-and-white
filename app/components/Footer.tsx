import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, HelpCircle, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-20 pb-10 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-b border-zinc-800 pb-16">
                
                {/* Brand / About */}
                <div className="flex flex-col gap-6">
                    <Link href="/" className="relative block h-16 w-16 transition-transform duration-300 hover:scale-105">
                        <Image
                            src="/logo.jfif"
                            alt="Black & White Vapors Logo"
                            fill
                            className="object-contain"
                        />
                    </Link>
                    <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                        Black & White Vapors provides premium portable and easy-to-use vape pens from today's top brands, ensuring an exceptional experience for all users.
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                        <Link href="#" className="w-10 h-10 rounded-sm bg-zinc-900 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300">
                            <Facebook size={18} />
                        </Link>
                        <Link href="#" className="w-10 h-10 rounded-sm bg-zinc-900 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300">
                            <Twitter size={18} />
                        </Link>
                        <Link href="#" className="w-10 h-10 rounded-sm bg-zinc-900 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300">
                            <Instagram size={18} />
                        </Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-[13px] font-black uppercase tracking-[0.2em] text-white mb-8 border-l-4 border-white pl-3">Quick Links</h3>
                    <ul className="flex flex-col gap-4">
                        <li>
                            <Link href="/collection" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors duration-300 inline-flex items-center group">
                                <span className="w-0 h-[1px] bg-white mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                                New Arrivals
                            </Link>
                        </li>
                        <li>
                            <Link href="/collection" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors duration-300 inline-flex items-center group">
                                <span className="w-0 h-[1px] bg-white mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                                Vape Kits
                            </Link>
                        </li>
                        <li>
                            <Link href="/collection" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors duration-300 inline-flex items-center group">
                                <span className="w-0 h-[1px] bg-white mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                                Disposables
                            </Link>
                        </li>
                        <li>
                            <Link href="/collection" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors duration-300 inline-flex items-center group">
                                <span className="w-0 h-[1px] bg-white mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                                E-Liquids
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h3 className="text-[13px] font-black uppercase tracking-[0.2em] text-white mb-8 border-l-4 border-white pl-3">Customer Service</h3>
                    <ul className="flex flex-col gap-5">
                        <li className="flex items-start gap-3 text-sm text-zinc-400">
                            <Phone className="shrink-0 mt-0.5" size={16} />
                            <div>
                                <p className="font-bold text-white mb-1">Call Us</p>
                                <p>+1 (800) 123-4567</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-zinc-400">
                            <Mail className="shrink-0 mt-0.5" size={16} />
                            <div>
                                <p className="font-bold text-white mb-1">Email</p>
                                <p>support@blackwhitevapors.com</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-zinc-400">
                            <HelpCircle className="shrink-0 mt-0.5" size={16} />
                            <div>
                                <Link href="#" className="font-bold text-white mb-1 hover:underline">FAQ & Help Center</Link>
                                <p>Find answers quickly</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Recent Blogs */}
                <div>
                    <h3 className="text-[13px] font-black uppercase tracking-[0.2em] text-white mb-8 border-l-4 border-white pl-3">Recent Blogs</h3>
                    <ul className="flex flex-col gap-5">
                        <li>
                            <Link href="/blog/the-future-of-vaping" className="group block">
                                <p className="text-sm font-bold text-white mb-1 group-hover:underline">The Future of Vaping 2024</p>
                                <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest">Oct 12, 2023</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog/understanding-nicotine-salts" className="group block">
                                <p className="text-sm font-bold text-white mb-1 group-hover:underline">Understanding Nicotine Salts</p>
                                <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest">Sept 28, 2023</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog/top-5-disposables" className="group block">
                                <p className="text-sm font-bold text-white mb-1 group-hover:underline">Top 5 Disposables right now</p>
                                <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest">Aug 05, 2023</p>
                            </Link>
                        </li>
                    </ul>
                    <Link href="/blog" className="inline-block mt-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white border-b border-zinc-600 hover:border-white transition-all pb-1">
                        View All Articles
                    </Link>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} Black & White Vapors. All Rights Reserved.
                </p>
                <div className="flex items-center gap-6">
                    <Link href="#" className="text-[11px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">Privacy Policy</Link>
                    <Link href="#" className="text-[11px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
