"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { useT } from "next-i18next/client";
import { ExtendedLink as Link } from "@/src/components/commons/extendlink";
import { StatusPage, primaryButton } from "@/src/components/commons/status-page";

// Catches runtime failures in any page (Sanity, Neon, or an external API
// going down) and keeps the header and footer around the message.
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const { t } = useT("layout");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusPage code="500" title={t("error.title")} description={t("error.description")}>
      <button type="button" onClick={() => retry()} className={primaryButton}>
        {t("error.retry")}
      </button>
      <Link
        href="/"
        className="py-3 text-base font-semibold underline decoration-2 decoration-mist-400 underline-offset-8 hover:decoration-accent-text"
      >
        {t("notFound.cta")}
      </Link>
    </StatusPage>
  );
}
