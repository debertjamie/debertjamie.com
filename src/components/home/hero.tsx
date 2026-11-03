"use client";
import { useT } from "next-i18next/client";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { ExtendedLink as Link } from "../commons/extendlink";
import { LiveClock } from "./live-clock";
import { ScrollHint } from "./scroll-hint";
import usePrefersReducedMotion from "@/src/hooks/useReducedMotion";

// Staggered fade-up variants for the heading words/lines
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const staticItemVariants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  const { t } = useT("home");
  const reduced = usePrefersReducedMotion();

  const variants = reduced ? staticItemVariants : itemVariants;
  const container = reduced
    ? { hidden: {}, show: {} }
    : containerVariants;

  return (
    <div className="relative overflow-hidden min-h-[calc(100svh-4rem)] flex flex-col justify-center px-4 sm:px-8 py-16 lg:py-24">
      {/* Ambient gradient orbs — purely decorative, never interfere with text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Orb 1 — top-left */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-300/25 dark:bg-blue-700/15 blur-3xl animate-float" />
        {/* Orb 2 — bottom-right */}
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-violet-300/20 dark:bg-violet-700/12 blur-3xl animate-float-delayed" />
        {/* Orb 3 — center-right (subtle) */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-teal-200/15 dark:bg-teal-700/10 blur-2xl animate-float" />
      </div>

      <div className="flex flex-col gap-6 max-w-3xl">
        {/* Status row — timezone + live clock */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-wrap items-center gap-2"
        >
          <motion.span
            variants={variants}
            className="inline-flex items-center gap-1.5 rounded-full border border-mist-300 dark:border-mist-400 bg-mist-100 dark:bg-mist-200 px-3 py-1 text-xs font-medium text-mist-700 dark:text-mist-700"
          >
            <MapPin className="w-3 h-3" aria-hidden />
            {t("hero.tz_label")}
          </motion.span>
          <motion.span
            variants={variants}
            className="inline-flex items-center gap-1.5 rounded-full border border-mist-300 dark:border-mist-400 bg-mist-100 dark:bg-mist-200 px-3 py-1 text-xs font-medium text-mist-600 dark:text-mist-600 tabular-nums"
          >
            <LiveClock />
          </motion.span>
        </motion.div>

        {/* Main heading — staggered per line */}
        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-1"
        >
          {/* First name on its own line for impact on larger screens */}
          <motion.span
            variants={variants}
            className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight text-mist-900 dark:text-mist-900 leading-none"
          >
            Debert Jamie
          </motion.span>
          <motion.span
            variants={variants}
            className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-mist-600 dark:text-mist-600 leading-tight"
          >
            Chanderson
          </motion.span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={reduced ? staticItemVariants : itemVariants}
          initial="hidden"
          animate="show"
          className="text-base sm:text-lg text-mist-600 dark:text-mist-500 max-w-xl leading-relaxed"
        >
          {t("hero.tagline")}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-wrap gap-3 pt-1"
        >
          <motion.div variants={variants} whileHover={reduced ? {} : { scale: 1.03 }}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-mist-900 dark:bg-mist-100 text-mist-50 dark:text-mist-900 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-mist-700 dark:hover:bg-mist-300"
            >
              {t("hero.cta_projects")}
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </motion.div>
          <motion.div variants={variants} whileHover={reduced ? {} : { scale: 1.03 }}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-mist-400 dark:border-mist-500 bg-transparent text-mist-800 dark:text-mist-200 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-mist-600 dark:hover:border-mist-400 hover:bg-mist-100 dark:hover:bg-mist-200"
            >
              {t("hero.cta_blog")}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint — bottom center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollHint label={t("hero.scroll_hint")} />
      </div>
    </div>
  );
}
