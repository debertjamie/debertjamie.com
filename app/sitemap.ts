import type { MetadataRoute } from "next";
import { postsQuery } from "@/src/lib/sanity/query";
import { sanityFetch } from "@/src/lib/sanity/client";
import type { PostType } from "@/src/lib/blog";

const SITE = "https://debertjamie.com";
const LOCALES = ["en", "zh-CN"] as const;

// Top-level pages that exist in both locales. The blog post detail pages are
// added separately from Sanity (each post belongs to a single locale).
const STATIC_PATHS = [
  "",
  "/about",
  "/blog",
  "/projects",
  "/photos",
  "/friends",
  "/now",
  "/contact",
  "/privacy",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages: emit the English URL as canonical with zh-CN as a language
  // alternate, so crawlers understand the bilingual pairing.
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE}/en${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/blog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
    alternates: {
      languages: {
        en: `${SITE}/en${path}`,
        "zh-CN": `${SITE}/zh-CN${path}`,
      },
    },
  }));

  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const posts: PostType[] = await sanityFetch({
      query: postsQuery,
      tags: ["posts"],
    });

    postEntries = posts
      .filter((post) => post.isPublished && post.slug)
      .map((post) => {
        const locale = LOCALES.includes(post.locale as (typeof LOCALES)[number])
          ? post.locale
          : "en";
        return {
          url: `${SITE}/${locale}/blog/${post.slug}`,
          lastModified: new Date(post._updatedAt || post._createdAt),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        };
      });
  } catch {
    // If Sanity is unreachable at build/request time, still return the static
    // sitemap rather than failing the whole route.
    postEntries = [];
  }

  return [...staticEntries, ...postEntries];
}
