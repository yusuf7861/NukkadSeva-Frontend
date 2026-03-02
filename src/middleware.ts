import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from './types/backend';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const publicPaths = ['/login', '/signup', '/verify-otp', '/forgot-password', '/reset-password'];
    const isPublicPath = publicPaths.includes(path);
    const isPublicProviderPath = path.startsWith('/provider/onboarding') || path.startsWith('/provider/verify-email');

    const token = request.cookies.get('access_token')?.value;

    // Redirect unauthenticated users away from protected routes
    if (!token && !isPublicPath && !isPublicProviderPath && path !== '/' && !path.startsWith('/providers')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Redirect authenticated users away from public auth pages
    if (token && isPublicPath) {
        try {
            const decoded = jwtDecode<DecodedToken>(token);

            // Check expiry
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                const response = NextResponse.redirect(new URL('/login', request.url));
                response.cookies.delete('access_token');
                return response;
            }

            if (decoded.role === "ADMIN") {
                return NextResponse.redirect(new URL('/admin/dashboard', request.url));
            } else if (decoded.role === "SERVICE_PROVIDER" || decoded.role === "PROVIDER") {
                return NextResponse.redirect(new URL('/provider/dashboard', request.url));
            } else {
                return NextResponse.redirect(new URL('/customer/dashboard', request.url));
            }
        } catch (e) {
            // Invalid token, allow access to public path
            return NextResponse.next();
        }
    }

    // Role-Based Access Control
    if (token) {
        try {
            const decoded = jwtDecode<DecodedToken>(token);

            // Check expiry for all authenticated requests
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                const response = NextResponse.redirect(new URL('/login', request.url));
                response.cookies.delete('access_token');
                return response;
            }

            if (path.startsWith('/admin') && decoded.role !== 'ADMIN') {
                return NextResponse.redirect(new URL('/login', request.url));
            }

            if (path.startsWith('/provider') && !isPublicProviderPath && (decoded.role !== 'SERVICE_PROVIDER' && decoded.role !== 'PROVIDER')) {
                return NextResponse.redirect(new URL('/login', request.url));
            }

            if (path.startsWith('/customer') && (decoded.role !== 'CUSTOMER' && decoded.role !== 'USER')) {
                return NextResponse.redirect(new URL('/login', request.url));
            }

        } catch (e) {
            // Invalid token, redirect to login
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete('access_token');
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.webp$|favicon.ico).*)'],
};
