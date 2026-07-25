"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Spotlight card — Inspira UI's "card spotlight", ported. Two pointer-tracked
 * radial gradients: one lights the border ring, one washes the surface. Both
 * fade in on hover, so an idle grid stays calm.
 *
 * Wraps its children in a bordered surface; pass `className` to control radius
 * and padding. Pointer tracking is skipped on coarse pointers (touch) since
 * there's no hover state to speak of.
 */
export default function SpotlightCard({
  children,
  className,
  radius = 380,
  /** Border highlight colour. */
  from = "rgba(124,134,255,0.55)",
  /** Surface wash colour. */
  wash = "rgba(124,134,255,0.09)",
  /**
   * Clip children to the card. Turn off when the card holds magnetic controls
   * that need to drift past the padding.
   */
  clip = true,
}: {
  children: ReactNode;
  className?: string;
  radius?: number;
  from?: string;
  wash?: string;
  clip?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);

  const border = useMotionTemplate`radial-gradient(${radius}px circle at ${mx}px ${my}px, ${from}, transparent 70%)`;
  const surface = useMotionTemplate`radial-gradient(${radius}px circle at ${mx}px ${my}px, ${wash}, transparent 65%)`;

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };
  const onLeave = () => {
    mx.set(-9999);
    my.set(-9999);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        // No backdrop-blur here on purpose: these cards scroll *with* the
        // backdrop, so a blur costs a full re-composite every frame and buys
        // nothing you can see. A slightly more opaque fill reads identically.
        // `contain` keeps each card's layout/paint work to itself.
        "group/spot relative h-full rounded-3xl border border-white/[0.08] bg-white/[0.03] transition-colors duration-500 [contain:layout_paint_style]",
        clip && "overflow-hidden",
        className
      )}
    >
      {/* Border ring — masked to a 1px inset frame. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100 [border:1px_solid_transparent] ![mask-composite:xor] [mask:linear-gradient(#000_0_0)_padding-box,linear-gradient(#000_0_0)]"
        style={{ background: border }}
      />
      {/* Surface wash. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: surface }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
