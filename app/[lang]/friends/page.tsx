import { Links } from "@/src/components/friends/links";
import { getDictionary } from "../dictionaries";
import { Info } from "@/src/components/friends/info";
import { RevealSection } from "@/src/components/commons/reveal";

export default async function Friends({ params }: PageProps<"/[lang]/friends">) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "zh-CN");

  return (
    <main className="flex flex-col">
      <RevealSection className="px-8 py-4 sm:py-20 flex flex-col gap-y-2">
        <h1 className="text-5xl">{dict.friends.header.title}</h1>
        <p>{dict.friends.header.description}</p>
      </RevealSection>
      <RevealSection>
        <Links />
      </RevealSection>
      <RevealSection>
        <Info />
      </RevealSection>
    </main>
  );
}
