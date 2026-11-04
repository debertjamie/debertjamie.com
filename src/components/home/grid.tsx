import type { TFunction } from "i18next";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Suspense } from "react";
import Image from "next/image";
import { ExtendedLink as Link } from "../commons/extendlink";
import { RevealSection } from "../commons/reveal";
import { Globe } from "./globe";
import { RecentPosts } from "./recent-posts";

type T = TFunction<"home", undefined>;

export async function Grid({ t, locale }: { t: T; locale: string }) {
  return (
    <>
      <About t={t} />
      <Index t={t} locale={locale} />
      <Here t={t} />
    </>
  );
}

function About({ t }: { t: T }) {
  return (
    <RevealSection className="grid gap-10 md:grid-cols-12 px-4 sm:px-8 py-20 md:py-28 border-t border-mist-300">
      <div className="md:col-span-3 flex md:flex-col gap-6 items-center">
        <div className="relative size-24 md:size-32 rounded-full overflow-hidden ring-1 ring-mist-300 shrink-0">
          <Image
            src="/avatar.png"
            alt="Debert Jamie"
            fill
            sizes="128px"
            unoptimized
            className="object-cover object-center"
          />
        </div>
        <h2 className="text-base font-medium text-mist-600">{t("grid.about_title")}</h2>
      </div>
      <div className="md:col-span-8 md:col-start-5 flex flex-col gap-8">
        <p className="text-2xl sm:text-3xl lg:text-4xl leading-snug tracking-tight text-mist-800 text-pretty">
          {t("grid.about_desc")}
        </p>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-lg font-medium">
          <TextLink href="/about">{t("grid.links.about")}</TextLink>
          <TextLink href="/now">{t("grid.links.now")}</TextLink>
        </div>
      </div>
    </RevealSection>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="py-2 underline decoration-mist-400 decoration-2 underline-offset-8 transition-colors hover:decoration-accent-text hover:text-mist-900"
    >
      {children}
    </Link>
  );
}

function Index({ t, locale }: { t: T; locale: string }) {
  return (
    <RevealSection className="border-t border-mist-300">
      <Row href="/blog" title={t("grid.links.blog")}>
        <Suspense
          fallback={
            <div className="flex flex-col gap-3" aria-hidden>
              <div className="h-5 w-3/4 rounded bg-mist-200 animate-pulse" />
            </div>
          }
        >
          <RecentPosts t={t} locale={locale} />
        </Suspense>
      </Row>
      <Row href="/projects" title={t("grid.links.projects")}>
        <p>{t("grid.projects_desc")}</p>
      </Row>
      <Row href="/photos" title={t("grid.gallery_title")}>
        <p>{t("grid.gallery_desc")}</p>
      </Row>
    </RevealSection>
  );
}

function Row({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-12 md:items-end px-4 sm:px-8 py-10 md:py-14 border-b border-mist-300">
      <Link
        href={href}
        className="group md:col-span-7 flex items-start gap-3 text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-mist-900 transition-colors hover:text-accent-text"
      >
        <span className="transition-transform duration-300 group-hover:translate-x-2 text-balance">
          {title}
        </span>
        <ArrowUpRight
          className="size-8 sm:size-12 shrink-0 opacity-0 -translate-x-2 transition duration-300 group-hover:opacity-100 group-hover:translate-x-2 group-focus-visible:opacity-100"
          aria-hidden
        />
      </Link>
      <div className="md:col-span-4 md:col-start-9 text-base text-mist-700">{children}</div>
    </div>
  );
}

function Here({ t }: { t: T }) {
  return (
    <RevealSection className="grid gap-3 md:grid-cols-[1.4fr_1fr] px-4 sm:px-8 py-20 md:py-28">
      <div className="rounded-3xl border border-mist-300 bg-mist-100 overflow-hidden">
        <Globe />
      </div>
      <Link
        href="/contact"
        className="group min-h-80 rounded-3xl bg-accent text-accent-ink p-8 flex flex-col justify-between transition-colors duration-300 hover:bg-accent-hover focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-accent-mark"
      >
        <ArrowUpRight
          className="size-12 self-end transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden
        />
        <span className="flex flex-col gap-3">
          <span className="text-4xl sm:text-5xl font-semibold tracking-tight">
            {t("grid.contact_title")}
          </span>
          <span className="text-lg">{t("grid.contact_desc")}</span>
        </span>
      </Link>
    </RevealSection>
  );
}
