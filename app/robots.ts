import type { MetadataRoute } from "next";

const SITE = "https://debertjamie.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Admin + Sanity Studio are owner-only; API and the link shortener are
      // not useful content for crawlers. Admin is locale-prefixed
      // (/en/admin, /zh-CN/admin), so match it under any locale with a wildcard.
      disallow: ["/*/admin", "/studio", "/api/", "/l/"],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
