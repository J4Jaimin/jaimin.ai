"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Meteor = {
  id: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
};

/**
 * Meteor shower — a React port of Inspira UI's meteor effect. Thin streaks fall
 * on a diagonal at staggered intervals, each with a tapering tail. Pure CSS
 * animation once mounted; nothing runs for reduced-motion users.
 *
 * Drop inside any `relative overflow-hidden` container.
 */
export default function Meteors({
  number = 14,
  className,
}: {
  number?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  // Seeded on the client only — random values during SSR would not match the
  // markup React renders on hydration.
  useEffect(() => {
    setMeteors(
      Array.from({ length: number }, (_, i) => ({
        id: i,
        left: `${Math.random() * 120 - 10}%`,
        top: `${Math.random() * 40 - 20}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${Math.random() * 4 + 4}s`,
      }))
    );
  }, [number]);

  if (reduce) return null;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {meteors.map((m) => (
        <span
          key={m.id}
          className="meteor absolute h-0.5 w-0.5 rounded-full bg-white/80 shadow-[0_0_8px_2px_rgba(124,134,255,0.35)]"
          style={{
            left: m.left,
            top: m.top,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        />
      ))}
    </div>
  );
}
