import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getT } from "@/src/lib/i18n-server";
import { alternates } from "@/src/lib/seo";

// The WeChat page is a client component, so its metadata lives here.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "zh-CN" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { t } = await getT("wechat", { lng: lang });
  return {
    title: t("header.title"),
    description: t("header.description"),
    alternates: alternates(lang, "/wechat"),
  };
}

export default function WeChatLayout({ children }: { children: ReactNode }) {
  return children;
}
