import { getT } from "next-i18next/server";
import type { Metadata } from "next";
import { Email } from "@/src/components/contact/email";
import { EmailForm } from "@/src/components/contact/form";
import { Grid } from "@/src/components/contact/grid";
import { RevealSection } from "@/src/components/commons/reveal";

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
    title: t("metadata.title"),
    description: t("metadata.description"),
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      url: `https://debertjamie.com/${lang}/contact`,
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

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  const { t } = await getT("contact", { lng: lang });

  return (
    <main className="flex flex-col">
      <section className="flex flex-col gap-y-2 border-y border-mist-300 py-10 md:py-20 px-8">
        <h1 className="text-5xl">{t("header.title")}</h1>
        <span>{t("header.description")}</span>
      </section>
      <RevealSection>
        <Email />
      </RevealSection>
      <RevealSection className="grid md:grid-cols-2 gap-2 mt-2">
        <EmailForm />
        <Grid />
      </RevealSection>
    </main>
  );
}
