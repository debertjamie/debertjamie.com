import { type TFunction } from "i18next";
import { Suspense } from "react";
import { Wakatime } from "./wakatime";
import { Spotify } from "./spotify";
import { AQI } from "./aqi";
import { GitHub } from "./github";

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-3xl bg-mist-200 ${className}`} aria-hidden />;
}

// Live data only: what is playing, the air outside, and where coding time goes.
export function Stats({
  t,
  lang,
}: {
  t: TFunction<"about", undefined>;
  lang: string;
}) {
  return (
    <>
      <section className="grid gap-3 md:grid-cols-12 px-4 sm:px-8 py-20 md:py-28 border-t border-mist-300">
        <h2 className="md:col-span-12 pb-7 text-4xl sm:text-5xl font-semibold tracking-tight">
          {t("stats.title")}
        </h2>
        <div className="md:col-span-7">
          <Spotify />
        </div>
        <div className="md:col-span-5">
          <Suspense fallback={<Skeleton className="h-56" />}>
            <AQI t={t} lang={lang} />
          </Suspense>
        </div>
        <div className="md:col-span-12">
          <Suspense fallback={<Skeleton className="h-80" />}>
            <Wakatime t={t} />
          </Suspense>
        </div>
        <div className="md:col-span-12">
          <Suspense fallback={<Skeleton className="h-48" />}>
            <GitHub t={t} lang={lang} />
          </Suspense>
        </div>
      </section>

      <section className="px-4 sm:px-8 py-24 md:py-32 border-t border-mist-300">
        <blockquote className="relative max-w-5xl">
          <span
            className="absolute -top-10 -left-1 text-8xl leading-none font-semibold text-accent-mark select-none"
            aria-hidden
          >
            &ldquo;
          </span>
          <p className="pt-8 text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-pretty">
            {t("stats.quote")}
          </p>
        </blockquote>
      </section>
    </>
  );
}
