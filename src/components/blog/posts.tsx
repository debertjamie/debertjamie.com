import { postsQuery } from "@/src/lib/sanity/lib/query";
import { sanityFetch } from "@/src/lib/sanity/lib/client";
import type { PostType } from "@/src/lib/blog";
import { Card } from "./card";
import { getDictionary } from "@/app/[lang]/dictionaries";

export async function Posts({ dict, locale }: { dict: Awaited<ReturnType<typeof getDictionary>>; locale: string }) {
  const posts: PostType[] = await sanityFetch({
    query: postsQuery,
    tags: ["posts"],
  });

  return (
    <section className="flex flex-col gap-4 py-2">
      {posts.length > 0 ? (
        <div className="grid gap-y-8 max-w-2xl">
          {posts.map((post) => post.isPublished && (
            <article key={post._id}>
              <Card post={post} locale={locale} />
            </article>
          ))}
        </div>
      ) : (
        <div className="flex">
          <p>
            {dict.blog.notFound}
          </p>
        </div>
      )}
    </section>
  );
}