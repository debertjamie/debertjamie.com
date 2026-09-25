"use client";
import { motion, type HTMLMotionProps } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/useReducedMotion";

const revealProps = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export function Reveal(props: HTMLMotionProps<"div">) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      {...revealProps}
      {...(prefersReducedMotion && {
        initial: false,
        transition: { duration: 0 },
      })}
      {...props}
    />
  );
}

export function RevealSection(props: HTMLMotionProps<"section">) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.section
      {...revealProps}
      {...(prefersReducedMotion && {
        initial: false,
        transition: { duration: 0 },
      })}
      {...props}
    />
  );
}