import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const supportedLanguages = ["en", "zh-CN"];
const PUBLIC_FILE = /\.(.*)$/;

function languageProxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieLang = request.cookies.get("selectedLanguage")?.value;
  let lang = "en";
  if (cookieLang && supportedLanguages.includes(cookieLang)) {
    lang = cookieLang;
  } else {
    const browserLang =
      request.headers.get("accept-language")?.toLowerCase() ?? "en";
    if (browserLang.startsWith("zh")) lang = "zh-CN";
  }

  const pathnameHasLocale = supportedLanguages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname.startsWith("/studio") ||
      pathname.startsWith("/l") ||
      pathname.startsWith("/__clerk") ||
      PUBLIC_FILE.test(pathname)
    ) {
      return NextResponse.next();
    }
    request.nextUrl.pathname = `/${lang}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  const response = NextResponse.next();
  response.headers.set("x-initial-language", lang);
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export default clerkMiddleware((_, request) => languageProxy(request));

export const config = {
  matcher: [
    "/((?!api|studio|l|_next/static|_next/image|favicon.ico|assets|monitoring|robots.txt|sitemap.xml).*)",
  ],
};
