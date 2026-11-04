import { alternates } from "@/src/lib/seo";
import { getT } from "@/src/lib/i18n-server";
import type { Metadata } from "next";
import { ProjectList } from "@/src/components/projects/list";
import { PageHeader } from "@/src/components/commons/page-header";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "zh-CN" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { t } = await getT("projects", { lng: lang });
  const ogImage = new URL(`/${lang}/og`, "https://debertjamie.com");
  ogImage.searchParams.set("title", t("metadata.title"));
  ogImage.searchParams.set("description", t("metadata.description"));

  return {
    alternates: alternates(lang, "/projects"),
    title: t("metadata.title"),
    description: t("metadata.description"),
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      url: `https://debertjamie.com/${lang}/projects`,
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

export default async function Projects({ params }: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  const { t } = await getT("projects", { lng: lang });

  return (
    <main className="flex flex-col pb-16">
      <PageHeader title={t("hero.title")} description={t("hero.description")} />
      <ProjectList t={t} />
    </main>
  );
}
