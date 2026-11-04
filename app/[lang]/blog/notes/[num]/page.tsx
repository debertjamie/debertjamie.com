import { alternates } from "@/src/lib/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { singleNoteQuery } from "@/src/lib/sanity/query";
import { sanityFetch } from "@/src/lib/sanity/client";
import { formatDate, type NoteType } from "@/src/lib/blog";
import { series } from "@/src/components/blog/notes";
import { PortableTextRenderer } from "@/src/components/sanity/portableText";
import { Reveal } from "@/src/components/commons/reveal";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog/notes/[num]">): Promise<Metadata> {
  const { lang, num } = await params;
  const slug = Number(num);

  const note: NoteType = await sanityFetch({
    query: singleNoteQuery,
    qParams: { slug },
    tags: ["notes"],
  });

  if (!note) {
    notFound();
  }

  return {
    alternates: alternates(lang, `/blog/notes/${num}`),
    title: note.title,
    description: "A short note about " + note.title,
    keywords: [note.series],
    openGraph: {
      title: note.title,
      description: "A short note about " + note.title,
      url: `https://debertjamie.com/${lang}/blog/notes/${note.slug}`,
      authors: "Debert Jamie",
      tags: [note.series],
      publishedTime: note.date || note._createdAt,
      modifiedTime: note._updatedAt || "",
      locale: note.locale,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description: "A short note about " + note.title,
      creator: "@debertjamie",
      site: "@debertjamie",
    },
  };
}

export default async function NotePage({
  params,
}: PageProps<"/[lang]/blog/notes/[num]">) {
  const { lang, num } = await params;
  const slug = Number(num);

  const note: NoteType = await sanityFetch({
    query: singleNoteQuery,
    qParams: { slug },
    tags: ["notes"],
  });

  if (!note) {
    notFound();
  }

  return (
    <main className="flex flex-col pb-24">
      <header className="flex flex-col gap-5 px-4 sm:px-8 pt-16 pb-12 md:pt-24 max-w-5xl">
        <p className="text-base font-medium text-mist-600">
          {series[note.series as keyof typeof series] || note.series}
        </p>
        <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-tighter leading-[1.02] text-balance">
          {note.title}
        </h1>
        <time dateTime={note.date || note._createdAt} className="text-base text-mist-600">
          {formatDate(note.date || note._createdAt, lang)}
        </time>
      </header>
      <article className="px-4 sm:px-8 pt-12 border-t border-mist-300">
        <div className="mx-auto max-w-3xl">
        {/* `amount: "some"` so a body taller than the viewport still reveals;
            the default 0.15 threshold can never be met for very long content. */}
        <Reveal viewport={{ once: true, amount: "some" }}>
          <PortableTextRenderer value={note.content} />
        </Reveal>
        </div>
      </article>
    </main>
  );
}
