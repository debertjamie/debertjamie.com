import { alternates } from "@/src/lib/seo";
import { getT } from "@/src/lib/i18n-server";
import type { Metadata } from "next";
import { desc } from "drizzle-orm";
import { db } from "@/src/lib/db";
import { gallery } from "@/src/lib/db/schema";
import { RevealSection } from "@/src/components/commons/reveal";
import { PageHeader } from "@/src/components/commons/page-header";
import { OpenImage as Image } from "@/src/components/commons/openimage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "zh-CN" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { t } = await getT("gallery", { lng: lang });
  const ogImage = new URL(`/${lang}/og`, "https://debertjamie.com");
  ogImage.searchParams.set("title", t("metadata.title"));
  ogImage.searchParams.set("description", t("metadata.description"));

  return {
    alternates: alternates(lang, "/photos"),
    title: t("metadata.title"),
    description: t("metadata.description"),
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      url: `https://debertjamie.com/${lang}/photos`,
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

export default async function Gallery({
  params,
}: PageProps<"/[lang]/photos">) {
  const { lang } = await params;
  const { t } = await getT("gallery", { lng: lang });
  const images = await db
    .select()
    .from(gallery)
    .orderBy(desc(gallery.createdAt));

  return (
    <main className="flex flex-col pb-16">
      <PageHeader title={t("header.title")} description={t("header.description")} />
      <RevealSection className="px-4 sm:px-8 pt-12 border-t border-mist-300">
        {images.length === 0 ? (
          <p className="py-16 text-xl text-mist-600">{t("empty")}</p>
        ) : (
          // Masonry keeps every photo at its own aspect ratio: no cropping.
          <ul className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3">
            {images.map((img, i) => (
              <li key={img.id} className="mb-3 break-inside-avoid">
                <figure className="group flex flex-col gap-2">
                  <div className="overflow-hidden rounded-2xl bg-mist-200">
                    <Image
                      src={img.url}
                      alt={img.alt}
                      caption={img.alt}
                      width={img.width}
                      height={img.height}
                      unoptimized
                      loading={i < 4 ? "eager" : undefined}
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="px-1 text-sm text-mist-600 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                    {img.alt}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}
      </RevealSection>
    </main>
  );
}
