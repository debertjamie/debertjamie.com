"use client";
import { useState } from "react";
import Image from "next/image";
import { ExtendedLink as Link } from "../commons/extendlink";

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
    name: "Garjita Adicandra",
    url: "https://adi-portfolio-website-azure.vercel.app/",
    desc: "AI/ML & Full-Stack Engineer",
  },
];

export function Links() {
  const [hasError, setHasError] = useState(false);

  function getInitials(str: string = "") {
    return str
      .trim()
      .split(" ")
      .map((word) => word[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  function getBgColor(str: string = "") {
    const colors = [
      "bg-red-500",
      "bg-green-500",
      "bg-amber-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }

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
              <div
                className={`flex items-center justify-center w-15 h-15 rounded-lg text-white font-semibold text-lg ${getBgColor(
                  link.name,
                )}`}
              >
                {getInitials(link.name)}
              </div>
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
