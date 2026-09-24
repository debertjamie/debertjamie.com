import type { Metadata, Viewport } from "next";
import { SN_Pro, Noto_Sans_SC } from "next/font/google";
import { DictionaryProvider } from "@/src/components/DictionaryProvider";
import { getDictionary } from "./dictionaries";
import { Header } from "@/src/components/header";
import { Footer } from "@/src/components/footer";

import "../globals.css";
import { Message } from "@/src/components/message";

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
  const dict = await getDictionary(lang);
  
  return {
    metadataBase: new URL("https://debertjamie.com"),
    title: {
      default: dict.metadata.layout.title,
      template: `%s | ${dict.metadata.layout.title}`,
    },
    description: dict.metadata.layout.description,
    openGraph: {
      title: {
        default: dict.metadata.layout.title,
        template: `%s | ${dict.metadata.layout.title}`,
      },
      description: dict.metadata.layout.description,
      type: "website",
      url: "https://debertjamie.com",
      siteName: dict.metadata.layout.title,
      locale: lang,
    },
    twitter: {
      title: {
        default: dict.metadata.layout.title,
        template: `%s | ${dict.metadata.layout.title}`,
      },
      description: dict.metadata.layout.description,
      card: "summary_large_image",
      site: "@debertjamie",
      creator: "@debertjamie",
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
  const dict = await getDictionary(lang as "en" | "zh-CN");

  return (
    <html
      lang={lang}
      className={`${lang === "en" ? snPro.variable : notoSansSC.variable} h-full antialiased`}
    >
      <body className="min-h-screen text-lg bg-mist-50 text-mist-900 flex flex-col scrollbar-none">
        <Message />
        <DictionaryProvider dictionary={dict}>
          <Header />
          <div className="min-h-[calc(100vh-14.5rem)] grid md:grid-cols-[clamp(2rem,2vw+1rem,10rem)_auto_clamp(2rem,2vw+1rem,10rem)]">
            <div className="border-r border-mist-300" />
            {children}
            <div className="border-l border-mist-300" />
          </div>
          <Footer copyrightYear={new Date().getFullYear()} />
        </DictionaryProvider>
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  themeColor: "#E3E7E8",
};
