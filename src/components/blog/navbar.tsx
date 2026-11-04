"use client";
import { useT } from "next-i18next/client";
import { ExtendedLink as Link } from "../commons/extendlink";

type NavbarProps = {
  activeTab: "posts" | "notes";
};

const tabs = ["posts", "notes"] as const;

export function Navbar({ activeTab }: NavbarProps) {
  const { t } = useT("blog");

  return (
    <nav className="sticky top-0 z-20 flex gap-8 px-4 sm:px-8 border-y border-mist-300 bg-mist-50">
      {tabs.map((tab) => (
        <Link
          key={tab}
          href={`/blog?tab=${tab}`}
          aria-current={activeTab === tab ? "page" : undefined}
          className={`-mb-px py-4 text-lg font-medium border-b-4 transition-colors ${
            activeTab === tab
              ? "border-accent-mark text-mist-900"
              : "border-transparent text-mist-600 hover:text-mist-900"
          }`}
        >
          {t(`navbar.${tab}`)}
        </Link>
      ))}
    </nav>
  );
}
