import type { ReactNode } from "react";

// Shared header for content pages: the same big type as the
// home and about pages, so every page opens the same way.
export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-6 px-4 sm:px-8 pt-16 pb-12 md:pt-24 md:pb-16">
      <h1 className="text-[clamp(3rem,10vw,8rem)] font-semibold tracking-tighter leading-[0.95] text-balance break-keep">
        {title}
      </h1>
      <p className="text-xl sm:text-2xl leading-snug text-mist-700 text-pretty max-w-3xl">
        {description}
      </p>
      {children}
    </header>
  );
}
