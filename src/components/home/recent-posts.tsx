import type { TFunction } from "i18next";
import { sanityFetch } from "@/src/lib/sanity/client";
import { postsQuery } from "@/src/lib/sanity/query";
import type { PostType } from "@/src/lib/blog";
import { formatDate } from "@/src/lib/blog";
import { ExtendedLink as Link } from "../commons/extendlink";

// Latest published post. Sanity errors degrade to the empty state.
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
    posts = all.slice(0, 1);
  } catch {
    posts = [];
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-mist-600">{t("grid.recent_posts_title")}</h3>
      {posts.length === 0 ? (
        <p>{t("grid.recent_posts_empty")}</p>
      ) : (
        <ul className="flex flex-col divide-y divide-mist-300">
          {posts.map((post) => (
            <li key={post._id}>
              <Link
                href={`/blog/${post.slug}`}
                className="flex items-baseline justify-between gap-4 py-2 hover:text-mist-900"
              >
                <span className="font-medium line-clamp-2 underline-offset-4 hover:underline">
                  {post.title}
                </span>
                <span className="text-sm text-mist-600 shrink-0 tabular-nums">
                  {formatDate(post.date ?? post._createdAt, locale)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
