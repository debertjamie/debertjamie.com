"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps } from "react";
import type { UrlObject } from "url";

function isInternal(
  href: string | UrlObject,
) {
  return (
    typeof href === "object" ||
    (typeof href === "string" && href.startsWith("/")) ||
    (typeof href === "string" && href.startsWith("#"))
  );
}

function isExternal(
  href: string | UrlObject,
) {
  return (
    typeof href === "string" &&
    (href.startsWith("http") || href.startsWith("mailto:"))
  );
}

function LocalizedLink({ href, ...rest }: ComponentProps<typeof Link>) {
  const params = useParams();
  const lang = params.lang as string;
  let localized = href;

  if (typeof href === "string" && href.startsWith("/")) {
    localized = href === "/" ? `/${lang}` : `/${lang}${href}`;
  } else if (
    typeof href === "object" &&
    href !== null &&
    href.pathname?.startsWith("/")
  ) {
    localized = {
      ...href,
      pathname: href.pathname === "/" ? `/${lang}` : `/${lang}${href.pathname}`,
    };
  }

  return <Link href={localized} {...rest} />;
}

export function ExtendedLink(props: ComponentProps<typeof Link>) {
    if(isExternal(props.href)) {
        const { href, ...rest } = props;
        return <Link href={href} {...href.toString().startsWith("http") && { target: "_blank", rel: "noopener noreferrer" }} {...rest} />
    }
    if(isInternal(props.href)) {
        return <LocalizedLink {...props} />
    }
}
