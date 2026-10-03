import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    qualities: [100, 75],
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.debertjamie.com", pathname: "/**", },
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/**", },
      { protocol: "https", hostname: "i.scdn.co", pathname: "/**", },
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/**", },
      { protocol: "https", hostname: "i.scdn.co", pathname: "/**", },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**", },
    ],
  },
};

export default nextConfig;
