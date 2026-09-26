"use client";
import { useDictionary } from "../DictionaryProvider";
import { ExtendedLink as Link } from "../commons/extendlink";

export function NavigationPorts() {
  const dict = useDictionary();
  return (
    <div className="py-4 flex flex-wrap justify-center items-center gap-x-2 gap-y-4 sm:gap-x-6 px-4">
      <Link
        href="/now"
        className="group flex items-center justify-between min-w-64 px-4 py-2 bg-white border border-mist-200 rounded-xl shadow-sm hover:shadow-md hover:border-mist-300 transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-full h-3 w-3 bg-emerald-500" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-mist-400 uppercase tracking-widest">
              {dict.about.links.now}
            </span>
            <span className="text-lg font-mono font-semibold text-mist-800 group-hover:text-emerald-500 transition-colors">
              cd ./now
            </span>
          </div>
        </div>
        <svg
          className="w-4 h-4 text-mist-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
      <Link
        href="/resume"
        className="group flex items-center justify-between min-w-64 px-4 py-2 bg-white border border-mist-200 rounded-xl shadow-sm hover:shadow-md hover:border-mist-300 transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-full h-3 w-3 bg-emerald-500" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-mist-400 uppercase tracking-widest">
              {dict.about.links.projects}
            </span>
            <span className="text-lg font-mono font-semibold text-mist-800 group-hover:text-emerald-500 transition-colors">
              cd ./projects
            </span>
          </div>
        </div>
        <svg
          className="w-4 h-4 text-mist-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
  );
}
