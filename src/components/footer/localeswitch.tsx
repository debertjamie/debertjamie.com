"use client";
import Link from "next/link";
import { Check, ChevronDown, Languages } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const locales = [
  { code: "en", label: "English" },
  { code: "zh-CN", label: "简体中文" },
];

export function LocaleSwitch() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const params = useParams();
  const currentLang = params.lang as string;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function localizedPath(newLocale: string) {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/");
  }

  const currentLocaleLabel = locales.find((l) => l.code === currentLang)?.label;

  return (
    <div className="relative flex w-40" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer w-40 items-center justify-between gap-x-1 rounded-4xl border border-mist-500 px-3 py-1 z-50 bg-mist-50"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-x-1">
          <Languages />
          <span>{currentLocaleLabel}</span>
        </div>
        <ChevronDown className={`w-3 h-3 duration-300 ${isOpen && "rotate-180"}`} />
      </button>
      <div
        aria-hidden={!isOpen}
        className={`absolute flex flex-col w-full gap-y-2 bottom-full left-0 p-2 pb-5 rounded-t-md shadow-lg border border-mist-500 bg-mist-100 transition-all duration-300 ${isOpen ? "opacity-100 scale-100 translate-y-4" : "opacity-0 translate-y-6 pointer-events-none"}`}
      >
        {locales.map((locale) =>
          locale.code === currentLang ? (
            <span key={locale.code} className="flex items-center gap-x-1">
              <span>{locale.label}</span>
              <Check className="w-3 h-3" />
            </span>
          ) : (
            <Link
              key={locale.code}
              href={localizedPath(locale.code)}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
            >
              {locale.label}
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
