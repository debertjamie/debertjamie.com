import { getT } from "next-i18next/server";
import { Links } from "@/src/components/friends/links";
import { Info } from "@/src/components/friends/info";
import { RevealSection } from "@/src/components/commons/reveal";

export default async function Friends({ params }: PageProps<"/[lang]/friends">) {
  const { lang } = await params;
  const { t } = await getT("friends", { lng: lang });

  return (
    <main className="flex flex-col">
      <RevealSection className="px-8 py-4 sm:py-20 flex flex-col gap-y-2">
        <h1 className="text-5xl">{t("header.title")}</h1>
        <p>{t("header.description")}</p>
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
