import Image from "next/image";
import { getDictionary } from "../dictionaries";
import { Bento } from "@/src/components/projects/bento";
import { Reveal, RevealSection } from "@/src/components/commons/reveal";

export default async function Now({ params }: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "zh-CN");

  return (
    <main className="flex flex-col">
      <section className="relative flex flex-col md:h-[calc(100vh-3.5rem)] overflow-hidden">
        <div className="absolute h-72 w-full md:h-[calc(100vh-3.5rem)]">
          <Image
            src="https://images.unsplash.com/photo-1527219525722-f9767a7f2884?q=80&w=2400"
            alt="Projects"
            width={2400}
            height={300}
            loading="eager"
            className="select-none pointer-events-none inset-0 h-full w-full object-cover mask-[linear-gradient(to_bottom,black_0%,black_48%,transparent_100%)]"
          />
        </div>
        <Reveal className="mt-auto z-50 px-8 pb-12 pt-4 not-md:pt-72">
          <h1 className="text-5xl">{dict.projects.header.title}</h1>
          <p>{dict.projects.header.description}</p>
        </Reveal>
      </section>
      <RevealSection className="flex flex-col gap-y-4 px-8 py-4 border-t border-mist-300">
        <Bento dict={dict} />
      </RevealSection>
    </main>
  );
}
