import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, User } from "lucide-react";
import { singlePostQuery } from "@/src/lib/sanity/lib/query";
import { sanityFetch } from "@/src/lib/sanity/lib/client";
import { urlFor } from "@/src/lib/sanity/lib/image";
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

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.map((t) => t.tag),
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://debertjamie.com/${lang}/blog/${post.slug}`,
      authors: post.author.name,
      tags: post.tags.map((t) => t.tag),
      publishedTime: post._createdAt,
      modifiedTime: post._updatedAt || "",
      images: urlFor(post.mainImage.image).width(1200).height(630).url(),
      locale: post.locale,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: urlFor(post.mainImage.image).width(1200).height(630).url(),
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
    <main className="relative flex flex-col overflow-hidden">
      <section className="relative flex flex-col md:h-[calc(100vh-3.5rem)] overflow-hidden">
        <div className="absolute h-72 w-full md:h-[calc(100vh-3.5rem)]">
          <Image
            src={post.mainImage.image}
            alt={post.mainImage.alt || post.title}
            placeholder={post.mainImage.lqip ? "blur" : "empty"}
            blurDataURL={post.mainImage.lqip || ""}
            width={2400}
            height={300}
            loading="eager"
            className="select-none pointer-events-none inset-0 h-full w-full object-bottom object-cover mask-[linear-gradient(to_bottom,black_0%,black_48%,transparent_100%)]"
          />
        </div>
        <Reveal className="mt-auto z-50 px-8 pb-12 pt-4 not-md:pt-72">
          <h1 className="text-5xl">{post.title}</h1>
          <div className="flex gap-x-2 md:gap-x-8 text-base">
            <span className="flex items-center gap-x-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post._createdAt, lang)}
            </span>
            <span className="flex items-center gap-x-1">
              <Clock className="w-4 h-4" />
              {readTime(toPlainText(post.body))}
            </span>
            <span className="flex items-center gap-x-1">
              <User className="w-4 h-4" />
              {post.author.name}
            </span>
          </div>
        </Reveal>
      </section>
      <article className="px-8 py-4 border-t border-mist-300">
        <Reveal>
          <PortableTextRenderer value={post.body} />
        </Reveal>
      </article>
    </main>
  );
}
