import { type TFunction } from "i18next";
import { getAQI } from "@/src/lib/aqi";

// Standard AQI band colors: they encode the reading, so they stay as-is.
const bandColor: Record<string, string> = {
  good: "bg-green-500",
  moderate: "bg-yellow-400",
  sensitive: "bg-orange-500",
  unhealthy: "bg-red-500",
  very_unhealthy: "bg-purple-500",
  hazardous: "bg-rose-900",
};

export async function AQI({
  t,
  lang,
}: {
  t: TFunction<"about", undefined>;
  lang: string;
}) {
  const data = await getAQI().catch(() => ({ status: "fail" as const }));
  const locale = lang === "en" ? "en-GB" : lang;

  return (
    <div className="h-full min-h-56 rounded-3xl border border-mist-300 p-6 flex flex-col gap-4">
      <p className="text-base font-medium text-mist-600">{t("stats.aqi.header")}</p>
      {data.status === "success" ? (
        <>
          <p className="text-7xl font-semibold tracking-tight tabular-nums">
            {data.data.current.pollution.aqius}
          </p>
          <p className="flex items-center gap-2 text-lg font-medium">
            <span
              className={`size-3 rounded-full ${bandColor[data.data.classification]}`}
              aria-hidden
            />
            {t(`stats.aqi.classification.${data.data.classification}`)}
          </p>
          <p className="mt-auto text-sm text-mist-600">
            {t("stats.aqi.updated")}:{" "}
            {new Date(data.data.current.pollution.ts).toLocaleString(locale, {
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        </>
      ) : (
        <p className="text-3xl font-semibold text-mist-600">{t("stats.aqi.unknown")}</p>
      )}
    </div>
  );
}
