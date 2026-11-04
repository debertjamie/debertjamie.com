import type { ReactNode } from "react";

// Shared layout for the 404 and error pages: a big code, a title, one line of
// explanation, and the actions that get the visitor moving again.
export function StatusPage({
  code,
  title,
  description,
  children,
}: {
  code: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="flex flex-col justify-center gap-6 px-4 sm:px-8 py-24 md:py-32">
      <p className="text-[clamp(5rem,20vw,14rem)] font-semibold tracking-tighter leading-none text-mist-300" aria-hidden>
        {code}
      </p>
      <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-balance">{title}</h1>
      <p className="text-xl sm:text-2xl text-mist-700 max-w-2xl text-pretty">{description}</p>
      <div className="flex flex-wrap items-center gap-6 pt-2">{children}</div>
    </main>
  );
}

export const primaryButton =
  "rounded-full bg-mist-900 text-mist-50 px-7 py-3 text-base font-semibold transition-colors hover:bg-accent hover:text-accent-ink active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-mark";
