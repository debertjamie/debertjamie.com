import { friendsQuery } from "@/src/lib/sanity/query";
import { sanityFetch } from "@/src/lib/sanity/client";
import type { FriendType } from "@/src/lib/blog";
import { Card } from "./card";

export async function Links() {
  const links: FriendType[] = await sanityFetch({
    query: friendsQuery,
    tags: ["friends"],
  });

  return (
    <div className="px-8 py-4 border-y border-mist-300 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {links.map((link) => (
        <Card props={link} key={link._id} />
      ))}
    </div>
  );
}
