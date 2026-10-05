"use client";
import { useT } from "next-i18next/client";
import { Gallery } from "./gallery";

export function Hero() {
  const { t } = useT("home");
  return (
    <div className="grid lg:grid-cols-[45%_55%] lg:min-h-screen gap-x-6 py-2 px-4 sm:px-8 sm:not-lg:pt-12 lg:pb-24">
      <div className="flex flex-col justify-center pt-12">
        <h1 className="font-semibold text-6xl">{t("hero.title")}</h1>
        <h2 className="text-2xl sm:text-5xl">{t("hero.subtitle")}</h2>
        <p className="mt-4">{t("hero.timezone")}</p>
      </div>
      <Gallery />
    </div>
  );
}
