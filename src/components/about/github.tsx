import { type TFunction } from "i18next";
import { getContributions, type ContributionLevel } from "@/src/lib/github";

const levelClass: Record<ContributionLevel, string> = {
  NONE: "bg-mist-200",
  FIRST_QUARTILE: "bg-accent/30",
  SECOND_QUARTILE: "bg-accent/55",
  THIRD_QUARTILE: "bg-accent/80",
  FOURTH_QUARTILE: "bg-accent",
};

// One column per week, Sunday on top, like the calendar on a GitHub profile.
export async function GitHub({
  t,
  lang,
}: {
  t: TFunction<"about", undefined>;
  lang: string;
}) {
  const data = await getContributions().catch(() => null);
  // Dates arrive as yyyy-mm-dd; read them as UTC so they never shift a day.
  const formatDate = new Intl.DateTimeFormat(lang, {
    dateStyle: "long",
    timeZone: "UTC",
  });

  return (
    <div className="rounded-3xl border border-mist-300 p-6 flex flex-col gap-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-base font-medium text-mist-600">{t("stats.github.title")}</p>
        {data && (
          <p className="text-base tabular-nums text-mist-700">
            {t("stats.github.total", { count: data.totalContributions })}
          </p>
        )}
      </div>
      {!data ? (
        <p className="text-lg">{t("stats.github.empty")}</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex gap-1 w-max">
            {data.weeks.map((week, i) => (
              <div key={week.contributionDays[0]?.date ?? i} className="flex flex-col gap-1">
                {/* The first week can start mid-week; pad it so rows stay aligned. */}
                {i === 0 &&
                  Array.from({ length: week.contributionDays[0]?.weekday ?? 0 }, (_, j) => (
                    <span key={j} className="size-3" aria-hidden />
                  ))}
                {week.contributionDays.map((day) => (
                  <span
                    key={day.date}
                    title={t("stats.github.day", { count: day.contributionCount, date: formatDate.format(new Date(day.date)) })}
                    className={`size-3 rounded-sm ${levelClass[day.contributionLevel]}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
