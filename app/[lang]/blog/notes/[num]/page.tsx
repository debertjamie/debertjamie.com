import { Metadata } from "next";
import { notFound } from "next/navigation";
import { singleNoteQuery } from "@/src/lib/sanity/query";
import { sanityFetch } from "@/src/lib/sanity/client";
import { formatDate, type NoteType } from "@/src/lib/blog";
import { series } from "@/src/components/blog/notes";
import { PortableTextRenderer } from "@/src/components/sanity/portableText";
import { Calendar } from "lucide-react";
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
    title: note.title,
    description: "A short note about " + note.title,
    keywords: [note.series],
    openGraph: {
      title: note.title,
      description: "A short note about " + note.title,
      url: `https://debertjamie.com/${lang}/blog/notes/${note.slug}`,
      authors: "Debert Jamie",
      tags: [note.series],
      publishedTime: note._createdAt,
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
    <main className="relative flex flex-col overflow-hidden">
      <section className="px-8 py-4 sm:py-20">
        <h1 className="text-5xl">{note.title}</h1>
        <div className="hidden md:block absolute pointer-events-none select-none right-0 top-1">
          <span className="text-6xl text-mist-800/10 -z-10">
            {series[note.series as keyof typeof series] || note.series}
          </span>
        </div>
        <div className="flex text-base items-center">
          <Calendar className="w-4 h-4" />
          <span className="ml-2">{formatDate(note._createdAt, lang)}</span>
        </div>
      </section>
      <article className="px-8 py-4 border-t border-mist-300">
        <Reveal>
          <PortableTextRenderer value={note.content} />
        </Reveal>
      </article>
    </main>
  );
}
