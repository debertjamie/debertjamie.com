"use client";
import { ExtendedLink as Link } from "./extendlink";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

export function HoverLink(props: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  return (
    <Link
      data-active={pathname === props.href}
      className={`${props.className} text-mist-700 hover:text-mist-900 data-active:text-mist-900`}
      {...props}
    />
  );
}
