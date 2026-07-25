"use client";

import { cn } from "@/lib/utils";

/**
 * Border beam — a light travels once around the element's border, forever.
 * Ported from Inspira UI / Magic UI, implemented with an `offset-path` so the
 * beam follows any border radius exactly instead of faking it with a conic
 * gradient.
 *
 * The parent must be `relative` and should have a border radius; the beam
 * inherits it. Set `reverse` for a counter-clockwise run, `delay` to
 * desynchronise a grid of cards.
 */
export default function BorderBeam({
  size = 180,
  duration = 8,
  delay = 0,
  reverse = false,
  className,
  colorFrom = "rgb(110 168 254)",
  colorTo = "rgb(167 139 250)",
}: {
  size?: number;
  duration?: number;
  delay?: number;
  reverse?: boolean;
  className?: string;
  colorFrom?: string;
  colorTo?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        // The mask carves a 1px ring out of the box, so the beam only ever
        // shows on the border itself.
        "[border:1px_solid_transparent] ![mask-composite:xor]",
        "[mask:linear-gradient(#000_0_0)_padding-box,linear-gradient(#000_0_0)]",
        className
      )}
    >
      <div
        className="border-beam absolute aspect-square bg-gradient-to-l from-[var(--beam-from)] via-[var(--beam-to)] to-transparent motion-reduce:hidden"
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            animationDirection: reverse ? "reverse" : "normal",
            "--beam-from": colorFrom,
            "--beam-to": colorTo,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
