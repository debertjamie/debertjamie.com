import { type TFunction } from "i18next";
import { getWakatimeData } from "@/src/lib/wakatime";
import { LIGHT_MODE_PALETTE, TECH_COLORS } from "../commons/constants";

export async function Wakatime({ t }: { t: TFunction<"about", undefined> }) {
  const data = await getWakatimeData();
  const languages = data.languages.slice(0, 21);

  function getColor(index: number, name: string) {
    const brandColor = TECH_COLORS[name.toLowerCase()];
    const fallbackColor = LIGHT_MODE_PALETTE[index % LIGHT_MODE_PALETTE.length];
    return brandColor || fallbackColor;
  }

  function getSpan(percent: number) {
    if (percent > 30) return "col-span-2 row-span-2";
    if (percent > 15) return "col-span-2 row-span-1";
    return "col-span-1 row-span-1";
  }

  return (
    <div className="p-4 border border-mist-500 bg-mist-100 rounded-xl">
      <p className="pb-2 font-semibold">{t("stats.wakatime.languages")}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-32">
        {languages.map((lang, i) => (
          <div
            key={i}
            style={{
              borderColor: getColor(i, lang.name),
            }}
            className={`relative overflow-hidden flex flex-col justify-between p-4 bg-mist-300 rounded-lg border-l-3 hover:bg-mist-50 hover:scale-105 transition-[colors_transform] duration-300 group cursor-default ${getSpan(lang.percent)}`}
          >
            <p className="text-sm font-semibold truncate mb-2">{lang.name}</p>
            <div>
              <p className="text-lg font-bold">
                {(lang.total_seconds / 3600).toFixed(1)}h
              </p>
              <p className="text-xs mt-0 5">{lang.percent}%</p>
            </div>
            <div
              style={{
                background: `color-mix(in srgb, ${getColor(i, lang.name)} 30%, white)`,
              }}
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center p-4 pointer-events-none"
            >
              <span className="font-semibold text-sm truncate">
                {lang.name}
              </span>
              <span className="text-xs">
                {(lang.total_seconds / 3600).toFixed(1)}h ({lang.percent}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
