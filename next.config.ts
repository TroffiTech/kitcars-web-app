// import { execSync } from "child_process";
import type { NextConfig } from "next";

// execSync("node scripts/updateContent.js", { stdio: "inherit" });

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [new URL("https://static-maps.yandex.ru")],
    },
};

export default nextConfig;
