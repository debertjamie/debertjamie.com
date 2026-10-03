"use client";
import { useT } from "next-i18next/client";
import { ExtendedLink as Link } from "../commons/extendlink";
import { useState, useEffect, useRef } from "react";

type NavbarProps = {
  activeTab: "posts" | "notes";
};

const tabs = ["posts", "notes"] as const;

export function Navbar({ activeTab }: NavbarProps) {
  const { t } = useT("blog");
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navbarRef}
      className={`flex justify-center whitespace-nowrap overflow-x-auto scrollbar-none md:overflow-x-hidden md:sticky md:top-0 md:z-10 md:transition-shadow md:duration-300 ${
        isScrolled ? "md:shadow-md md:bg-mist-200" : ""
      }`}
    >
      <div className="flex gap-x-4 md:gap-x-12 border-b border-mist-300">
        {tabs.map((tab) => (
          <Link
            key={tab}
            href={`/blog?tab=${tab}`}
            className={`px-2 py-1 font-medium ${
              activeTab === tab &&
              "border-b-4 border-yellow-500"
            }`}
          >
            {t(`navbar.${tab}`)}
          </Link>
        ))}
      </div>
    </nav>
  );
}
