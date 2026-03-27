"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Exclude Navbar and Footer on any route that starts with /dashboard or is /login
    const isDashboard = pathname?.startsWith('/dashboard');
    const isLogin = pathname === '/login';
    const hideNavigation = isDashboard || isLogin;

    return (
        <>
            {!hideNavigation && <Navbar />}
            <main className="flex-1">
                {children}
            </main>
            {!hideNavigation && <Footer />}
        </>
    );
}
