import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/src/lib/db";
import { shortcut } from "@/src/lib/db/schema";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ shortcut: string }> },
) {
  // Read from the route param, not the raw URL, so "?ref=x" does not break lookup.
  const { shortcut: text } = await params;
  if (!text) return notFound();

  const link = await db
    .select({ url: shortcut.url })
    .from(shortcut)
    .where(eq(shortcut.shortcut, text))
    .execute();
  if (!link[0]) return notFound();

  // 307, not 301: browsers cache 301s indefinitely, which would pin visitors
  // to an old target after the shortcut is edited.
  return Response.redirect(link[0].url, 307);
}
