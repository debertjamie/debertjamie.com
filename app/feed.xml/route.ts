import { postsQuery } from "@/src/lib/sanity/query";
import { sanityFetch } from "@/src/lib/sanity/client";
import type { PostType } from "@/src/lib/blog";

const SITE = "https://debertjamie.com";
const LOCALES = ["en", "zh-CN"];

// Escape the five XML predefined entities so post content can't break the feed.
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  let posts: PostType[] = [];
  try {
    posts = await sanityFetch({ query: postsQuery, tags: ["posts"] });
  } catch {
    posts = [];
  }

  const published = posts
    .filter((post) => post.isPublished && post.slug)
    .sort(
      (a, b) =>
        new Date(b.date || b._createdAt).getTime() -
        new Date(a.date || a._createdAt).getTime(),
    );

  const lastBuildDate = (
    published[0]
      ? new Date(published[0].date || published[0]._createdAt)
      : new Date()
  ).toUTCString();

  const items = published
    .map((post) => {
      const locale = LOCALES.includes(post.locale) ? post.locale : "en";
      const link = `${SITE}/${locale}/blog/${post.slug}`;
      const pubDate = new Date(post.date || post._createdAt).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description>${escapeXml(post.description || "")}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Debert Jamie — Blog</title>
    <link>${SITE}/en/blog</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Writing from debertjamie.com</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
