"use client";
import { useState } from "react";
import Image from "next/image";
import { ExtendedLink as Link } from "../commons/extendlink";
import { Monogram } from "../commons/monogram";
import type { FriendType } from "@/src/lib/blog";

function host(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function Card({ props }: { props: FriendType }) {
  const [hasError, setHasError] = useState(false);
  return (
    <Link
      href={props.url}
      className="group flex h-full items-start gap-4 rounded-3xl border border-mist-300 p-5 transition-colors hover:border-mist-900 hover:bg-mist-100"
    >
      {hasError || !props.avatar ? (
        <Monogram name={props.name} className="rounded-2xl shrink-0" size="default" />
      ) : (
        <Image
          src={props.avatar}
          alt=""
          width={60}
          height={60}
          className="size-15 shrink-0 rounded-2xl object-cover"
          unoptimized
          onError={() => setHasError(true)}
        />
      )}
      <span className="flex min-w-0 flex-col gap-1">
        <span className="text-xl font-semibold leading-tight transition-colors group-hover:text-accent-text">
          {props.name}
        </span>
        <span className="text-sm text-mist-600 truncate">{host(props.url)}</span>
        <span className="pt-1 text-base text-mist-700 text-pretty">{props.desc}</span>
      </span>
    </Link>
  );
}
