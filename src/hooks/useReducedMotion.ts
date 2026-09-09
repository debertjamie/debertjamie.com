"use client";
import { useEffect, useState } from "react";

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export default function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia?.(REDUCED_MOTION_QUERY);
    if (!media) return;

    const sync = () => setPrefersReduced(media.matches);

    sync();
    media.addEventListener?.("change", sync);

    return () => media.removeEventListener?.("change", sync);
  }, []);

  return prefersReduced;
}
