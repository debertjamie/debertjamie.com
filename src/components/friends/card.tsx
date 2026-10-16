"use client";
import { useState } from "react";
import Image from "next/image";
import { ExtendedLink as Link } from "../commons/extendlink";
import { Monogram } from "../commons/monogram";
import type { FriendType } from "@/src/lib/blog";

export function Card({ props }: { props: FriendType }) {
  const [hasError, setHasError] = useState(false);
  return (
    <Link
      key={props._id}
      href={props.url}
      className="px-4 py-2 rounded-xl flex items-center gap-x-4 bg-mist-100 h-24 border border-mist-300 transition-colors hover:border-blue-500"
    >
      <div className="flex items-center">
        {hasError || !props.avatar ? (
          <Monogram name={props.name} className="rounded-lg" size="default" />
        ) : (
          <Image
            src={props.avatar}
            alt={props.name}
            width={60}
            height={60}
            className="rounded-lg object-cover aspect-square"
            unoptimized
            onError={() => setHasError(true)}
          />
        )}
      </div>
      <div>
        <p className="font-semibold">{props.name}</p>
        <p className="text-sm">{props.desc}</p>
      </div>
    </Link>
  );
}
