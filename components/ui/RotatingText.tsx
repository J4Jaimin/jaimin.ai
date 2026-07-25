"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Rotating text — Animate UI's rotating text, ported. Cycles a list of phrases,
 * animating each one in per-character on a stagger so the word assembles rather
 * than simply fading.
 *
 * The container reserves the width of the longest phrase (rendered invisibly)
 * so surrounding copy never reflows mid-rotation. Reduced-motion users see the
 * first phrase, static.
 */
export default function RotatingText({
  words,
  interval = 2600,
  className,
  itemClassName,
}: {
  words: string[];
  interval?: number;
  className?: string;
  itemClassName?: string;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval
    );
    return () => clearInterval(id);
  }, [words.length, interval, reduce]);

  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b), "");

  if (reduce) {
    return <span className={cn(itemClassName, className)}>{words[0]}</span>;
  }

  return (
    <span className={cn("relative inline-grid overflow-hidden align-bottom", className)}>
      {/* Width reservation — invisible, out of the a11y tree, no layout shift. */}
      <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {longest}
      </span>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          aria-live="polite"
          className={cn(
            "col-start-1 row-start-1 flex whitespace-nowrap",
            itemClassName
          )}
          initial="hidden"
          animate="show"
          exit="exit"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.022 } },
            exit: { transition: { staggerChildren: 0.012, staggerDirection: -1 } },
          }}
        >
          {words[index].split("").map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              className="inline-block"
              variants={{
                hidden: { y: "100%", opacity: 0 },
                show: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                },
                exit: {
                  y: "-100%",
                  opacity: 0,
                  transition: { duration: 0.25, ease: [0.65, 0, 0.35, 1] },
                },
              }}
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
