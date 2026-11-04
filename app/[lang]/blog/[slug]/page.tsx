import { alternates } from "@/src/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { singlePostQuery } from "@/src/lib/sanity/query";
import { sanityFetch } from "@/src/lib/sanity/client";
import {
  formatDate,
  readTime,
  toPlainText,
  type PostType,
} from "@/src/lib/blog";
import { PortableTextRenderer } from "@/src/components/sanity/portableText";
import { Reveal } from "@/src/components/commons/reveal";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;

  const post: PostType = await sanityFetch({
    query: singlePostQuery,
    qParams: { slug },
    tags: ["post"],
  });

  if (!post) {
    notFound();
  }

  const ogImage = new URL(`/${lang}/og`, "https://debertjamie.com");
  ogImage.searchParams.set("title", post.title);
  ogImage.searchParams.set("description", post.description);

  return {
    alternates: alternates(lang, `/blog/${slug}`),
    title: post.title,
    description: post.description,
    keywords: post.tags.map((t) => t.tag),
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://debertjamie.com/${lang}/blog/${post.slug}`,
      authors: post.author.name,
      tags: post.tags.map((t) => t.tag),
      publishedTime: post.date || post._createdAt,
      modifiedTime: post._updatedAt || "",
      images: [
        {
          url: ogImage.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/png",
        },
      ],
      locale: post.locale,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [
        {
          url: ogImage.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/png",
        },
      ],
      creator: `@${post.author.twitterUrl.split(".com/")[1]}`,
      site: `@${post.author.twitterUrl.split(".com/")[1]}`,
    },
  };
}

export default async function PostPage({
  params,
}: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;

  const post: PostType = await sanityFetch({
    query: singlePostQuery,
    qParams: { slug },
    tags: ["post"],
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="flex flex-col pb-24">
      <header className="flex flex-col gap-6 px-4 sm:px-8 pt-16 pb-10 md:pt-24 max-w-5xl">
        {post.tags?.length > 0 && (
          <p className="flex flex-wrap gap-x-3 text-base font-medium text-mist-600">
            {post.tags.map((tag) => (
              <span key={tag.slug}>#{tag.tag}</span>
            ))}
          </p>
        )}
        <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-semibold tracking-tighter leading-[1.02] text-balance">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-xl sm:text-2xl leading-snug text-mist-700 text-pretty max-w-3xl">
            {post.description}
          </p>
        )}
        <p className="flex flex-wrap gap-x-3 gap-y-1 text-base text-mist-600">
          <span>{post.author.name}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date || post._createdAt}>
            {formatDate(post.date || post._createdAt, lang)}
          </time>
          <span aria-hidden>·</span>
          <span>{readTime(toPlainText(post.body))}</span>
        </p>
      </header>
      <div className="px-4 sm:px-8">
        <div className="relative aspect-video max-h-[70vh] w-full overflow-hidden rounded-3xl bg-mist-200">
          <Image
            src={post.mainImage.image}
            alt={post.mainImage.alt || ""}
            placeholder={post.mainImage.lqip ? "blur" : "empty"}
            blurDataURL={post.mainImage.lqip || ""}
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover"
          />
        </div>
      </div>
      <article className="px-4 sm:px-8 pt-16">
        <div className="mx-auto max-w-3xl">
        {/* The body can be far taller than the viewport. The default
            `amount: 0.15` reveal threshold can never be met for a very long
            element (15% of its own height never fits on screen at once), so it
            would stay invisible. `amount: "some"` fires as soon as any part
            scrolls into view. */}
        <Reveal viewport={{ once: true, amount: "some" }}>
          <PortableTextRenderer value={post.body} />
        </Reveal>
        </div>
      </article>
    </main>
  );
}
