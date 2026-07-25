"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { Award } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import BorderBeam from "@/components/ui/BorderBeam";
import { experiences, recognition } from "@/lib/data";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Experience() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="section scroll-mt-20">
      <div className="container-px">
        <SectionHeading
          eyebrow="Journey"
          title={
            <>
              Experience &amp;
              <br />
              <span className="text-gradient-soft">the road here.</span>
            </>
          }
        />

        <div ref={ref} className="relative mt-16 pl-10 sm:pl-14">
          {/* track */}
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-white/[0.08]" />
          {/* animated fill */}
          <motion.div
            style={{ scaleY: reduce ? 1 : lineScale }}
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-accent-blue via-accent-indigo to-accent-purple/40"
          />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${exp.role}`}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                transition={{ duration: 0.7, ease, delay: 0.04 * i }}
                className="relative"
              >
                {/* marker */}
                <div className="absolute -left-[calc(2.5rem-1px)] top-1.5 sm:-left-[calc(3.5rem-1px)]">
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    {exp.current && !reduce && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-blue/50" />
                    )}
                    <span
                      className={cn(
                        "relative h-4 w-4 rounded-full border-2 border-ink-950",
                        exp.current
                          ? "bg-accent-blue shadow-[0_0_16px_2px_rgba(110,168,254,0.6)]"
                          : "bg-white/25"
                      )}
                    />
                  </span>
                </div>

                <SpotlightCard
                  radius={480}
                  className="group rounded-3xl p-6 hover:border-white/[0.14] sm:p-7"
                >
                  {/* The current role gets a permanent beam — a quiet "live" tell */}
                  {exp.current && <BorderBeam size={220} duration={10} />}
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-medium tracking-tight text-white">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-xs text-[var(--faint)]">
                      {exp.period}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-accent-blue/90">
                    {exp.company}
                    {exp.location ? (
                      <span className="text-[var(--faint)]"> · {exp.location}</span>
                    ) : null}
                  </p>

                  <p className="mt-4 text-pretty text-sm leading-relaxed text-[var(--muted)]">
                    {exp.description}
                  </p>

                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {exp.achievements.map((a) => (
                      <li
                        key={a}
                        className="flex items-start gap-2.5 text-[0.82rem] leading-snug text-[var(--muted)]"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-indigo/80" />
                        {a}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/[0.07] bg-white/[0.02] px-2 py-1 font-mono text-[0.68rem] text-[var(--faint)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recognition */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease }}
          className="mt-14 grid gap-4 sm:grid-cols-3"
        >
          {recognition.map((r) => (
            <div
              key={r.title}
              className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5"
            >
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                <Award className="h-4 w-4 text-accent-purple/90" strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-sm font-medium text-white">{r.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--faint)]">
                  {r.detail}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
