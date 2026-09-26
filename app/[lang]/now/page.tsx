import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { ComponentProps } from "react";
import { nowQuery } from "@/src/lib/sanity/lib/query";
import { sanityFetch } from "@/src/lib/sanity/lib/client";
import { PortableTextRenderer } from "@/src/components/sanity/portableText";
import { getDictionary } from "../dictionaries";
import { Reveal, RevealSection } from "@/src/components/commons/reveal";

type NowData = {
  _updatedAt: string;
  content: ComponentProps<typeof PortableText>["value"];
};

function formatDate(date: string, locale: string = "en-GB") {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  return new Date(date).toLocaleDateString(locale, options);
}

export default async function Now({ params }: PageProps<"/[lang]/now">) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "zh-CN");
  const nowData: NowData = await sanityFetch({
    query: nowQuery,
    tags: ["now"],
  });

  return (
    <main className="flex flex-col">
      <section className="relative flex flex-col md:h-[calc(100vh-3.5rem)] overflow-hidden">
        <div className="absolute h-72 w-full md:h-[calc(100vh-3.5rem)]">
          <Image
            src="https://images.unsplash.com/photo-1462642109801-4ac2971a3a51?q=80&w=2400"
            alt="Now"
            width={2400}
            height={300}
            loading="eager"
            className="select-none pointer-events-none inset-0 h-full w-full object-cover mask-[linear-gradient(to_bottom,black_0%,black_48%,transparent_100%)]"
          />
        </div>
        <Reveal className="mt-auto z-50 px-8 pb-12 pt-4 not-md:pt-72">
          <h1 className="text-5xl">{dict.now.header.title}</h1>
          <p>{dict.now.header.description}</p>
        </Reveal>
      </section>
      <RevealSection className="flex flex-col gap-y-4 px-8 py-4 border-t border-mist-300">
        <div>
          <PortableTextRenderer value={nowData.content} />
        </div>
        <p className="text-base text-steel-grey/80 dark:text-porcelain/80">
          {dict.now.lastUpdated}:{" "}
          <span className="font-semibold">
            {formatDate(nowData._updatedAt, lang)}
          </span>
        </p>
      </RevealSection>
    </main>
  );
}
