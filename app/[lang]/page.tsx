import type { Metadata } from "next";
import { getT } from "@/src/lib/i18n-server";
import { alternates } from "@/src/lib/seo";
import { Hero } from "@/src/components/home/hero";
import { Grid } from "@/src/components/home/grid";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return { alternates: alternates(lang) };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const { t } = await getT("home", { lng: lang });

  return (
    <main className="flex flex-col">
      <Hero />
      <Grid t={t} locale={lang} />
    </main>
  );
}
