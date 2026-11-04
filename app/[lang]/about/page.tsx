import { alternates } from "@/src/lib/seo";
import { getT } from "@/src/lib/i18n-server";
import type { Metadata } from "next";
import { Intro } from "@/src/components/about/intro";
import { Experience } from "@/src/components/about/experience";
import { Scrapbook } from "@/src/components/about/scrapbook";
import { Stats } from "@/src/components/about/stats";
import { Reveal } from "@/src/components/commons/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "zh-CN" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { t } = await getT("about", { lng: lang });
  const ogImage = new URL(`/${lang}/og`, "https://debertjamie.com");
  ogImage.searchParams.set("title", t("metadata.title"));
  ogImage.searchParams.set("description", t("metadata.description"));

  return {
    alternates: alternates(lang, "/about"),
    title: t("metadata.title"),
    description: t("metadata.description"),
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      url: `https://debertjamie.com/${lang}/about`,
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

export default async function About({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const { t } = await getT("about", { lng: lang });
  return (
    <main className="flex flex-col">
      <Intro t={t} />
      <Reveal>
        <Scrapbook />
      </Reveal>
      <Reveal>
        <Experience t={t} />
      </Reveal>
      <Reveal>
        <Stats t={t} lang={lang} />
      </Reveal>
    </main>
  );
}
