import { type TFunction } from "i18next";
import { getWakatimeData } from "@/src/lib/wakatime";

// Ranked bars instead of a colored tile mosaic: length is the information,
// so one neutral color is enough. The top language gets the accent.
export async function Wakatime({ t }: { t: TFunction<"about", undefined> }) {
  const data = await getWakatimeData().catch(() => null);
  const languages = (data?.languages ?? []).filter((l) => l.total_seconds > 0).slice(0, 8);
  const max = languages[0]?.total_seconds ?? 1;

  return (
    <div className="rounded-3xl border border-mist-300 p-6 flex flex-col gap-6">
      <p className="text-base font-medium text-mist-600">{t("stats.wakatime.languages")}</p>
      {languages.length === 0 ? (
        <p className="text-lg">{t("stats.wakatime.empty")}</p>
      ) : (
        <ol className="flex flex-col gap-4">
          {languages.map((lang, i) => (
            <li
              key={lang.name}
              className="grid grid-cols-[minmax(0,7rem)_1fr_auto] sm:grid-cols-[10rem_1fr_6rem] items-center gap-4"
            >
              <span className="truncate text-base font-medium">{lang.name}</span>
              <span className="h-3 rounded-full bg-mist-200 overflow-hidden">
                <span
                  className={`block h-full rounded-full ${i === 0 ? "bg-accent" : "bg-mist-500"}`}
                  style={{ width: `${Math.max((lang.total_seconds / max) * 100, 2)}%` }}
                />
              </span>
              <span className="text-right text-base tabular-nums text-mist-700">
                {(lang.total_seconds / 3600).toFixed(1)}h
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
