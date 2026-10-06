import type { Metadata, Viewport } from "next";
import { SN_Pro, Noto_Sans_SC } from "next/font/google";
import { I18nProvider } from "next-i18next/client";
import { getResources, getT, initServerI18next } from "next-i18next/server";
import i18nConfig from "../../i18n.config";
import { Header } from "@/src/components/header";
import { Footer } from "@/src/components/footer";

import "../globals.css";
import { Message } from "@/src/components/message";
import { ClerkProvider } from "@clerk/nextjs";

initServerI18next(i18nConfig);

const snPro = SN_Pro({
  variable: "--font-sn-pro",
  subsets: ["latin-ext"],
  fallback: ["serif"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  preload: false,
  weight: ["400", "700"],
  fallback: ["serif"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "zh-CN" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { t } = await getT("layout", { lng: lang });
  const ogImage = `/${lang}/og`;

  return {
    metadataBase: new URL(`https://debertjamie.com/${lang}`),
    alternates: {
      canonical: "https://debertjamie.com"
    },
    title: {
      default: t("metadata.title"),
      template: `%s | ${t("metadata.title")}`,
    },
    description: t("metadata.description"),
    openGraph: {
      title: {
        default: t("metadata.title"),
        template: `%s | ${t("metadata.title")}`,
      },
      description: t("metadata.description"),
      type: "website",
      url: `https://debertjamie.com/${lang}`,
      siteName: t("metadata.title"),
      locale: lang,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: t("metadata.title"),
        },
      ],
    },
    twitter: {
      title: {
        default: t("metadata.title"),
        template: `%s | ${t("metadata.title")}`,
      },
      description: t("metadata.description"),
      card: "summary_large_image",
      site: "@debertjamie",
      creator: "@debertjamie",
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
    authors: [{ name: "Debert Jamie Chanderson", url: "/humans.txt" }],
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const { i18n } = await getT();
  const resources = getResources(i18n);

  return (
    <html
      lang={lang}
      className={`${snPro.variable} ${lang === "zh-CN" && notoSansSC.variable} h-full antialiased`}
    >
      <ClerkProvider>
        <body className="min-h-screen text-lg bg-mist-50 text-mist-900 flex flex-col scrollbar-none">
          <Message />
          <I18nProvider
            language={lang}
            resources={resources}
            supportedLngs={i18nConfig.supportedLngs}
            defaultNS={i18nConfig.defaultNS}
            fallbackLng={i18nConfig.fallbackLng}
          >
            <Header />
            <div className="min-h-[calc(100vh-14.5rem)] grid md:grid-cols-[clamp(2rem,2vw+1rem,10rem)_auto_clamp(2rem,2vw+1rem,10rem)]">
              <div className="border-r border-mist-300" />
              {children}
              <div className="border-l border-mist-300" />
            </div>
            <Footer copyrightYear={new Date().getFullYear()} />
          </I18nProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}

export const viewport: Viewport = {
  themeColor: "#E3E7E8",
};
