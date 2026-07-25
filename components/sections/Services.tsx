"use client";

import { motion, useReducedMotion } from "framer-motion";
import TiltCard from "@/components/ui/TiltCard";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import BorderBeam from "@/components/ui/BorderBeam";
import ScrambleText from "@/components/ui/ScrambleText";
import Reveal from "@/components/ui/Reveal";
import Terminal, { type TerminalLine } from "@/components/ui/Terminal";
import { services } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The transcript for the terminal band. Deliberately a `cat` of the stack
 * rather than a live benchmark — it presents what's already stated elsewhere
 * on the page, not new numbers.
 */
const transcript: TerminalLine[] = [
  { type: "command", text: "whoami" },
  { type: "output", text: "jaimin — ai full-stack developer", tone: "accent" },
  { type: "blank" },
  { type: "command", text: "cat stack.json" },
  { type: "output", text: "{" },
  { type: "output", text: '  "ai":       ["LangChain", "LangGraph", "MCP", "RAG"],' },
  { type: "output", text: '  "runtime":  ["Node.js", "Express", "Python"],' },
  { type: "output", text: '  "data":     ["MongoDB", "MySQL", "Redis"],' },
  { type: "output", text: '  "platform": ["Docker", "AWS", "CI/CD"]' },
  { type: "output", text: "}" },
  { type: "blank" },
  { type: "command", text: "./ship --with care" },
  { type: "output", text: "✓ clean architecture", tone: "ok" },
  { type: "output", text: "✓ tight latency budgets", tone: "ok" },
  { type: "output", text: "✓ code that reads as well as it runs", tone: "ok" },
];

export default function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="section scroll-mt-20">
      <div className="container-px">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Capabilities"
            title={
              <>
                What I engineer,
                <br />
                <span className="text-gradient-soft">end to end.</span>
              </>
            }
          />
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-[var(--muted)] md:mb-3 md:text-right">
            A focused toolkit built around one thing — backends that are fast,
            observable, and a pleasure to maintain.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={{
                  hidden: reduce
                    ? { opacity: 0 }
                    : { opacity: 0, y: 26, filter: "blur(8px)" },
                  show: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.7, ease },
                  },
                }}
              >
                <TiltCard className="rounded-3xl">
                  <SpotlightCard className="group flex flex-col p-7 hover:border-white/[0.16]">
                    {/* a light laps the border while you're on the card */}
                    <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <BorderBeam size={140} duration={5} delay={i * 0.4} />
                    </span>

                    {/* index */}
                    <span className="absolute right-6 top-6 font-mono text-xs text-white/15 transition-colors duration-500 group-hover:text-white/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* icon */}
                    <div className="relative mb-6 w-fit">
                      <div className="absolute inset-0 -z-10 rounded-2xl bg-accent-indigo/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] transition-all duration-500 group-hover:border-white/20">
                        <Icon
                          className="h-[1.35rem] w-[1.35rem] text-white/70 transition-all duration-500 group-hover:scale-110 group-hover:text-white"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    <ScrambleText
                      as="h3"
                      text={service.title}
                      trigger="hover"
                      className="text-lg font-medium tracking-tight text-white"
                    />
                    <p className="mt-2.5 text-pretty text-sm leading-relaxed text-[var(--muted)]">
                      {service.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2 pt-1">
                      {service.points.map((p) => (
                        <span
                          key={p}
                          className="rounded-full border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 font-mono text-[0.68rem] text-[var(--faint)] transition-colors duration-500 group-hover:text-[var(--muted)]"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ------------------------------------------------- terminal band */}
        <div className="mt-20 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow">How it ships</span>
            <h3 className="mt-5 text-balance text-3xl font-semibold tracking-tighter text-white sm:text-4xl">
              Built in the terminal,
              <br />
              <span className="text-gradient-soft">shipped with care.</span>
            </h3>
            <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-[var(--muted)]">
              Every system starts the same way — a clear contract, a tight
              feedback loop, and enough observability to know it&rsquo;s working
              before anyone has to ask.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              <BorderBeam size={160} duration={11} />
              <Terminal lines={transcript} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
