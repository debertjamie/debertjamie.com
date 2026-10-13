"use client";

import { useState } from "react";
import Image from "next/image";
import type { PostType } from "@/src/lib/blog";
import { ExtendedLink as Link } from "../commons/extendlink";
import { formatDate, readTime, toPlainText } from "@/src/lib/blog";

export function Card({ post, locale }: { post: PostType; locale: string }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const bubbleWidth = 240;
  const bubbleHeight = 320;
  const bubbleOffset = 18;

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    // Clamp so the bubble never spills past the viewport edges.
    const x = Math.min(
      e.clientX + bubbleOffset,
      window.innerWidth - bubbleWidth - bubbleOffset,
    );
    const y = Math.min(
      e.clientY + bubbleOffset,
      window.innerHeight - bubbleHeight - bubbleOffset,
    );

    setMousePos({ x: Math.max(bubbleOffset, x), y: Math.max(bubbleOffset, y) });
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group/card grid"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <div className="space-y-2">
        <h3 className="peer text-xl font-bold group-hover/card:underline">
          {post.title}
        </h3>
        <p>{post.description}</p>
        <div className="flex gap-x-2 text-base">
          <span>{formatDate(post.date || post._createdAt, locale)}</span>
          <span className="before:content-['·'] before:font-extrabold before:text-xl before:leading-0 before:mr-2">
            {readTime(toPlainText(post.body))}
          </span>
        </div>
        <div className="text-base flex gap-x-2">
          {post.tags
            ? post.tags.map((t, i) => <span key={i}>#{t.tag}</span>)
            : null}
        </div>
      </div>
      <div
        className="fixed pointer-events-none top-0 left-0 z-50 hidden w-60 overflow-hidden rounded-2xl border border-yellow-300 bg-yellow-100 p-2 shadow-xl md:block"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          opacity: hovered ? 1 : 0,
          visibility: hovered ? "visible" : "hidden",
          transition: "opacity 150ms ease-out",
        }}
      >
        <Image
          src={post.mainImage.image}
          alt={post.mainImage.alt || ""}
          width={640}
          height={480}
          className="rounded-lg object-cover aspect-auto"
          placeholder="blur"
          blurDataURL={post.mainImage.lqip}
        />
        <p className="text-sm font-semibold mt-2 text-center">{post.title}</p>
      </div>
    </Link>
  );
}
