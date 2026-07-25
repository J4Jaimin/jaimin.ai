"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useReducedMotion,
  type AnimationPlaybackControls,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Splits a display value like "2.5+", "30%", "500k+" into the parts we can
 * animate and the parts we must keep verbatim. Anything without a number
 * (e.g. "—") falls through with `value: null` and renders as-is.
 */
function parse(display: string) {
  const match = display.match(/^([^\d.-]*)(-?[\d,]*\.?\d+)(.*)$/);
  if (!match) return { prefix: "", value: null, suffix: display, decimals: 0 };
  const [, prefix, raw, suffix] = match;
  const clean = raw.replace(/,/g, "");
  const decimals = clean.includes(".") ? clean.split(".")[1].length : 0;
  const grouped = raw.includes(",");
  return { prefix, value: Number(clean), suffix, decimals, grouped };
}

/**
 * Counting number — Animate UI's counter, ported. Counts from 0 to the target
 * when it first scrolls into view, on a decelerating curve so it settles rather
 * than stops dead. Preserves whatever prefix/suffix the source string carries
 * ("+", "%", "k"), and holds a tabular width so the layout can't jitter.
 *
 * Reduced-motion users get the final value immediately.
 */
export default function CountingNumber({
  value: display,
  duration = 1.8,
  delay = 0,
  className,
}: {
  value: string;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const { prefix, value, suffix, decimals, grouped } = parse(display);
  const [current, setCurrent] = useState(value === null || reduce ? value : 0);

  useEffect(() => {
    if (value === null || reduce || !inView) return;

    let controls: AnimationPlaybackControls | undefined;
    const timer = setTimeout(() => {
      controls = animate(0, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setCurrent(v),
      });
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      controls?.stop();
    };
  }, [inView, value, duration, delay, reduce]);

  const text =
    current === null
      ? ""
      : grouped
        ? current.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : current.toFixed(decimals);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {value === null ? (
        suffix
      ) : (
        <>
          {prefix}
          {text}
          {suffix}
        </>
      )}
    </span>
  );
}
