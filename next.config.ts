import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'camo.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.discordapp.com',
            },
            {
                protocol: 'https',
                hostname: 'github.com',
            },
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
            },
            {
                protocol: 'https',
                hostname: 'lanyard.rest',
            },
            {
                protocol: 'https',
                hostname: 'opengraph.githubassets.com',
            },
        ],
    },
};

export default nextConfig;
