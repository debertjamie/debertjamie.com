import { getT } from "next-i18next/server";
import Image from "next/image";
import { NavigationPorts } from "@/src/components/about/links";
import { Experience } from "@/src/components/about/experience";
import { StackImage } from "@/src/components/commons/stackimage";
import { Scrapbook } from "@/src/components/about/scrapbook";
import { Stats } from "@/src/components/about/stats";
import { RevealSection } from "@/src/components/commons/reveal";

export default async function About({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const { t } = await getT("about", { lng: lang });
  return (
    <main className="flex flex-col">
      <RevealSection className="grid px-8 py-4 sm:py-20 md:grid-cols-[55%_45%]">
        <h1 className="tracking-wider flex flex-col pt-5">
          <span className="text-2xl font-semibold">Ta̍k-ke-hó!</span>
          <span className="text-5xl">{t("header.title")}</span>
          <span className="text-2xl">{t("header.description")}</span>
        </h1>
        <div className="relative mx-auto not-md:py-16">
          <Image
            src="/images/debert_5.jpg"
            alt="Me in University of Indonesia"
            width={250}
            height={333}
            quality={100}
            className="rounded-lg border-4 border-mist-200 bg-blue-100 select-none -rotate-6"
          />
          <StackImage
            src="/images/debert_4.jpg"
            alt="Watching the sunrise"
            initialRotation={0}
            initialX={0}
            initialY={0}
            baseZIndex={20}
            width={250}
            height={333}
            loading="eager"
            scale={false}
            className="not-md:translate-y-18 left-0 top-0 rounded-lg rotate-5 hover:rotate-6 duration-300 transition-transform"
          />
          <div className="absolute h-84 w-63 bg-mist-400 rounded-lg top-1 not-md:top-17 -z-10 rotate-2"></div>
        </div>
      </RevealSection>
      <RevealSection>
        <Scrapbook />
      </RevealSection>
      <RevealSection>
        <NavigationPorts />
      </RevealSection>
      <RevealSection>
        <Experience t={t} />
      </RevealSection>
      <RevealSection>
        <Stats t={t} />
      </RevealSection>
    </main>
  );
}
