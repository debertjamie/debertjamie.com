import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

if (
  process.env.NODE_ENV === "production" &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
) {
  throw new Error(
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is missing at build time. " +
      "Set it in your Cloudflare build environment or local .env before running `opennextjs-cloudflare build`.",
  );
}

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    qualities: [100, 75],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.debertjamie.com", pathname: "/**", },
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/**", },
      { protocol: "https", hostname: "i.scdn.co", pathname: "/**", },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**", },
    ],
  },
};

export default nextConfig;
