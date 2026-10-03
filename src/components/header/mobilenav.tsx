"use client";
import { useT } from "next-i18next/client";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { type JSX, useEffect, useRef, useState } from "react";
import { HoverLink } from "../commons/hoverlink";

type NavbarProps = {
  links: { icon: JSX.Element; href: string; label: string }[];
};

export function MobileNav({ links }: NavbarProps) {
  const { t } = useT("nav");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState<string>(pathname);

  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="md:hidden relative">
      <button
        className="relative flex items-center justify-center w-5 h-5 border-mist-700"
        ref={menuRef}
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
              <HoverLink
                href={link.href}
                className="flex items-center gap-x-2 py-1"
              >
                {link.icon}
                <span className="font-medium">
                  {t(link.label)}
                </span>
              </HoverLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
