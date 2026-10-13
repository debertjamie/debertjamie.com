"use client";

import { useState } from "react";
import type { ReactNode } from "react";

// Click/tap to reveal (works on touch devices where :hover does not), and still
// reveals on hover for pointer devices. Once revealed it stays revealed.
export function Spoiler({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={revealed ? undefined : "Reveal spoiler"}
      aria-expanded={revealed}
      onClick={() => setRevealed(true)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setRevealed(true);
        }
      }}
      className={
        revealed
          ? "transition-all duration-200"
          : "bg-mist-700 blur-md hover:bg-transparent hover:blur-none transition-all duration-200 select-none cursor-pointer"
      }
    >
      {children}
    </span>
  );
}
