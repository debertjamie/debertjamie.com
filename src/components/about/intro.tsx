import type { TFunction } from "i18next";
import type { ReactNode } from "react";
import { StackImage } from "../commons/stackimage";
import { ExtendedLink as Link } from "../commons/extendlink";

const linkClass =
  "py-2 underline decoration-mist-400 decoration-2 underline-offset-8 transition-colors hover:decoration-accent-text hover:text-mist-900";

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}

export function Intro({ t }: { t: TFunction<"about", undefined> }) {
  return (
    <section className="grid gap-16 md:grid-cols-12 md:items-center px-4 sm:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="md:col-span-7 flex flex-col gap-8">
        <h1 className="flex flex-col gap-4 break-keep">
          <span className="flex flex-col gap-1 text-xl sm:text-2xl font-medium text-mist-600">
            <span>Ta̍k-ke-hó, tsin huann-hí kah lí si̍k-sāi!</span>
            <span className="tracking-[0.25em]">大家好，真歡喜佮你熟似！</span>
          </span>
          <span className="text-[clamp(2.75rem,8vw,7rem)] font-semibold tracking-tighter leading-[0.95] text-balance">
            {t("header.title")}
          </span>
        </h1>
        <p className="text-xl sm:text-2xl leading-snug text-mist-700 text-pretty max-w-2xl">
          {t("header.description")}
        </p>
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-lg font-medium">
          <TextLink href="/now">{t("links.now")}</TextLink>
          <TextLink href="/projects">{t("links.projects")}</TextLink>
          <a
            href="/CV_Debert_Jamie_Chanderson.pdf"
            target="_blank"
            rel="noopener"
            className={linkClass}
          >
            {t("links.cv")} (PDF)
          </a>
        </div>
      </div>

      {/* Two printed photos you can push around, like on a desk. */}
      <div className="md:col-span-5 flex justify-center">
        <div className="relative w-62.5 h-100">
          <StackImage
            src="/images/debert_5-640.webp"
            alt="Me in University of Indonesia"
            initialRotation={-6}
            initialX={-20}
            initialY={0}
            baseZIndex={1}
            width={250}
            height={333}
            loading="eager"
            className="left-0 top-0"
          />
          <StackImage
            src="/images/debert_4-640.webp"
            alt="Watching the sunrise"
            initialRotation={5}
            initialX={30}
            initialY={60}
            baseZIndex={2}
            width={250}
            height={333}
            loading="eager"
            className="left-0 top-0"
          />
        </div>
      </div>
    </section>
  );
}
