"use client";
import { useDictionary } from "../DictionaryProvider";
import { Gallery } from "./gallery";

export function Hero() {
  const dict = useDictionary();

  return (
    <div className="grid lg:grid-cols-[45%_55%] lg:min-h-screen gap-x-6 py-2 px-8 not-lg:pt-12">
      <div className="flex flex-col justify-center pt-12">
        <h1 className="font-semibold text-6xl">{dict.home.hero.header1}</h1>
        <h2 className="text-5xl">{dict.home.hero.header2}</h2>
        <p className="mt-4">{dict.home.hero.timezone}</p>
      </div>
      <Gallery />
    </div>
  );
}
