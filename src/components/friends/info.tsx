"use client";
import { useT } from "next-i18next/client";
import { CodeBlock } from "../commons/codeblock";
import { ExtendedLink as Link } from "../commons/extendlink";

// How to swap links: the rules and the issue link on the left, the details
// to copy on the right.
export function Info() {
  const { t } = useT("friends");
  const code = {
    language: "yaml",
    filename: t("info.self.title"),
    code: "name: Debert\nlink: https://debertjamie.com/\ndesc: Great oaks from little acorns grow.\navatar: https://debertjamie.com/avatar.png",
  };
  const conditions = t("info.self.conditions", {
    returnObjects: true,
  }) as unknown as string[];

  return (
    <section className="grid gap-12 md:grid-cols-12 px-4 sm:px-8 py-20 md:py-28 border-t border-mist-300">
      <div className="md:col-span-6 flex flex-col gap-6">
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">{t("info.title")}</h2>
        <p className="text-xl text-mist-700 text-pretty">{t("info.self.description")}</p>
        <ol className="flex flex-col gap-3 text-base text-mist-700 list-decimal pl-6 marker:text-mist-500">
          {conditions.map((m, i) => (
            <li key={i} className="pl-2 text-pretty">{m}</li>
          ))}
        </ol>
        <Link
          href="https://github.com/debertjamie/debertjamie.com/issues"
          className="w-fit mt-2 rounded-full bg-mist-900 text-mist-50 px-6 py-3 text-base font-semibold transition-colors hover:bg-accent hover:text-accent-ink"
        >
          {t("info.cta")}
        </Link>
      </div>
      <div className="md:col-span-6 min-w-0">
        <CodeBlock value={code} />
      </div>
    </section>
  );
}
