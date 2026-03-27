'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Default password as requested
    const VALID_PASSWORD = "12345";

    return (
        <div className="min-h-screen w-full flex bg-[#F3FBF7]">

            {/* LEFT SIDE: Image (50% Width) */}
            <div className="hidden lg:block w-1/2 relative bg-zinc-100">
                <Image
                    src="/logo.jfif"
                    alt="Admin Portal Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Optional Overlay to make it look professional */}
                <div className="absolute inset-0 bg-black/5" />
            </div>

            {/* RIGHT SIDE: Login Component (50% Width) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white">
                <div className="w-full max-w-[450px]">
                    <div className="mb-10 text-center lg:text-left">
                        <h1 className="text-4xl font-black text-[#111827] tracking-tight">SIGN IN</h1>
                        <p className="text-gray-400 mt-2 font-medium">Welcome back! Please enter your details.</p>
                    </div>

                    <div className="space-y-6">
                        {/* Username Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Username</label>
                            <input
                                type="text"
                                placeholder="Email or Phone Number"
                                className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#58B3A3] transition-all"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#58B3A3] transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#58B3A3]"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button className="text-[#58B3A3] text-sm font-bold hover:underline">
                                Forgot Password?
                            </button>
                        </div>

                        {/* Sign In Button */}
                        <Link
                            href={password === VALID_PASSWORD ? "/dashboard" : "#"}
                            className={`block w-full text-center py-4 rounded-2xl font-black uppercase tracking-widest text-white transition-all shadow-lg ${password === VALID_PASSWORD
                                ? "bg-[#58B3A3] hover:bg-[#48998b] shadow-[#58B3A3]/20"
                                : "bg-gray-300 cursor-not-allowed"
                                }`}
                        >
                            Sign in
                        </Link>

                        {/* Divider */}
                        <div className="relative flex items-center py-4">
                            <div className="flex-grow border-t border-gray-100"></div>
                            <span className="flex-shrink mx-4 text-[10px] font-black text-gray-300 tracking-[0.2em] uppercase">
                                Or
                            </span>
                            <div className="flex-grow border-t border-gray-100"></div>
                        </div>

                        {/* Social Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-3 border border-gray-100 py-3.5 rounded-2xl hover:bg-gray-50 transition-colors group">
                                <span className="text-sm font-bold text-gray-600">Google</span>
                            </button>
                            <button className="flex items-center justify-center gap-3 bg-[#1B2631] text-white py-3.5 rounded-2xl hover:bg-black transition-colors">
                                <span className="text-sm font-bold">Apple</span>
                            </button>
                        </div>

                        <p className="text-center text-sm text-gray-500 pt-4">
                            Don't have an account? <Link href="/register" className="text-[#58B3A3] font-bold hover:underline">Create one</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}