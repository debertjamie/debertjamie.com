"use client";
import { useT } from "next-i18next/client";
import { DesignQR } from "designqr";
import { useState, useSyncExternalStore } from "react";
import { wechatUrl } from "@/src/lib/env";
import usePrefersReducedMotion from "@/src/hooks/useReducedMotion";

function getLowPerformanceDevice() {
  const browserNavigator = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  const { connection, deviceMemory, hardwareConcurrency } = browserNavigator;

  return (
    connection?.saveData === true ||
    (deviceMemory !== undefined && deviceMemory <= 4) ||
    (hardwareConcurrency !== undefined && hardwareConcurrency <= 4)
  );
}

const subscribeToPerformanceChanges = () => () => {};

const seasons = ["spring", "summer", "autumn", "winter"] as const;
type Season = (typeof seasons)[number];

// The tree opens in the season you visit in, and you can walk it through
// the other three before it turns into the QR code.
function currentSeason(): Season {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
}

export default function WeChat() {
  const { t } = useT("wechat");
  const prefersReducedMotion = usePrefersReducedMotion();
  const isLowPerformanceDevice = useSyncExternalStore(
    subscribeToPerformanceChanges,
    getLowPerformanceDevice,
    () => false,
  );
  const [current, setCurrent] = useState<"tree" | "qr">("tree");
  const [season, setSeason] = useState<Season>(currentSeason);
  const showOnlyQr = prefersReducedMotion || isLowPerformanceDevice;
  const view = showOnlyQr ? "qr" : current === "tree" ? "design" : "qr";

  return (
    <main className="grid gap-12 lg:grid-cols-12 lg:items-center px-4 sm:px-8 pt-16 pb-24 md:pt-24">
      <div className="lg:col-span-5 flex flex-col gap-8">
        <h1 className="text-[clamp(3rem,10vw,8rem)] font-semibold tracking-tighter leading-[0.95] break-keep">
          {t("header.title")}
        </h1>
        <p className="text-xl sm:text-2xl leading-snug text-mist-700 text-pretty max-w-xl">
          {t("header.description")}
        </p>

        {!showOnlyQr && (
          <>
            <fieldset className="flex flex-col gap-3">
              <legend className="pb-3 text-base font-medium text-mist-600">{t("seasons.label")}</legend>
              <div className="flex flex-wrap gap-2">
                {seasons.map((s) => (
                  <label
                    key={s}
                    className="cursor-pointer rounded-full border border-mist-300 px-5 py-2.5 text-base font-medium transition-colors hover:border-mist-900 has-checked:border-mist-900 has-checked:bg-mist-900 has-checked:text-mist-50 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent-mark"
                  >
                    <input
                      type="radio"
                      name="season"
                      value={s}
                      checked={season === s}
                      onChange={() => {
                        setSeason(s);
                        setCurrent("tree");
                      }}
                      className="sr-only"
                    />
                    {t(`seasons.${s}`)}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                type="button"
                onClick={() => setCurrent((c) => (c === "tree" ? "qr" : "tree"))}
                className="rounded-full bg-mist-900 text-mist-50 px-7 py-3 text-base font-semibold transition-colors hover:bg-accent hover:text-accent-ink active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-mark"
              >
                {current === "tree" ? t("actions.showQr") : t("actions.showTree")}
              </button>
              <p className="text-base text-mist-600" aria-live="polite">
                {t(`instructions.${current}`)}
              </p>
            </div>
          </>
        )}
      </div>

      {/* The scene keeps the library's seasonal backdrop: it is the artwork. */}
      <div className="lg:col-span-7 flex justify-center">
        <div className="aspect-square w-[min(100%,75vh,44rem)] overflow-hidden rounded-[2.5rem] border border-mist-300">
          <DesignQR
            key={season}
            style={{
              outline: "none",
              WebkitTapHighlightColor: "transparent",
              display: "block",
              borderWidth: "0",
              boxShadow: "none",
            }}
            details={{ border: { padding: 10 } }}
            className="h-full w-full"
            value={wechatUrl!}
            theme={season}
            view={view}
            ariaLabel={t("instructions.qr")}
            onViewChange={(nextView) => setCurrent(nextView === "qr" ? "qr" : "tree")}
          />
        </div>
      </div>
    </main>
  );
}
