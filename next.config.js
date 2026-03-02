/** @type {import('next').NextConfig} */
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
        ],
    },

    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-DNS-Prefetch-Control', value: 'on' },
                    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=()"
                    },
                    {
                        key: "Content-Security-Policy",
                        // Next.js requires 'unsafe-inline' and 'unsafe-eval' for scripts (especially in development mode), and ws:/wss: for hot reloading.
                        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' https://nukkadseva.blob.core.windows.net https://images.unsplash.com https://randomuser.me https://via.placeholder.com data: blob:; font-src 'self' data:; connect-src 'self' https: ws: wss:; frame-ancestors 'none';"
                    }
                ]
            }
        ];
    }
};

module.exports = nextConfig;