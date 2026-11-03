"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import usePrefersReducedMotion from "@/src/hooks/useReducedMotion";

export function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const duration = prefersReducedMotion ? 0 : 0.2;

  // Render a same-size placeholder while hydrating to avoid SSR mismatch
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

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-md text-mist-600 hover:text-mist-900 hover:bg-mist-100 dark:hover:bg-mist-800 transition-colors duration-200"
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
