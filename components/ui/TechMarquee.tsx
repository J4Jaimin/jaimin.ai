"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  useReducedMotion,
  wrap,
} from "framer-motion";
import { useLenis } from "@/components/providers/SmoothScroll";

const tech = [
  "Generative AI",
  "Agentic AI",
  "LangChain",
  "LangGraph",
  "MCP",
  "RAG",
  "LLMs",
  "Fine-tuning",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "Redis",
  "Docker",
  "AWS",
  "Python",
  "Prefect",
  "TypeScript",
  "REST APIs",
  "CI/CD",
];

/**
 * A seamless marquee of the core stack that *reacts to how you scroll*: Lenis'
 * smoothed velocity speeds the belt up, flips its direction when you scroll
 * back, and shears the type slightly — the classic Lenis/GSAP "velocity skew".
 *
 * The belt renders the list twice and wraps at -50%, so the loop is invisible.
 * Reduced-motion users get a static, legible row.
 */
export default function TechMarquee() {
  const reduce = useReducedMotion();
  const { velocity } = useLenis();

  const baseX = useMotionValue(0);
  const directionRef = useRef(1);

  // -50% of the doubled track = exactly one full copy of the list.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  // A touch of shear in the direction of travel, capped so it stays tasteful.
  const skewX = useTransform(velocity, [-1, 0, 1], [6, 0, -6]);

  useAnimationFrame((_, delta) => {
    if (reduce) return;

    const v = velocity.get();
    // Scrolling back flips the belt — a small detail people feel more than see.
    if (v < -0.02) directionRef.current = -1;
    else if (v > 0.02) directionRef.current = 1;

    // Baseline crawl (%/s) plus a velocity-proportional boost.
    const speed = 2.6 + Math.abs(v) * 26;
    baseX.set(baseX.get() + directionRef.current * speed * (delta / 1000));
  });

  return (
    <div
      className="relative flex overflow-hidden border-y border-white/5 py-6"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <motion.div
        style={reduce ? undefined : { x, skewX }}
        className="flex shrink-0 items-center gap-10 pr-10 will-change-transform"
      >
        {tech.concat(tech).map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-mono text-sm uppercase tracking-[0.15em] text-white/35 transition-colors duration-300 hover:text-white/70">
              {t}
            </span>
            <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
