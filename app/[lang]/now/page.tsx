import { alternates } from "@/src/lib/seo";
import { getT } from "@/src/lib/i18n-server";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import type { ComponentProps } from "react";
import { nowQuery } from "@/src/lib/sanity/query";
import { sanityFetch } from "@/src/lib/sanity/client";
import { PortableTextRenderer } from "@/src/components/sanity/portableText";
import { PageHeader } from "@/src/components/commons/page-header";

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
    alternates: alternates(lang, "/now"),
    title: t("metadata.title"),
    description: t("metadata.description"),
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      url: `https://debertjamie.com/${lang}/now`,
      locale: lang,
      images: [
        {
          url: ogImage.toString(),
          width: 1200,
          height: 630,
          alt: t("metadata.title"),
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      images: [
        {
          url: ogImage.toString(),
          width: 1200,
          height: 630,
          alt: t("metadata.title"),
          type: "image/png",
        },
      ],
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
    <main className="flex flex-col pb-16">
      <PageHeader title={t("hero.title")} description={t("hero.description")}>
        {/* A now page is only useful if it is fresh, so the date sits up top. */}
        <p className="flex items-center gap-2 text-lg font-medium text-mist-700">
          <span className="size-2.5 rounded-full bg-accent-mark" aria-hidden />
          {t("lastUpdated", { date: formatDate(nowData._updatedAt, lang) })}
        </p>
      </PageHeader>
      <section className="px-4 sm:px-8 py-16 border-t border-mist-300">
        <div className="max-w-3xl md:ml-[calc(100%/12*4)]">
          <PortableTextRenderer value={nowData.content} />
        </div>
      </section>
    </main>
  );
}
