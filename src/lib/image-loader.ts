"use client";

import type { ImageLoaderProps } from "next/image";

// Custom next/image loader.
//
// On Cloudflare Workers (via OpenNext) the default Next image optimizer runs
// inside the Worker at /_next/image. Every <Image> request therefore hits the
// Worker, which is slow on cold isolates, re-fetches on back-navigation, and
// burns the free-tier CPU budget. This loader bypasses /_next/image entirely by
// pointing each image at a CDN that already does on-the-fly resizing (Sanity,
// Unsplash), or by serving the asset directly when no transform CDN applies.
//
// Configured globally via `images.loader: "custom"` + `images.loaderFile` in
// next.config.ts, so it applies to EVERY next/image in the app.
export default function imageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  const q = quality ?? 75;

  // Protocol-relative or absolute remote URLs.
  if (/^https?:\/\//.test(src) || src.startsWith("//")) {
    let url: URL;
    try {
      url = new URL(src, "https://debertjamie.com");
    } catch {
      return src;
    }

    const host = url.hostname;

    // Sanity image CDN: supports width/quality/auto-format resizing.
    if (host === "cdn.sanity.io") {
      url.searchParams.set("w", String(width));
      url.searchParams.set("q", String(q));
      url.searchParams.set("auto", "format");
      url.searchParams.set("fit", "max");
      return url.toString();
    }

    // Unsplash: supports width/quality/auto-format resizing.
    if (host === "images.unsplash.com") {
      url.searchParams.set("w", String(width));
      url.searchParams.set("q", String(q));
      url.searchParams.set("auto", "format");
      return url.toString();
    }

    // Other remote hosts (R2 bucket, Spotify, etc.) have no known transform
    // API — serve them directly rather than routing through the Worker.
    return url.toString();
  }

  // Local/static assets from /public are served straight from Cloudflare's
  // asset storage; no Worker optimization, no /_next/image round-trip.
  return src;
}
