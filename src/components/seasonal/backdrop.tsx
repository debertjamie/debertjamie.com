"use client";
import { useSyncExternalStore, type ComponentType } from "react";
import dynamic from "next/dynamic";
import { getActiveSeason, type SeasonId } from "@/src/lib/seasons";

// Each effect is its own chunk, loaded only while its season is active.
const effects: Record<SeasonId, ComponentType> = {
  christmas: dynamic(() => import("./snow"), { ssr: false }),
};

const subscribe = () => () => {};
const getSeason = () => getActiveSeason(new Date(), window.location.search);
// The page is statically rendered, so the server can't know today's date: render nothing there.
const getServerSeason = () => null;

export function SeasonalBackdrop() {
  const season = useSyncExternalStore(subscribe, getSeason, getServerSeason);
  if (!season) return null;
  const Effect = effects[season];
  return <Effect />;
}
