"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#";

/**
 * Scramble text — the decode/"hyper text" effect from Inspira UI & Animate UI.
 * Characters resolve left-to-right out of a churn of random glyphs.
 *
 * `trigger="view"` decodes once on scroll-in; `trigger="hover"` re-runs on
 * every pointer-enter (nice on nav links and card titles). Spaces are never
 * scrambled, so word shape — and therefore layout — stays put.
 */
export default function ScrambleText({
  text,
  className,
  trigger = "view",
  /** Stagger between characters locking in; 1 ≈ one frame's worth. */
  speed = 1.4,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  trigger?: "view" | "hover" | "mount";
  speed?: number;
  as?: "span" | "h2" | "h3" | "p";
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [output, setOutput] = useState(text);
  const rafRef = useRef(0);

  const run = useCallback(() => {
    if (reduce) return;
    cancelAnimationFrame(rafRef.current);

    // Each character locks at its own moment, in ms from the start. Driving
    // this off elapsed time rather than a frame counter keeps the effect the
    // same length on a 120Hz laptop and a struggling phone alike.
    const step = speed * 16;
    const queue = text.split("").map((char, i) => ({
      char,
      lockAt: i * step + Math.random() * 300 + 130,
    }));
    const total = queue.filter((q) => q.char !== " ").length;
    const startedAt = performance.now();

    const tick = () => {
      const elapsed = performance.now() - startedAt;
      let done = 0;
      const next = queue
        .map(({ char, lockAt }) => {
          if (char === " ") return " ";
          if (elapsed >= lockAt) {
            done++;
            return char;
          }
          // Unresolved characters churn, rather than rendering empty — the
          // string keeps its exact length, so nothing around it reflows.
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setOutput(next);
      if (done === total) return;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [text, speed, reduce]);

  useEffect(() => {
    if (reduce) {
      setOutput(text);
      return;
    }
    if (trigger === "mount" || (trigger === "view" && inView)) run();
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, inView, run, reduce, text]);

  return (
    <Tag
      ref={ref as never}
      onPointerEnter={trigger === "hover" ? run : undefined}
      className={cn(className)}
    >
      {/* Real text for screen readers & SEO; the scramble is purely visual. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden className="relative inline-block">
        {/* An invisible copy holds the exact final width, so proportional
            glyphs churning underneath can't nudge the layout around. */}
        <span className="invisible">{text}</span>
        <span className="absolute inset-0 whitespace-pre">{output}</span>
      </span>
    </Tag>
  );
}
