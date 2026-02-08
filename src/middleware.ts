import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // In a real app, we would verify the JWT token cookie here.
    // For this dummy implementation, checking "AuthContext" client-side is the primary guard,
    // but we can add some basic checks if cookies existed.

    // Since we are using client-side dummy auth mostly, this middleware 
    // mainly serves as a placeholder for future real auth enforcement.
    // However, we can enforce that paths exist.

    // Check if path is /dashboard and redirect to /customer/dashboard if needed
    // (though we moved the files, so /dashboard might 404 now unless we have a rewrite)

    const path = request.nextUrl.pathname;

    // Strict Role Enforcement Placeholders
    // If we had a session cookie 'user_role', we would do:
    // const userRole = request.cookies.get('user_role')?.value;

    // if (path.startsWith('/admin') && userRole !== 'ADMIN') {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
