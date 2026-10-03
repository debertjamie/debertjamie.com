import { getT } from "next-i18next/server";
import { Email } from "@/src/components/contact/email";
import { EmailForm } from "@/src/components/contact/form";
import { Grid } from "@/src/components/contact/grid";
import { RevealSection } from "@/src/components/commons/reveal";

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  const { t } = await getT("contact", { lng: lang });

  return (
    <main className="flex flex-col">
      <section className="flex flex-col gap-y-2 border-y border-mist-300 py-10 md:py-20 px-8">
        <h1 className="text-5xl">{t("header.title")}</h1>
        <span>{t("header.description")}</span>
      </section>
      <RevealSection>
        <Email />
      </RevealSection>
      <RevealSection className="grid md:grid-cols-2 gap-2 mt-2">
        <EmailForm />
        <Grid />
      </RevealSection>
    </main>
  );
}
