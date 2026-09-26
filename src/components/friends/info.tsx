"use client";
import { CodeBlock } from "../commons/codeblock";
import { useDictionary } from "../DictionaryProvider";
import { ExtendedLink as Link } from "../commons/extendlink";

export function Info() {
  const dict = useDictionary();
  const code = {
    language: "yaml",
    filename: dict.friends.info.self.title,
    code: "name: Debert\nlink: https://debertjamie.com/\ndesc: Great oaks from little acorns grow.\navatar: https://debertjamie.com/avatar.png",
  };

  return (
    <div className="px-8 py-4 flex flex-col gap-y-2">
      <h2 className="font-semibold text-2xl">{dict.friends.info.title}</h2>
      <div className="md:w-3/4">
        <CodeBlock value={code} />
      </div>
      <div className="mx-auto">
        <Link
          href="https://github.com/debertjamie/debertjamie.com/issues"
          className="text-blue-600 w-fit"
        >
          {dict.friends.info.self.description}
        </Link>
      </div>
      <ul className="list-disc pl-6 space-y-1">
        {dict.friends.info.self.conditions.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
}
