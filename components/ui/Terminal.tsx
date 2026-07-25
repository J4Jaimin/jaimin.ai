"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type TerminalLine =
  | { type: "command"; text: string }
  | { type: "output"; text: string; tone?: "muted" | "ok" | "accent" }
  | { type: "blank" };

const tones = {
  muted: "text-[var(--faint)]",
  ok: "text-emerald-400/90",
  accent: "text-accent-blue/90",
} as const;

/**
 * Animated terminal — the Animate UI / Magic UI terminal, ported. Commands type
 * out character by character; their output appears as a block once the command
 * lands. Plays once when it scrolls into view.
 *
 * Reduced-motion users get the finished transcript immediately.
 */
export default function Terminal({
  lines,
  className,
  title = "jaimin@api ~ zsh",
  typeSpeed = 26,
  outputDelay = 260,
}: {
  lines: TerminalLine[];
  className?: string;
  title?: string;
  typeSpeed?: number;
  outputDelay?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  // How many lines are revealed, and how much of the line being typed.
  const [revealed, setRevealed] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (reduce) {
      setRevealed(lines.length);
      return;
    }
    if (!inView || revealed >= lines.length) return;

    const line = lines[revealed];

    // Output and blanks aren't typed — they land as a unit after a beat.
    if (line.type !== "command") {
      const id = setTimeout(() => setRevealed((r) => r + 1), outputDelay);
      return () => clearTimeout(id);
    }

    let i = 0;
    setTyped("");
    const id = setInterval(() => {
      i += 1;
      setTyped(line.text.slice(0, i));
      if (i >= line.text.length) {
        clearInterval(id);
        setTimeout(() => setRevealed((r) => r + 1), outputDelay);
      }
    }, typeSpeed);

    return () => clearInterval(id);
  }, [inView, revealed, lines, typeSpeed, outputDelay, reduce]);

  const done = revealed >= lines.length;

  return (
    <div
      ref={ref}
      className={cn(
        // Opaque rather than blurred — see the note in SpotlightCard.
        "overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900 shadow-lift [contain:layout_paint_style]",
        className
      )}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-2 truncate font-mono text-[0.68rem] text-[var(--faint)]">
          {title}
        </span>
      </div>

      <div className="min-h-[15rem] space-y-1.5 overflow-x-auto p-4 font-mono text-[0.78rem] leading-relaxed sm:p-5">
        {lines.slice(0, revealed).map((line, i) => (
          <Row key={i} line={line} />
        ))}

        {/* The line currently being typed. */}
        {!done && lines[revealed]?.type === "command" && (
          <p className="flex gap-2 whitespace-pre">
            <span className="shrink-0 text-accent-purple/90">❯</span>
            <span className="text-white/90">
              {typed}
              <Caret />
            </span>
          </p>
        )}

        {done && !reduce && (
          <p className="flex gap-2">
            <span className="shrink-0 text-accent-purple/90">❯</span>
            <Caret />
          </p>
        )}
      </div>
    </div>
  );
}

function Row({ line }: { line: TerminalLine }) {
  if (line.type === "blank") return <p className="h-2" />;

  if (line.type === "command") {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex gap-2 whitespace-pre"
      >
        <span className="shrink-0 text-accent-purple/90">❯</span>
        <span className="text-white/90">{line.text}</span>
      </motion.p>
    );
  }

  return (
    <motion.p
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn("whitespace-pre", tones[line.tone ?? "muted"])}
    >
      {line.text}
    </motion.p>
  );
}

function Caret() {
  return (
    <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-[2px] animate-[caret-blink_1.05s_steps(1)_infinite] bg-accent-blue/80" />
  );
}
