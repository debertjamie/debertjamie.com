import type { TFunction } from "i18next";
import { ArrowUpRight } from "lucide-react";
import { sanityFetch } from "@/src/lib/sanity/client";
import { postsQuery } from "@/src/lib/sanity/query";
import type { PostType } from "@/src/lib/blog";
import { formatDate } from "@/src/lib/blog";
import { ExtendedLink as Link } from "../commons/extendlink";

// Fetches the two most recent published posts from Sanity.
// This is an async Server Component — no client boundary needed here.
export async function RecentPosts({
  t,
  locale,
}: {
  t: TFunction<"home", undefined>;
  locale: string;
}) {
  let posts: PostType[] = [];

  try {
    const all: PostType[] = await sanityFetch({
      query: postsQuery,
      tags: ["posts"],
    });
    // postsQuery already filters isPublished == true; just cap to 2
    posts = all.slice(0, 2);
  } catch {
    // Gracefully degrade — show empty state on Sanity errors
    posts = [];
  }

  return (
    <div className="border shadow-md rounded-3xl border-mist-400 p-4 flex flex-col gap-3 h-full">
      <h2 className="text-base font-semibold">{t("grid.recent_posts_title")}</h2>

      {posts.length === 0 ? (
        <p className="text-sm text-mist-500 dark:text-mist-500 flex-1">
          {t("grid.recent_posts_empty")}
        </p>
      ) : (
        <ul className="flex flex-col gap-3 flex-1">
          {posts.map((post) => (
            <li key={post._id}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-0.5 hover:text-mist-600 dark:hover:text-mist-500 transition-colors"
              >
                <span className="text-sm font-medium leading-snug line-clamp-2 group-hover:underline">
                  {post.title}
                </span>
                <span className="text-xs text-mist-500 dark:text-mist-500">
                  {formatDate(post.date ?? post._createdAt, locale)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/blog"
        className="flex items-center gap-1 text-sm font-medium border-b border-current w-fit leading-tight"
      >
        {t("grid.recent_posts_all")}
        <ArrowUpRight className="w-4 h-4" aria-hidden />
      </Link>
    </div>
  );
}
