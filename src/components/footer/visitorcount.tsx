"use client";

import { useEffect, useState } from "react";
import { useT } from "next-i18next/client";

const SESSION_KEY = "visitor-counted";

export function VisitorCount() {
  const { t, i18n } = useT("nav");
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        // One increment per browser session; subsequent views only read.
        const alreadyCounted =
          sessionStorage.getItem(SESSION_KEY) === "1";
        const res = await fetch("/api/visits", {
          method: alreadyCounted ? "GET" : "POST",
        });
        if (!res.ok) return;
        const data = (await res.json()) as { count: number | null };
        if (!cancelled && typeof data.count === "number") {
          setCount(data.count);
          sessionStorage.setItem(SESSION_KEY, "1");
        }
      } catch {
        // Never let a counter failure affect the footer.
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  // Render nothing until we have a real number, so there is no flash of 0.
  if (count === null) return null;

  const formatted = new Intl.NumberFormat(i18n.language).format(count);

  // Rendered inline after the Privacy link, separated by a thick middot
  // (matching the date/read-time separator used on blog cards).
  return (
    <span className="before:content-['·'] before:font-extrabold before:text-xl before:leading-0 before:mx-2">
      {t("visitors", { count, formatted })}
    </span>
  );
}
