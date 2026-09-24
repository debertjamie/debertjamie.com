"use client";
import { useDictionary } from "../DictionaryProvider";
import { HoverLink } from "../commons/hoverlink";
import type { JSX } from "react/jsx-runtime";

type NavbarProps = {
  links: { icon: JSX.Element; href: string; label: string }[];
};

export function Navbar({ links }: NavbarProps) {
  const dict = useDictionary();

  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-2 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <HoverLink href={link.href} className="px-3 py-2 font-medium text-mist-600 transition-colors duration-300 hover:text-mist-900">
              {dict.nav[link.label as keyof typeof dict.nav]}
            </HoverLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
