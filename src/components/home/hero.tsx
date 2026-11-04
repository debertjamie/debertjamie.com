"use client";
import type { ReactNode } from "react";
import { useT } from "next-i18next/client";
import { motion } from "framer-motion";
import { ExtendedLink as Link } from "../commons/extendlink";
import { ScrollHint } from "./scroll-hint";
import usePrefersReducedMotion from "@/src/hooks/useReducedMotion";

const ease = [0.22, 1, 0.36, 1] as const;

function Line({
  children,
  delay,
  reduced,
  className = "",
}: {
  children: ReactNode;
  delay: number;
  reduced: boolean;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className}`}
        initial={reduced ? false : { y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const { t } = useT("home");
  const reduced = usePrefersReducedMotion();

  const after = {
    initial: reduced ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease, delay: 0.45 },
  } as const;

  return (
    <section className="relative min-h-[calc(100svh-4rem)] flex flex-col justify-end px-4 sm:px-8 pt-24 pb-24">
      <h1 className="font-semibold tracking-tighter leading-[0.9] text-[clamp(2.75rem,12vw,11rem)] wrap-break-word break-keep">
        <Line delay={0} reduced={reduced} className="text-mist-900">
          {t("hero.name.first")}
        </Line>
        <Line delay={0.12} reduced={reduced} className="text-mist-500">
          {t("hero.name.last")}
        </Line>
      </h1>

      <motion.div {...after} className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <p className="text-xl sm:text-2xl text-mist-700 max-w-xl text-pretty">
          {t("hero.tagline")}
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <Link
            href="/projects"
            className="inline-flex items-center rounded-full bg-mist-900 text-mist-50 px-6 py-3 text-base font-semibold transition-colors hover:bg-accent hover:text-accent-ink active:scale-[0.98]"
          >
            {t("hero.cta_projects")}
          </Link>
          <Link
            href="/blog"
            className="py-3 text-base font-semibold underline decoration-2 decoration-mist-400 underline-offset-8 transition-colors hover:decoration-accent-text"
          >
            {t("hero.cta_blog")}
          </Link>
        </div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <ScrollHint label={t("hero.scroll_hint")} />
      </div>
    </section>
  );
}
