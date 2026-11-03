"use client";
import { useEffect, useState } from "react";

// Renders the current time in Asia/Jakarta, updated every second.
// Kept as a tiny client component so the parent Hero can stay lean.
export function LiveClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Render a fixed-width placeholder during SSR / before mount
  if (!time) {
    return (
      <span className="inline-block w-16 h-4 rounded bg-mist-300 animate-pulse" />
    );
  }

  return <span suppressHydrationWarning>{time}</span>;
}
