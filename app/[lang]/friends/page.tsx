import { alternates } from "@/src/lib/seo";
import { getT } from "@/src/lib/i18n-server";
import type { Metadata } from "next";
import { Links } from "@/src/components/friends/links";
import { Info } from "@/src/components/friends/info";
import { Reveal } from "@/src/components/commons/reveal";
import { PageHeader } from "@/src/components/commons/page-header";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "zh-CN" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { t } = await getT("friends", { lng: lang });
  const ogImage = new URL(`/${lang}/og`, "https://debertjamie.com");
  ogImage.searchParams.set("title", t("metadata.title"));
  ogImage.searchParams.set("description", t("metadata.description"));

  return {
    alternates: alternates(lang, "/friends"),
    title: t("metadata.title"),
    description: t("metadata.description"),
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      url: `https://debertjamie.com/${lang}/friends`,
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

export default async function Friends({ params }: PageProps<"/[lang]/friends">) {
  const { lang } = await params;
  const { t } = await getT("friends", { lng: lang });

  return (
    <main className="flex flex-col">
      <PageHeader title={t("header.title")} description={t("header.description")} />
      <Reveal>
        <Links empty={t("empty")} />
      </Reveal>
      <Reveal>
        <Info />
      </Reveal>
    </main>
  );
}
