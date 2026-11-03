import { getT } from "@/src/lib/i18n-server";
import { Hero } from "@/src/components/home/hero";
import { Grid } from "@/src/components/home/grid";
import { RevealSection } from "@/src/components/commons/reveal";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const { t } = await getT("home", { lng: lang });

  return (
    <main className="flex flex-col px-4 sm:px-8">
      <RevealSection>
        <Hero />
      </RevealSection>
      <RevealSection>
        <Grid t={t} locale={lang} />
      </RevealSection>
    </main>
  );
}
