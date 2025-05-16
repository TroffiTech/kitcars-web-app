import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [new URL("https://static-maps.yandex.ru")],
    },
    env: {
        domenUrl: "http://localhost:3000",
    },
};

export default nextConfig;
