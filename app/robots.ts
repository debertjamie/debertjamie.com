import type { MetadataRoute } from "next";

const SITE = "https://debertjamie.com";

// AI training / scraping crawlers to keep out of the site. These are the
// user-agents of well-known LLM data-collection and AI-answer bots; the
// well-behaved ones honor robots.txt. Search engine crawlers (Googlebot,
// Bingbot, DuckDuckBot, Applebot, etc.) are intentionally NOT in this list so
// the site stays fully indexable for search.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "CCBot",
  "Bytespider",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "Meta-ExternalAgent",
  "meta-externalagent",
  "FacebookBot",
  "Diffbot",
  "Omgili",
  "omgilibot",
  "cohere-ai",
  "DuckAssistBot",
  "ImagesiftBot",
  "Timpibot",
  "YouBot",
] as const;

// Owner-only and non-content paths that no crawler should index. Admin is
// locale-prefixed (/en/admin, /zh-CN/admin), so match it under any locale.
const DISALLOWED_PATHS = ["/*/admin", "/studio", "/api/", "/l/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Search engines and everything else: allow the site, minus private paths.
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      // AI training / scraping crawlers: disallow the entire site.
      {
        userAgent: [...AI_CRAWLERS],
        disallow: "/",
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
