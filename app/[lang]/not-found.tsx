"use client";
import { useT } from "next-i18next/client";
import { ExtendedLink as Link } from "@/src/components/commons/extendlink";

export default function NotFound() {
  const { t } = useT("layout")
  return (
    <main className="flex flex-col items-center justify-center gap-y-1">
      <h1 className="text-3xl font-semibold">404 Not Found</h1>
      <h2 className="text-xl">{t("notFound.title")}</h2>
      <p>{t("notFound.description")}</p>
      <Link
        href="/"
        className="border border-mist-500 bg-mist-100 px-2 py-1 rounded-md mt-6 font-medium shadow-md duration-300 ease-in hover:-translate-y-1 hover:border-mist-800 hover:bg-mist-200"
      >
        {t("notFound.cta")}
      </Link>
    </main>
  );
}
