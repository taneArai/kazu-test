import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [{ protocol: "http", hostname: "cms.local.test", pathname: "/wp-content/**" }],
  },
};
export default nextConfig;
