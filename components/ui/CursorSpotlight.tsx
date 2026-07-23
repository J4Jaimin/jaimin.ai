"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Two-part cursor treatment (desktop, fine-pointer only):
 *  1. A soft radial spotlight painted behind the whole page, driven by CSS vars.
 *  2. A gentle trailing ring that eases toward the cursor and grows over links.
 * Native cursor stays visible; this only adds atmosphere.
 */
export default function CursorSpotlight() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const x = useSpring(ringX, { stiffness: 320, damping: 30, mass: 0.4 });
  const y = useSpring(ringY, { stiffness: 320, damping: 30, mass: 0.4 });
  const raf = useRef<number | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const root = document.documentElement;

    const onMove = (e: PointerEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        root.style.setProperty("--mx", `${pos.current.x}px`);
        root.style.setProperty("--my", `${pos.current.y}px`);
        raf.current = null;
      });
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      setHovering(Boolean(t?.closest?.("a, button, [data-cursor='hover']")));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [ringX, ringY]);

  if (!enabled) return null;

  return (
    <>
      {/* Page-wide spotlight */}
      <div className="cursor-glow pointer-events-none fixed inset-0 z-30" aria-hidden />
      {/* Trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden md:block"
        style={{ x, y }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25"
          animate={{
            width: hovering ? 46 : 26,
            height: hovering ? 46 : 26,
            opacity: hovering ? 0.9 : 0.5,
            backgroundColor: hovering
              ? "rgba(124,134,255,0.10)"
              : "rgba(124,134,255,0)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        />
      </motion.div>
    </>
  );
}
