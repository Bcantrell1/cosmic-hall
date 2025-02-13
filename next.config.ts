import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.nasa.gov',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images-api.nasa.gov',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images-assets.nasa.gov',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
