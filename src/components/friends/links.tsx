"use client";
import { useState } from "react";
import Image from "next/image";
import { ExtendedLink as Link } from "../commons/extendlink";
import { Monogram } from "../commons/monogram";

interface FriendLink {
  name: string;
  url: string;
  desc: string;
  avatar?: string;
}

const LINKS: FriendLink[] = [
  {
    name: "Elvin FC",
    url: "https://elvinfc.vercel.app/",
    desc: "Architecture student",
    avatar: "https://elvinfc.vercel.app/elvinfc.jpg",
  },
  {
    name: "Ferpuwi",
    url: "https://ferpuwi.com/",
    desc: "Full-stack web developer",
    avatar: "https://ferpuwi.com/images/logo.png",
  },
  {
    name: "Adicandra",
    url: "https://adi-portfolio-website-azure.vercel.app/",
    desc: "AI/ML & Full-Stack Engineer",
  },
];

export function Links() {
  const [hasError, setHasError] = useState(false);
  return (
    <div className="px-8 py-4 border-y border-mist-300 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {LINKS.map((link, i) => (
        <Link
          key={i}
          href={link.url}
          className="px-4 py-2 rounded-xl flex items-center gap-x-4 bg-mist-100 h-24 border border-mist-300 transition-colors hover:border-blue-500"
        >
          <div className="flex items-center">
            {hasError || !link.avatar ? (
              <Monogram name={link.name} className="rounded-lg" size="default" />
            ) : (
              <Image
                src={link.avatar}
                alt={link.name}
                width={60}
                height={60}
                className="rounded-lg object-cover aspect-square"
                unoptimized
                onError={() => setHasError(true)}
              />
            )}
          </div>
          <div>
            <p className="font-semibold">{link.name}</p>
            <p className="text-sm">{link.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
