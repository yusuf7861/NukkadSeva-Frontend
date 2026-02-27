/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'nukkadseva.blob.core.windows.net',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;
