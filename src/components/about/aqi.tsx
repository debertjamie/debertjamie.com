import { type TFunction } from "i18next";
import { getAQI } from "@/src/lib/aqi";

const colorMapping: Record<string, string> = {
  good: "border-green-300 bg-green-100",
  moderate: "border-yellow-300 bg-yellow-100",
  sensitive: "border-orange-300 bg-orange-100",
  unhealthy: "border-red-300 bg-red-100",
  very_unhealthy: "border-purple-300 bg-purple-100",
  hazardous: "border-black bg-gray-100",
};

export async function AQI({
  t,
  lang,
}: {
  t: TFunction<"about", undefined>;
  lang: string;
}) {
  const data = await getAQI();
  lang = lang === "en" ? "en-GB" : lang;
  const color =
    data.status === "success"
      ? colorMapping[data.data.classification]
      : "border-yellow-300 bg-yellow-100";

  return (
    <div
      className={`h-full not-md:min-h-40 cursor-default p-4 rounded-xl border flex flex-col group ${color}`}
    >
      <p className="font-semibold">{t("stats.aqi.header")}</p>
      <div className="mx-auto text-center py-2">
        {data.status === "success" ? (
          <>
            <p className="text-5xl font-bold group-hover:scale-110 duration-300 transition-transform">
              {data.data.current.pollution.aqius}
            </p>
            <p className="text-base">
              {t(`stats.aqi.classification.${data.data.classification}`)}
            </p>
          </>
        ) : (
          <p className="text-5xl font-bold">{t("stats.aqi.unknown")}</p>
        )}
      </div>
      {data.status === "success" && (
        <p className="text-sm mt-auto">
          {t("stats.aqi.updated")}:{" "}
          <span className="font-semibold">
            {new Date(data.data.current.pollution.ts).toLocaleString(lang, {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
        </p>
      )}
    </div>
  );
}
