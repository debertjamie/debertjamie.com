"use client";
import { useT } from "next-i18next/client";
import { ArrowUpRight, PencilLine, Star, Images } from "lucide-react";
import { ExtendedLink as Link } from "../commons/extendlink";
import { Globe } from "./globe";

export function Grid() {
  const { t } = useT("home");
  return (
    <div className="grid gap-2 border-t border-mist-300 md:grid-cols-[1fr_1.2fr]">
      <div className="grid grid-rows-[auto_1fr] gap-2">
        <div className="border shadow-md p-4 h-fit rounded-3xl border-mist-400">
          <h2 className="text-base font-semibold pb-2">
            {t("grid.about_title")}
          </h2>
          <p>{t("grid.about_desc")}</p>
          <div className="flex gap-x-6 pt-4 text-base font-medium">
            <Link
              href="/about"
              className="flex items-center gap-x-1 border-b leading-tight"
            >
              {t("grid.links.about")}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/now"
              className="flex items-center gap-x-1 border-b leading-tight"
            >
              {t("grid.links.now")}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="grid not-sm:min-h-52  grid-rows-2 grid-cols-2 sm:grid-rows-1 sm:grid-cols-3 md:grid-rows-2 md:grid-cols-2 gap-2">
          <Link
            href="/blog"
            className="relative shadow-xl border px-6 py-2 border-mist-400 rounded-3xl flex flex-col justify-center gap-2 font-semibold duration-300 transition-colors hover:bg-green-500/20 hover:border-green-500 group"
          >
            <PencilLine className="text-green-500 w-5 h-5" />
            {t("grid.links.blog")}
            <ArrowUpRight className="absolute top-3 right-3 opacity-0 transform-all -translate-x-2 translate-y-2 duration-300 group-hover:text-mist-500 group-hover:opacity-100 group-hover:translate-0" />
          </Link>
          <Link
            href="/projects"
            className="relative shadow-xl border px-6 py-2 border-mist-400 rounded-3xl flex flex-col justify-center gap-2 font-semibold duration-300 transition-colors hover:bg-yellow-500/20 hover:border-yellow-500 group"
          >
            <Star className="text-yellow-500 w-5 h-5" />
            {t("grid.links.projects")}
            <ArrowUpRight className="absolute top-3 right-3 opacity-0 transform-all -translate-x-2 translate-y-2 duration-300 group-hover:text-mist-500 group-hover:opacity-100 group-hover:translate-0" />
          </Link>
          <Link
            href="/photos"
            className="relative col-span-2 sm:col-span-1 md:col-span-2 border border-mist-400 shadow-xl flex flex-col gap-2 justify-center rounded-3xl p-4 duration-300 transition-colors hover:bg-teal-500/20 hover:border-teal-500 group"
          >
            <Images className="text-teal-500 w-5 h-5" />
            <div className="flex flex-col">
              <span className="font-semibold">{t("grid.gallery_title")}</span>
              <span className="text-base">{t("grid.gallery_desc")}</span>
            </div>
            <ArrowUpRight className="absolute top-6 right-6 opacity-0 transform-all -translate-x-2 translate-y-2 duration-300 group-hover:text-mist-500 group-hover:opacity-100 group-hover:translate-0" />
          </Link>
        </div>
      </div>
      <div>
        <div className="border rounded-3xl border-mist-400">
          <Globe />
        </div>
      </div>
    </div>
  );
}
