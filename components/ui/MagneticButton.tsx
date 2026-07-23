"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
  strength?: number;
};

type AnchorProps = BaseProps & {
  href: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  onClick?: never;
  type?: never;
};

type ButtonProps = BaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

const styles: Record<Variant, string> = {
  primary:
    "bg-white text-ink-950 shadow-[0_10px_40px_-12px_rgba(255,255,255,0.35)] hover:shadow-[0_16px_50px_-12px_rgba(124,134,255,0.55)]",
  secondary: "glass text-white hover:border-white/25 hover:bg-white/[0.06]",
  ghost: "text-[var(--muted)] hover:text-white",
};

/**
 * Magnetic CTA — the whole control eases toward the cursor while the label and
 * icon drift a touch further for depth. Renders an <a> when `href` is present,
 * otherwise a <button>. Magnetism is disabled for reduced-motion users.
 */
export default function MagneticButton(props: AnchorProps | ButtonProps) {
  const { children, variant = "primary", className, icon, strength = 0.4 } = props;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  // Outer moves with the cursor; inner content uses a softer spring for depth.
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.5 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.5 });
  const ix = useSpring(mx, { stiffness: 200, damping: 15 });
  const iy = useSpring(my, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const cls = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-colors duration-300 will-change-transform",
    styles[variant],
    className
  );

  const inner = (
    <>
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute -inset-x-2 -top-px h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <motion.span
        className="relative z-10 flex items-center gap-2"
        style={reduce ? undefined : { x: ix, y: iy }}
      >
        {children}
        {icon}
      </motion.span>
    </>
  );

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className="inline-flex will-change-transform"
    >
      {"href" in props && props.href !== undefined ? (
        <a
          href={props.href}
          download={props.download}
          target={props.target}
          rel={props.rel}
          className={cls}
        >
          {inner}
        </a>
      ) : (
        <button
          type={(props as ButtonProps).type ?? "button"}
          onClick={(props as ButtonProps).onClick}
          className={cls}
        >
          {inner}
        </button>
      )}
    </motion.div>
  );
}
