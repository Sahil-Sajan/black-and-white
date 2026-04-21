'use server'

import { cookies } from 'next/headers';

/**
 * Server action to verify the admin password against the environment variable.
 * This keeps the password secure on the server side.
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
    const adminPassword = process.env.ADMIN_PASSWORD;
    const sessionSecret = process.env.SESSION_SECRET;
    
    if (!adminPassword || !sessionSecret) {
        console.error('ADMIN_PASSWORD or SESSION_SECRET is not set in environment variables');
        return false;
    }
    
    if (password === adminPassword) {
        // Set an HTTP-only cookie for the session
        const cookieStore = await cookies();
        cookieStore.set('admin_session', sessionSecret, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 // 24 hours
        });
        return true;
    }
    
    return false;
}

/**
 * Server action to log out the admin by clearing the session cookie.
 */
export async function logoutAdmin() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
}
