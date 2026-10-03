"use client";
import { useT } from "next-i18next/client";
import { CodeBlock } from "../commons/codeblock";
import { ExtendedLink as Link } from "../commons/extendlink";

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
    <div className="px-8 py-4 flex flex-col gap-y-2">
      <h2 className="font-semibold text-2xl">{t("info.title")}</h2>
      <div className="md:w-3/4">
        <CodeBlock value={code} />
      </div>
      <div className="mx-auto">
        <Link
          href="https://github.com/debertjamie/debertjamie.com/issues"
          className="text-blue-600 w-fit"
        >
          {t("info.self.description")}
        </Link>
      </div>
      <ul className="list-disc pl-6 space-y-1">
        {conditions.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
}
