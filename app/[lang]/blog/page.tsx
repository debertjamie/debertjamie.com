import { alternates } from "@/src/lib/seo";
import { getT } from "@/src/lib/i18n-server";
import type { Metadata } from "next";
import { Notes } from "@/src/components/blog/notes";
import { Posts } from "@/src/components/blog/posts";
import { Navbar } from "@/src/components/blog/navbar";
import { PageHeader } from "@/src/components/commons/page-header";

type BlogTab = "posts" | "notes";

function normalizeTab(tab: string | string[] | undefined): BlogTab {
  const value = Array.isArray(tab) ? tab[0] : tab;
  if (value === "notes") {
    return value;
  }
  return "posts";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "zh-CN" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { t } = await getT("blog", { lng: lang });
  const ogImage = new URL(`/${lang}/og`, "https://debertjamie.com");
  ogImage.searchParams.set("title", t("metadata.title"));
  ogImage.searchParams.set("description", t("metadata.description"));

  return {
    alternates: alternates(lang, "/blog"),
    title: t("metadata.title"),
    description: t("metadata.description"),
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      url: `https://debertjamie.com/${lang}/blog`,
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

export default async function Blog({
  params,
  searchParams,
}: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  const { t } = await getT("blog", { lng: lang });
  const activeTab = normalizeTab(
    searchParams ? (await searchParams).tab : undefined,
  );

  return (
    <main className="flex flex-col pb-16">
      <PageHeader title={t("hero.title")} description={t("hero.description")} />
      {/* Not wrapped in a reveal: a transformed parent would break the sticky tabs. */}
      <div className="flex flex-col">
        <Navbar activeTab={activeTab} />
        {activeTab === "posts" && <Posts t={t} locale={lang} />}
        {activeTab === "notes" && <Notes t={t} locale={lang} />}
      </div>
    </main>
  );
}
