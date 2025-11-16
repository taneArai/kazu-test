import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "http", hostname: "cms.local.test", pathname: "/wp-content/**" }],
  },
};
export default nextConfig;
