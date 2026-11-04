"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useSyncExternalStore, type ComponentProps } from "react";

const noop = () => () => {};

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  // next-themes renders an inline <script> that prevents a theme flash on first
  // load. Switching language remounts the [lang] layout, so React creates that
  // script on the client and warns ("Encountered a script tag..."). The script
  // already ran on the server-rendered page, so client-created copies are
  // marked as a data block, which React does not warn about. False during SSR
  // and hydration, so the hydrated markup still matches the server.
  const isClientRender = useSyncExternalStore(noop, () => true, () => false);

  return (
    <NextThemesProvider
      {...props}
      scriptProps={isClientRender ? { type: "application/json" } : undefined}
    >
      {children}
    </NextThemesProvider>
  );
}
