import { getT } from "next-i18next/server";
import type { Metadata } from "next";
import { Chat } from "@/src/components/guestbook/chat";
import { RevealSection } from "@/src/components/commons/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "zh-CN" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { t } = await getT("guestbook", { lng: lang });
  const ogImage = new URL(`/${lang}/og`, "https://debertjamie.com");
  ogImage.searchParams.set("title", t("metadata.title"));
  ogImage.searchParams.set("description", t("metadata.description"));

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      url: `https://debertjamie.com/${lang}/guestbook`,
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

export default async function Guestbook({
  params,
}: PageProps<"/[lang]/friends">) {
  const { lang } = await params;
  const { t } = await getT("guestbook", { lng: lang });
  return (
    <main className="flex flex-col">
      <RevealSection className="px-8 py-4 sm:py-20 flex flex-col gap-y-2">
        <h1 className="text-5xl">{t("header.title")}</h1>
        <p>{t("header.description")}</p>
      </RevealSection>
      <RevealSection className="relative border-t border-mist-300 w-screen md:w-[calc(100vw-2*clamp(2rem,2vw+1rem,10rem))] overflow-hidden bg-mist-50 bg-[radial-gradient(#d0d6d8_1px,transparent_1px)] bg-size-[20px_20px]">
        <Chat lang={lang} t={t} />
      </RevealSection>
    </main>
  );
}
