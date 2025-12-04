/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.jp",
                port: "", pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "github.com",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "cdn.discordapp.com",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "i.scdn.co",
                port: "",
                pathname: "/**"
            },
        ],
    },
};

export default nextConfig;
