import { getT } from "next-i18next/server";
import Image from "next/image";
import { Notes } from "@/src/components/blog/notes";
import { Posts } from "@/src/components/blog/posts";
import { Navbar } from "@/src/components/blog/navbar";
import { Reveal, RevealSection } from "@/src/components/commons/reveal";

type BlogTab = "posts" | "notes";

function normalizeTab(tab: string | string[] | undefined): BlogTab {
  const value = Array.isArray(tab) ? tab[0] : tab;
  if (value === "notes") {
    return value;
  }
  return "posts";
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
    <main className="relative flex flex-col overflow-hidden">
      <section className="relative flex flex-col md:h-[calc(100vh-3.5rem)] overflow-hidden">
        <div className="absolute h-72 w-full md:h-[calc(100vh-3.5rem)]">
          <Image
            src="https://images.unsplash.com/photo-1485322551133-3a4c27a9d925?q=80&w=2400"
            alt="Blog"
            width={2400}
            height={300}
            loading="eager"
            className="select-none pointer-events-none inset-0 h-full w-full object-cover mask-[linear-gradient(to_bottom,black_0%,black_48%,transparent_100%)]"
          />
        </div>
        <Reveal className="mt-auto z-50 px-8 pb-12 pt-4 not-md:pt-72">
          <h1 className="text-5xl">{t("hero.title")}</h1>
          <p>{t("hero.description")}</p>
        </Reveal>
      </section>
      <RevealSection className="flex flex-col gap-y-4 pb-4 border-t border-mist-300">
        <div className="relative overflow-hidden">
          <Navbar activeTab={activeTab} />
        </div>
        <div className="px-8">
          {activeTab === "posts" && <Posts t={t} locale={lang} />}
          {activeTab === "notes" && <Notes t={t} locale={lang} />}
        </div>
      </RevealSection>
    </main>
  );
}
