import { getT } from "@/src/lib/i18n-server";
import type { Metadata } from "next";
import { RevealSection } from "@/src/components/commons/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "zh-CN" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { t } = await getT("privacy", { lng: lang });
  const ogImage = new URL(`/${lang}/og`, "https://debertjamie.com");
  ogImage.searchParams.set("title", t("metadata.title"));
  ogImage.searchParams.set("description", t("metadata.description"));

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      url: `https://debertjamie.com/${lang}/privacy`,
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

const SECTION_KEYS = [
  "owner",
  "counter",
  "session",
  "ip",
  "analytics",
  "cookies",
  "form",
  "thirdparties",
  "noads",
  "yourrights",
  "questions",
] as const;

export default async function Privacy({
  params,
}: {
  params: Promise<{ lang: "en" | "zh-CN" }>;
}) {
  const { lang } = await params;
  const { t } = await getT("privacy", { lng: lang });

  return (
    <main className="flex flex-col">
      <section className="flex flex-col gap-y-2 border-b border-mist-300 py-10 md:py-20 px-8">
        <h1 className="text-5xl">{t("header.title")}</h1>
        <span>{t("header.updated")}</span>
        <span>{t("header.description")}</span>
      </section>
      <RevealSection className="flex flex-col gap-y-6 px-8 py-8 max-w-2xl">
        {SECTION_KEYS.map((key) => (
          <div key={key} className="space-y-1">
            <h2 className="text-xl font-semibold">
              {t(`sections.${key}.title`)}
            </h2>
            <p className="leading-relaxed">{t(`sections.${key}.body`)}</p>
          </div>
        ))}
      </RevealSection>
    </main>
  );
}
