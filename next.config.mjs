/** @type {import('next').NextConfig} */
const nextConfig = {
    reactCompiler: true,

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
                hostname: "i.scdn.co",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
