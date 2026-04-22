"use client";

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppWidget from './WhatsAppWidget';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Exclude Navbar and Footer on any route that starts with /dashboard or is /login
    const isDashboard = pathname?.startsWith('/dashboard');
    const isLogin = pathname === '/login';
    const hideNavigation = isDashboard || isLogin;

    return (
        <>
            {!hideNavigation && (
                <Suspense fallback={<div className="h-20 lg:h-24 bg-black" />}>
                    <Navbar />
                </Suspense>
            )}
            <main className="flex-1">
                {children}
            </main>
            {!hideNavigation && <Footer />}
            <WhatsAppWidget />
        </>
    );
}
