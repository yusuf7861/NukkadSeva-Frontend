/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'nukkadseva.blob.core.windows.net',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'randomuser.me',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.google.com',
                pathname: '/**',
            },
        ],
    },

    async headers() {
        // Security headers applied to all routes
        const securityHeaders = [
            { key: 'X-DNS-Prefetch-Control', value: 'on' },
            { key: 'X-Frame-Options', value: 'DENY' },
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ];

        // Production-only headers
        if (!isDev) {
            securityHeaders.push(
                { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
                { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
                {
                    key: 'Content-Security-Policy',
                    value: [
                        "default-src 'self'",
                        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://apis.google.com",
                        "style-src 'self' 'unsafe-inline' https://accounts.google.com",
                        "img-src 'self' https://nukkadseva.blob.core.windows.net https://images.unsplash.com https://randomuser.me https://via.placeholder.com https://www.google.com https://lh3.googleusercontent.com data: blob:",
                        "font-src 'self' data:",
                        "connect-src 'self' https:",
                        "frame-src https://accounts.google.com",
                        "frame-ancestors 'none'",
                    ].join('; ') + ';'
                }
            );
        }

        return [
            {
                source: '/(.*)',
                headers: securityHeaders,
            },
        ];
    },
};

module.exports = nextConfig;