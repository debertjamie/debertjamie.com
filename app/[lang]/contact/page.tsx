import { alternates } from "@/src/lib/seo";
import { getT } from "@/src/lib/i18n-server";
import type { Metadata } from "next";
import { Email } from "@/src/components/contact/email";
import { EmailForm } from "@/src/components/contact/form";
import { Grid } from "@/src/components/contact/grid";
import { Reveal } from "@/src/components/commons/reveal";
import { PageHeader } from "@/src/components/commons/page-header";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "zh-CN" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { t } = await getT("contact", { lng: lang });
  const ogImage = new URL(`/${lang}/og`, "https://debertjamie.com");
  ogImage.searchParams.set("title", t("metadata.title"));
  ogImage.searchParams.set("description", t("metadata.description"));

  return {
    alternates: alternates(lang, "/contact"),
    title: t("metadata.title"),
    description: t("metadata.description"),
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      url: `https://debertjamie.com/${lang}/contact`,
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

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  const { t } = await getT("contact", { lng: lang });

  return (
    <main className="flex flex-col pb-16">
      <PageHeader title={t("header.title")} description={t("header.description")} />
      <Email />
      <Reveal className="grid gap-16 md:grid-cols-12 px-4 sm:px-8 py-16 md:py-24">
        <div className="md:col-span-7">
          <EmailForm />
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <Grid title={t("elsewhere.title")} wechatHandle={t("elsewhere.wechat")} />
        </div>
      </Reveal>
    </main>
  );
}
