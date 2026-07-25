"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Sparkle = {
  id: string;
  x: string;
  y: string;
  size: number;
  delay: number;
  duration: number;
};

const newSparkle = (): Sparkle => ({
  id: `${Date.now()}-${Math.random()}`,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: Math.random() * 8 + 6,
  delay: Math.random() * 0.4,
  duration: Math.random() * 0.8 + 1,
});

/**
 * Sparkles text — Inspira UI's sparkle effect, ported. Four-point stars pop in
 * and out at random points over the wrapped text, each on its own cycle, so the
 * shimmer never looks looped.
 *
 * Sparkles are decorative and `aria-hidden`; the text itself is untouched.
 */
export default function SparklesText({
  children,
  className,
  count = 8,
  colors = ["#6ea8fe", "#a78bfa", "#ffffff"],
}: {
  children: ReactNode;
  className?: string;
  count?: number;
  colors?: string[];
}) {
  const reduce = useReducedMotion();
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    if (reduce) return;
    setSparkles(Array.from({ length: count }, newSparkle));

    // Recycle one sparkle at a time — cheaper and more organic than swapping
    // the whole set on an interval.
    const id = setInterval(() => {
      setSparkles((prev) => {
        if (prev.length === 0) return prev;
        const next = prev.slice(1);
        next.push(newSparkle());
        return next;
      });
    }, 500);

    return () => clearInterval(id);
  }, [count, reduce]);

  return (
    <span className={cn("relative inline-block", className)}>
      <span aria-hidden className="pointer-events-none absolute inset-0 block">
        <AnimatePresence>
          {sparkles.map((s, i) => (
            <motion.svg
              key={s.id}
              className="absolute z-10"
              style={{ left: s.x, top: s.y, width: s.size, height: s.size }}
              viewBox="0 0 21 21"
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: 120 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: s.duration,
                delay: s.delay,
                ease: "easeInOut",
              }}
            >
              <path
                d="M10.5 0L13 8L21 10.5L13 13L10.5 21L8 13L0 10.5L8 8L10.5 0Z"
                fill={colors[i % colors.length]}
              />
            </motion.svg>
          ))}
        </AnimatePresence>
      </span>
      <span className="relative z-10">{children}</span>
    </span>
  );
}
