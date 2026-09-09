import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    qualities: [100, 75],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/**", },
    ],
  },
};

export default nextConfig;
