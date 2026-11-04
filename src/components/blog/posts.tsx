import { type TFunction } from "i18next";
import { postsQuery } from "@/src/lib/sanity/query";
import { sanityFetch } from "@/src/lib/sanity/client";
import type { PostType } from "@/src/lib/blog";
import { Card, FeaturedCard } from "./card";

export async function Posts({
  t,
  locale,
}: {
  t: TFunction<"blog", undefined>;
  locale: string;
}) {
  const posts: PostType[] = await sanityFetch({
    query: postsQuery,
    tags: ["posts"],
  });

  if (posts.length === 0) {
    return <p className="px-4 sm:px-8 py-16 text-xl text-mist-600">{t("notFound")}</p>;
  }

  const [latest, ...rest] = posts;
  return (
    <div className="flex flex-col">
      <FeaturedCard post={latest} locale={locale} />
      {rest.map((post) => (
        <article key={post._id}>
          <Card post={post} locale={locale} />
        </article>
      ))}
    </div>
  );
}
