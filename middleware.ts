import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = request.cookies.get('admin_session');
    const sessionSecret = process.env.SESSION_SECRET;

    // Check if the route is a dashboard page
    if (pathname.startsWith('/dashboard')) {
        if (!session || session.value !== sessionSecret) {
            // Redirect to home page if not authenticated
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // Check if the route is a dashboard API
    const protectedApiPatterns = [
        '/api/dashboard',
        '/api/customers',
        '/api/orders',
        '/api/upload',
    ];

    const isProtectedApi = protectedApiPatterns.some(pattern => pathname.startsWith(pattern));
    
    // For products API, only protect write methods (POST, PUT, DELETE, PATCH)
    const isProductWrite = pathname.startsWith('/api/products') && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method);

    if (isProtectedApi || isProductWrite) {
        if (!session || session.value !== sessionSecret) {
            return NextResponse.json(
                { error: 'Unauthorized. Admin access required.' },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/api/dashboard/:path*',
        '/api/customers/:path*',
        '/api/orders/:path*',
        '/api/upload/:path*',
        '/api/products/:path*',
    ],
};
