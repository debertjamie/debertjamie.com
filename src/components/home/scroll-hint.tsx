"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import usePrefersReducedMotion from "@/src/hooks/useReducedMotion";

export function ScrollHint({ label }: { label: string }) {
  const [visible, setVisible] = useState(true);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="scroll-hint"
          initial={{ opacity: 0, y: -6 }}
          animate={
            reduced
              ? { opacity: 1, y: 0 }
              : {
                  opacity: [0, 1, 1, 0],
                  y: [0, 6, 0, 0],
                  transition: {
                    duration: 2,
                    repeat: 1,
                    ease: "easeInOut",
                  },
                }
          }
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          aria-label={label}
          className="flex flex-col items-center gap-1 text-mist-400 dark:text-mist-500"
        >
          <ChevronDown className="w-5 h-5" aria-hidden />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
