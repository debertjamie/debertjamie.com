"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import usePrefersReducedMotion from "@/src/hooks/useReducedMotion";

const noop = () => () => {};

export function DarkModeToggle() {
  // false on the server and during hydration, true once mounted on the client
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const { resolvedTheme, setTheme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();

  const duration = prefersReducedMotion ? 0 : 0.2;

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-md w-9 h-9"
        aria-label="Toggle dark mode"
        aria-hidden="true"
        tabIndex={-1}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-md text-mist-600 hover:text-mist-900 hover:bg-mist-200 transition-colors duration-200"
      aria-label="Toggle dark mode"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
            transition={{ duration }}
          >
            <Sun size={20} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
            transition={{ duration }}
          >
            <Moon size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
