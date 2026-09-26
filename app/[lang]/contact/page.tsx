import { Email } from "@/src/components/contact/email";
import { getDictionary } from "../dictionaries";
import { EmailForm } from "@/src/components/contact/form";
import { Grid } from "@/src/components/contact/grid";
import { RevealSection } from "@/src/components/commons/reveal";

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "zh-CN");

  return (
    <main className="flex flex-col">
      <section className="flex flex-col gap-y-2 border-y border-mist-300 py-10 md:py-20 px-8">
        <h1 className="text-5xl">{dict.contact.header.title}</h1>
        <span>{dict.contact.header.description}</span>
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
