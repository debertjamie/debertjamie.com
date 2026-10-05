import { type TFunction } from "i18next";
import { Sparkles, Coffee } from "lucide-react";
import { Wakatime } from "./wakatime";
import { Spotify } from "./spotify";
import { AQI } from "./aqi";

export async function Stats({
  t,
  lang,
}: {
  t: TFunction<"about", undefined>;
  lang: string;
}) {
  function consumedWater() {
    return Math.floor((3 * new Date().getDate() * 1000) / 1000);
  }

  return (
    <div className="border-t border-mist-300 grid not-md:px-2 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <Wakatime t={t} />
      </div>
      <Spotify />
      <div className="relative cursor-default overflow-hidden min-h-fit rounded-xl bg-mist-100 md:bg-mist-200 border border-mist-300 hover:border-mist-400 hover:bg-mist-100 transition-colors duration-300 group">
        <div
          aria-hidden
          className="absolute select-none opacity-20 top-10 right-3 group-hover:-translate-y-1 group-hover:scale-105 transition-[opacity_transform] duration-300"
        >
          <Sparkles className="w-16 h-16 text-yellow-500" />
        </div>
        <div className="not-md:opacity-100 relative h-8 bg-mist-50 border-b border-mist-400 duration-300 transition-all flex items-center justify-center px-4">
          <div className="absolute left-4 flex items-center gap-x-2">
            <div className="rounded-full bg-red-500 w-3 h-3" />
            <div className="rounded-full bg-yellow-500 w-3 h-3" />
            <div className="rounded-full bg-green-500 w-3 h-3" />
          </div>
          <p className="text-base font-semibold">Quote</p>
        </div>
        <div className="transition-opacity px-4 py-2 md:opacity-80 group-hover:opacity-100 duration-300">
          <p className="text-xl tracking-wide">{t("stats.quote")}</p>
        </div>
      </div>
      <div className="cursor-default rounded-xl border border-mist-300 p-4 group">
        <div className="w-10 h-10 rounded-lg bg-sky-400 transition-transform group-hover:-translate-y-1 duration-300 flex items-center justify-center">
          <Coffee className="w-6 h-6 text-mist-50" />
        </div>
        <div className="flex flex-col justify-between gap-y-2">
          <div className="flex flex-col">
            <p className="font-semibold">{t("stats.water.header")}</p>
            <p className="text-sm">{t("stats.water.description")}</p>
          </div>
          <p className="pl-3 transition-transform group-hover:scale-105 duration-300">
            <span className="text-5xl font-semibold">{consumedWater()}</span>{" "}
            {t("stats.water.total")}
          </p>
        </div>
      </div>
      <div className="h-full">
        <AQI t={t} lang={lang} />
      </div>
    </div>
  );
}
