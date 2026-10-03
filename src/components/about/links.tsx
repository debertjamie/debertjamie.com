"use client";
import { useT } from "next-i18next/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ExtendedLink as ELink } from "../commons/extendlink";

export function NavigationPorts() {
  const { t } = useT("about");
  return (
    <div className="py-4 flex flex-wrap justify-center items-center gap-x-2 gap-y-4 sm:gap-x-6 px-4">
      <ELink
        href="/now"
        className="group flex items-center justify-between min-w-64 px-4 py-2 bg-white border border-mist-200 rounded-xl shadow-sm hover:shadow-md hover:border-mist-300 transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-full h-3 w-3 bg-emerald-500" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-mist-400 uppercase tracking-widest">
              {t("links.now")}
            </span>
            <span className="text-lg font-mono font-semibold text-mist-800 group-hover:text-emerald-500 transition-colors">
              cd ./now
            </span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-mist-400 group-hover:text-emerald-500 group-hover:translate-x-1 duration-300 transition-all" />
      </ELink>
      <ELink
        href="/projects"
        className="group flex items-center justify-between min-w-64 px-4 py-2 bg-white border border-mist-200 rounded-xl shadow-sm hover:shadow-md hover:border-mist-300 transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-full h-3 w-3 bg-emerald-500" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-mist-400 uppercase tracking-widest">
              {t("links.projects")}
            </span>
            <span className="text-lg font-mono font-semibold text-mist-800 group-hover:text-emerald-500 transition-colors">
              cd ./projects
            </span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-mist-400 group-hover:text-emerald-500 group-hover:translate-x-1 duration-300 transition-all" />
      </ELink>
      <Link
        href="/cv"
        className="group flex items-center justify-between min-w-64 px-4 py-2 bg-white border border-mist-200 rounded-xl shadow-sm hover:shadow-md hover:border-mist-300 transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-full h-3 w-3 bg-emerald-500" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-mist-400 uppercase tracking-widest">
              {t("links.cv")}
            </span>
            <span className="text-lg font-mono font-semibold text-mist-800 group-hover:text-emerald-500 transition-colors">
              wget ./cv
            </span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-mist-400 group-hover:text-emerald-500 group-hover:translate-x-1 duration-300 transition-all" />
      </Link>
    </div>
  );
}
