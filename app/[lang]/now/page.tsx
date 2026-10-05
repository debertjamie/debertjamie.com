import { getT } from "next-i18next/server";
import type { Metadata } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { ComponentProps } from "react";
import { nowQuery } from "@/src/lib/sanity/lib/query";
import { sanityFetch } from "@/src/lib/sanity/lib/client";
import { PortableTextRenderer } from "@/src/components/sanity/portableText";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "zh-CN" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { t } = await getT("now", { lng: lang });
  const ogImage = new URL(`/${lang}/og`, "https://debertjamie.com");
  ogImage.searchParams.set("title", t("metadata.title"));
  ogImage.searchParams.set("description", t("metadata.description"));

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      url: `https://debertjamie.com/${lang}/now`,
      locale: lang,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: t("metadata.title"),
        },
      ],
    },
    twitter: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      images: [ogImage],
    },
  };
}

export default async function Now({ params }: PageProps<"/[lang]/now">) {
  const { lang } = await params;
  const { t } = await getT("now", { lng: lang });
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
        <Reveal className="mt-auto z-10 px-8 pb-12 pt-4 not-md:pt-72">
          <h1 className="text-5xl">{t("hero.title")}</h1>
          <p>{t("hero.description")}</p>
        </Reveal>
      </section>
      <RevealSection className="flex flex-col gap-y-4 px-8 py-4 border-t border-mist-300">
        <div>
          <PortableTextRenderer value={nowData.content} />
        </div>
        <p className="text-base font-semibold text-steel-grey/80 dark:text-porcelain/80">
          {t("lastUpdated", { date: formatDate(nowData._updatedAt, lang) })}
        </p>
      </RevealSection>
    </main>
  );
}
