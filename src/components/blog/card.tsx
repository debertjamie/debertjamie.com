"use client";
import { useState } from "react";
import Image from "next/image";
import type { PostType } from "@/src/lib/blog";
import { ExtendedLink as Link } from "../commons/extendlink";
import { formatDate, readTime, toPlainText } from "@/src/lib/blog";

function Meta({ post, locale }: { post: PostType; locale: string }) {
  return (
    <p className="flex flex-wrap gap-x-3 gap-y-1 text-base text-mist-600">
      <span className="tabular-nums">{formatDate(post.date || post._createdAt, locale)}</span>
      <span aria-hidden>·</span>
      <span>{readTime(toPlainText(post.body))}</span>
      {post.tags?.map((tag) => (
        <span key={tag.slug}>#{tag.tag}</span>
      ))}
    </p>
  );
}

// The newest post gets the cover image and a big title.
export function FeaturedCard({ post, locale }: { post: PostType; locale: string }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid gap-8 md:grid-cols-12 md:items-center px-4 sm:px-8 py-12 border-b border-mist-300"
    >
      <div className="md:col-span-7 relative aspect-video overflow-hidden rounded-3xl bg-mist-200">
        <Image
          src={post.mainImage.image}
          alt={post.mainImage.alt || ""}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          placeholder="blur"
          blurDataURL={post.mainImage.lqip}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="md:col-span-5 flex flex-col gap-4">
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight text-balance transition-colors group-hover:text-accent-text">
          {post.title}
        </h2>
        <p className="text-lg text-mist-700 text-pretty">{post.description}</p>
        <Meta post={post} locale={locale} />
      </div>
    </Link>
  );
}

// Older posts are text rows. On desktop, the cover follows the cursor so the
// list stays scannable without a wall of thumbnails.
export function Card({ post, locale }: { post: PostType; locale: string }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const bubbleWidth = 240;
  const bubbleHeight = 200;
  const bubbleOffset = 18;

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    // Clamp so the preview never spills past the viewport edges.
    const x = Math.min(e.clientX + bubbleOffset, window.innerWidth - bubbleWidth - bubbleOffset);
    const y = Math.min(e.clientY + bubbleOffset, window.innerHeight - bubbleHeight - bubbleOffset);
    setMousePos({ x: Math.max(bubbleOffset, x), y: Math.max(bubbleOffset, y) });
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid gap-3 md:grid-cols-12 px-4 sm:px-8 py-8 border-b border-mist-300 transition-colors hover:bg-mist-100"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <h3 className="md:col-span-7 text-2xl sm:text-3xl font-semibold tracking-tight text-pretty transition-colors group-hover:text-accent-text">
        {post.title}
      </h3>
      <div className="md:col-span-5 flex flex-col gap-2">
        <p className="text-base text-mist-700 text-pretty">{post.description}</p>
        <Meta post={post} locale={locale} />
      </div>
      <div
        aria-hidden
        className="fixed pointer-events-none top-0 left-0 z-50 hidden w-60 overflow-hidden rounded-2xl border border-mist-300 bg-mist-100 shadow-xl md:block"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          opacity: hovered ? 1 : 0,
          visibility: hovered ? "visible" : "hidden",
          transition: "opacity 150ms ease-out",
        }}
      >
        <div className="relative aspect-video">
          <Image
            src={post.mainImage.image}
            alt=""
            fill
            sizes="240px"
            placeholder="blur"
            blurDataURL={post.mainImage.lqip}
            className="object-cover"
          />
        </div>
      </div>
    </Link>
  );
}
