"use client";
import { useT } from "next-i18next/client";
import { ExtendedLink as Link } from "@/src/components/commons/extendlink";
import { StatusPage, primaryButton } from "@/src/components/commons/status-page";

export default function NotFound() {
  const { t } = useT("layout");
  return (
    <StatusPage code="404" title={t("notFound.title")} description={t("notFound.description")}>
      <Link href="/" className={primaryButton}>
        {t("notFound.cta")}
      </Link>
    </StatusPage>
  );
}
