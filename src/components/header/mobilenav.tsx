"use client";
import { useT } from "next-i18next/client";
import { Menu, X } from "lucide-react";
import { type JSX, useEffect, useRef, useState } from "react";
import { ExtendedLink as Link } from "../commons/extendlink";

type NavbarProps = {
  links: { icon: JSX.Element; href: string; label: string }[];
};

export function MobileNav({ links }: NavbarProps) {
  const { t } = useT("nav");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav ref={navRef} className="md:hidden relative">
      <button
        className="relative flex items-center justify-center w-5 h-5 border-mist-700"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`absolute transition-all duration-300 ease-in-out ${isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`}
        >
          <Menu className="w-6 h-6" />
        </div>
        <div
          className={`absolute transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"}`}
        >
          <X className="w-6 h-6" />
        </div>
      </button>
      <div
        className={`absolute right-0 top-12 bg-mist-100 px-2 py-2 min-w-40 rounded-lg shadow-md transition-all duration-300 origin-top-right ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 -translate-y-5 pointer-events-none"}`}
      >
        <ul className="flex flex-col gap-y-2 text-base">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="flex items-center gap-x-2 py-1"
                onClick={() => {
                  window.setTimeout(() => setIsOpen(false), 0);
                }}
              >
                {link.icon}
                <span className="font-medium">
                  {t(link.label)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
