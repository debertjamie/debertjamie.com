"use client";
import { ExtendedLink as Link } from "./extendlink";
import { usePathname, useParams } from "next/navigation";
import type { ComponentProps } from "react";

export function HoverLink(props: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const params = useParams();
  const lang = params?.lang as string | undefined;

  const localizedHref =
    lang && typeof props.href === "string" && props.href.startsWith("/")
      ? `/${lang}${props.href}`
      : props.href;

  const isActive =
    pathname === String(localizedHref) ||
    pathname.startsWith(String(localizedHref) + "/");

  return (
    <Link
      data-active={isActive}
      className={`${props.className} text-mist-700 hover:text-mist-900 data-active:text-mist-900`}
      {...props}
    />
  );
}
