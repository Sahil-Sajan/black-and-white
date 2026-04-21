'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { verifyAdminPassword } from '../../src/lib/actions/auth';

export default function AdminLoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password) return;

        setIsLoading(true);
        setError('');

        try {
            const isValid = await verifyAdminPassword(password);
            if (isValid) {
                router.push('/dashboard');
            } else {
                setError('Invalid password. Please try again.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-[#F3FBF7]">

            {/* LEFT SIDE: Black Background & Slightly narrower width (40%) */}
            <div className="hidden lg:block lg:w-3/5 relative bg-black">
                <div className="relative h-full w-full flex items-center justify-center p-20">
                    <Image
                        src="/logo.jfif"
                        alt="Admin Portal Background"
                        fill
                        // object-contain prevents the logo from stretching to the edges
                        // p-20 on the parent or using a scale class here reduces visual size
                        className="object-contain p-12"
                        priority
                    />
                </div>
            </div>

            {/* RIGHT SIDE: Login Component (60% Width) */}
            <div className="w-full lg:w-3/5 flex items-center justify-center p-8 md:p-16 bg-white">
                <div className="w-full max-w-[450px]">
                    <div className="mb-10 text-center lg:text-left">
                        <h1 className="text-4xl font-black text-[#111827] tracking-tight">SIGN IN</h1>
                        <p className="text-gray-400 mt-2 font-medium">Welcome back! Please enter your details.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    disabled={isLoading}
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
                            {error && (
                                <p className="text-red-500 text-xs font-semibold ml-1 animate-pulse">{error}</p>
                            )}
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            disabled={!password || isLoading}
                            className={`block w-full text-center py-4 rounded-2xl font-black uppercase tracking-widest text-white transition-all shadow-lg flex items-center justify-center gap-2 ${!password || isLoading
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-[#58B3A3] hover:bg-[#48998b] shadow-[#58B3A3]/20"
                                }`}
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}