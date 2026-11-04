import { alternates } from "@/src/lib/seo";
import { getT } from "@/src/lib/i18n-server";
import type { Metadata } from "next";
import { PageHeader } from "@/src/components/commons/page-header";

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
    alternates: alternates(lang, "/privacy"),
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
    <main className="flex flex-col pb-16">
      <PageHeader title={t("header.title")} description={t("header.description")}>
        <p className="text-lg font-medium text-mist-700">{t("header.updated")}</p>
      </PageHeader>
      <div className="grid gap-12 md:grid-cols-12 px-4 sm:px-8 py-16 border-t border-mist-300">
        {/* Long policy text: a sticky contents list lets people jump to the part they care about. */}
        <nav aria-labelledby="privacy-contents" className="md:col-span-4 md:sticky md:top-8 self-start">
          <h2 id="privacy-contents" className="pb-4 text-base font-medium text-mist-600">
            {t("contents")}
          </h2>
          <ol className="flex flex-col gap-1 text-base">
            {SECTION_KEYS.map((key, i) => (
              <li key={key}>
                <a
                  href={`#${key}`}
                  className="flex gap-3 py-1.5 text-mist-700 transition-colors hover:text-mist-900"
                >
                  <span className="w-6 shrink-0 tabular-nums text-mist-500">{i + 1}</span>
                  {t(`sections.${key}.title`)}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="md:col-span-8 flex flex-col">
          {SECTION_KEYS.map((key, i) => (
            <section
              key={key}
              id={key}
              className="scroll-mt-8 grid gap-3 sm:grid-cols-[3rem_1fr] py-8 border-b border-mist-300 first:pt-0 last:border-b-0"
            >
              <span className="text-2xl font-semibold tabular-nums text-mist-500" aria-hidden>
                {i + 1}
              </span>
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  {t(`sections.${key}.title`)}
                </h2>
                <p className="text-lg leading-relaxed text-mist-700 max-w-prose">
                  {t(`sections.${key}.body`)}
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
