import type { TFunction } from "i18next";

const experienceIds = ["utokyo", "breathe", "labassistant", "tutor", "findit", "kmteti"] as const;

export function Experience({ t }: { t: TFunction<"about", undefined> }) {
  return (
    <section className="grid gap-10 md:grid-cols-12 px-4 sm:px-8 py-20 md:py-28">
      {/* Sticky so the heading stays in view next to a long list. */}
      <h2 className="md:col-span-4 md:sticky md:top-8 self-start text-4xl sm:text-5xl font-semibold tracking-tight text-balance break-keep">
        {t("experience.title")}
      </h2>
      <ol className="md:col-span-8 border-t border-mist-300 divide-y divide-mist-300">
        {experienceIds.map((id) => (
          <li key={id} className="grid gap-2 py-8 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <p className="text-base text-mist-600 tabular-nums">
              {t(`experience.items.${id}.period`)}
            </p>
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-semibold tracking-tight text-pretty">
                {t(`experience.items.${id}.position`)}
              </h3>
              <p className="text-lg text-mist-700">{t(`experience.items.${id}.company`)}</p>
              <p className="mt-3 text-base leading-relaxed text-mist-700 max-w-prose">
                {t(`experience.items.${id}.description`)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
