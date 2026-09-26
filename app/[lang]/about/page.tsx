import Image from "next/image";
import { getDictionary } from "../dictionaries";
import { NavigationPorts } from "@/src/components/about/links";
import { Scrapbook } from "@/src/components/about/scrapbook";
import { Stats } from "@/src/components/about/stats";
import { RevealSection } from "@/src/components/commons/reveal";

export default async function About({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "zh-CN");
  return (
    <main className="flex flex-col">
      <RevealSection className="grid px-8 py-4 sm:py-20 md:grid-cols-[55%_45%]">
        <h1 className="tracking-wider flex flex-col pt-5">
          <span className="text-2xl font-semibold">Ta̍k-ke-hó!</span>
          <span className="text-5xl">{dict.about.intro.header}</span>
          <span className="text-2xl">{dict.about.intro.description}</span>
        </h1>
        <div className="relative mx-auto not-md:pt-16">
          <Image
            src="/images/debert_4.jpg"
            alt="Debert Jamie"
            width={250}
            height={333}
            loading="eager"
            quality={100}
            className="rounded-lg border-4 border-mist-200 bg-blue-100 select-none rotate-5 hover:rotate-6 duration-300 transition-transform"
          />
          <div className="absolute h-84 w-63 bg-mist-400 rounded-lg top-1 not-md:top-17 -z-10 -rotate-2"></div>
        </div>
      </RevealSection>
      <RevealSection>
        <Scrapbook />
      </RevealSection>
      <RevealSection>
        <NavigationPorts />
      </RevealSection>
      <RevealSection>
        <Stats dict={dict} />
      </RevealSection>
    </main>
  );
}
