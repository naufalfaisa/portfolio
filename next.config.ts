import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.jp",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "github.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "cdn.discordapp.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
