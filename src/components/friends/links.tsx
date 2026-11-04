import { friendsQuery } from "@/src/lib/sanity/query";
import { sanityFetch } from "@/src/lib/sanity/client";
import type { FriendType } from "@/src/lib/blog";
import { Card } from "./card";

export async function Links({ empty }: { empty: string }) {
  const links: FriendType[] = await sanityFetch({
    query: friendsQuery,
    tags: ["friends"],
  });

  if (links.length === 0) {
    return <p className="px-4 sm:px-8 py-16 text-xl text-mist-600">{empty}</p>;
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-8 py-12 border-t border-mist-300">
      {links.map((link) => (
        <li key={link._id}>
          <Card props={link} />
        </li>
      ))}
    </ul>
  );
}
