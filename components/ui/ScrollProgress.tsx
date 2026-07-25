"use client";

import { motion } from "framer-motion";
import { useLenis } from "@/components/providers/SmoothScroll";

/**
 * Reading-progress bar, driven straight off Lenis' own `progress` value rather
 * than a second scroll listener — so the bar advances in lockstep with the
 * smoothed viewport, not the raw one. Falls back to native scroll position when
 * Lenis is off (reduced motion).
 */
export default function ScrollProgress() {
  const { progress } = useLenis();

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: progress }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent-blue via-accent-indigo to-accent-purple shadow-[0_0_12px_rgba(124,134,255,0.6)]"
    />
  );
}
