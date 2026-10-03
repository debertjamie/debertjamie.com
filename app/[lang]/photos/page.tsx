import { getT } from "next-i18next/server";
import { desc } from "drizzle-orm";
import { db } from "@/src/lib/db";
import { gallery } from "@/src/lib/db/schema";
import { RevealSection } from "@/src/components/commons/reveal";
import { OpenImage as Image } from "@/src/components/commons/openimage";

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
    <main className="flex flex-col">
      <RevealSection className="px-8 py-4 sm:py-20 flex flex-col gap-y-2">
        <h1 className="text-5xl">{t("header.title")}</h1>
        <p>{t("header.description")}</p>
      </RevealSection>
      <RevealSection className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="break-inside-avoid relative rounded-xl overflow-hidden bg-slate-100 group"
            >
              <Image
                src={img.url}
                alt={img.alt}
                caption={img.alt}
                width={img.width}
                height={img.height}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </RevealSection>
    </main>
  );
}
