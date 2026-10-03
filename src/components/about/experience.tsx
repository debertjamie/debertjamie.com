import type { TFunction } from "i18next";

const experienceIds = ["utokyo", "breathe", "labassistant", "tutor", "findit", "kmteti"] as const;

export function Experience({ t }: { t: TFunction<"about", undefined> }) {
  return (
    <section className="border-t border-mist-300 px-8 py-8 grid gap-8 md:grid-cols-[20%_75%] justify-center">
      <div>
        <h2 className="mt-2 text-3xl font-semibold">{t("experience.title")}</h2>
      </div>
      <div className="divide-y divide-mist-300">
        {experienceIds.map((id) => (
          <article
            key={id}
            className="grid gap-3 py-5 first:pt-0 sm:grid-cols-[9rem_1fr]"
          >
            <p className="text-sm text-mist-500">
              {t(`experience.items.${id}.period`)}
            </p>
            <div>
              <h3 className="text-xl font-semibold">
                {t(`experience.items.${id}.position`)}
              </h3>
              <p className="font-medium text-mist-600">
                {t(`experience.items.${id}.company`)}
              </p>
              <p className="mt-2 text-base leading-relaxed text-mist-700">
                {t(`experience.items.${id}.description`)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
