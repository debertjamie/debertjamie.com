"use client";
import { useT } from "next-i18next/client";
import { ExtendedLink as Link } from "../commons/extendlink";
import { FOOTER_GROUP } from "../commons/constants";
import { ExternalLink } from "lucide-react";
import { LocaleSwitch } from "./localeswitch";

export function Footer({ copyrightYear }: { copyrightYear: number }) {
  const { t } = useT("nav");
  return (
    <footer className="grid md:grid-cols-2 border-t border-mist-300">
      <div className="px-4 py-2 grid gap-y-6 md:border-r not-md:border-b border-mist-300">
        <div className="flex justify-between flex-wrap gap-2">
          <div>
            <p className="text-3xl font-bold select-none">
              <span className="text-mist-500 tracking-tight">debert</span>
              <span className="text-mist-800 tracking-tight">jamie</span>
            </p>
            <p>{t("quote")}</p>
          </div>
          <div className="not-sm:ml-auto flex items-center">
            <LocaleSwitch />
          </div>
        </div>
        <div className="space-y-1 pb-6">
          <p>&#169; {copyrightYear} Debert Jamie Chanderson</p>
          <div className="flex gap-x-2 text-base">
            <Link href="/privacy" className="font-semibold">
              {t("privacy")}
            </Link>
          </div>
        </div>
      </div>
      <div className="px-4 py-2 grid grid-cols-2 md:grid-cols-3 gap-y-2">
        {FOOTER_GROUP.map((group, i) => (
          <ul
            key={i}
            className={`grid h-fit gap-y-2 text-base font-semibold ${"name" in group[0] && "not-md:grid-cols-2 not-md:col-span-2"}`}
          >
            {group.map((link) => (
              <li key={link.href}>
                {"name" in link ? (
                  <Link href={link.href} className="flex items-center gap-x-1">
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                ) : (
                  <Link href={link.href}>
                    {t(link.label)}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </footer>
  );
}
