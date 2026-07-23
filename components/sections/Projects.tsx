"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, Lock } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import { projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

// Per-card accent so covers feel distinct but stay in-palette.
const covers = [
  "from-accent-blue/25 via-accent-indigo/10",
  "from-accent-purple/25 via-accent-indigo/10",
  "from-accent-cyan/20 via-accent-blue/10",
  "from-accent-indigo/25 via-accent-purple/10",
  "from-accent-blue/20 via-accent-cyan/10",
  "from-accent-purple/20 via-accent-blue/10",
];

/** Two-letter logo mark — camelCase/hyphen aware, never a lone letter. */
function monogram(name: string) {
  const words = name
    .replace(/[^a-zA-Z]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const letters = words.map((w) => w[0]).join("");
  if (letters.length >= 2) return letters.slice(0, 2).toUpperCase();
  return (words[0] ?? name).slice(0, 2).toUpperCase();
}

function Cover({ project, index }: { project: Project; index: number }) {
  const initials = monogram(project.name);

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.06]">
      {/* gradient wash */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br to-transparent",
          covers[index % covers.length]
        )}
      />
      {/* dotted texture */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 30% 20%, #000, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 30% 20%, #000, transparent 75%)",
        }}
      />
      {/* soft glow that grows on hover */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-white/[0.14]" />

      {/* window chrome hint */}
      <div className="absolute left-5 top-5 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
      </div>

      {/* monogram */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="bg-gradient-to-b from-white/90 to-white/30 bg-clip-text text-7xl font-semibold tracking-tighter text-transparent transition-transform duration-700 group-hover:scale-105">
          {initials}
        </span>
      </div>

      {/* category + period footer */}
      <div className="absolute inset-x-5 bottom-4 flex items-center justify-between">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/60">
          {project.category}
        </span>
        <span className="font-mono text-[0.68rem] text-white/40">
          {project.period}
        </span>
      </div>
    </div>
  );
}

export default function Projects() {
  const reduce = useReducedMotion();

  return (
    <section id="work" className="section scroll-mt-20">
      <div className="container-px">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Selected Work"
            title={
              <>
                Systems I&rsquo;ve
                <br />
                <span className="text-gradient-soft">designed &amp; shipped.</span>
              </>
            }
          />
          <a
            href="https://github.com/J4Jaimin?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-white md:mb-3"
          >
            View all on GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-6% 0px -6% 0px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {projects.map((project, i) => (
            <motion.article
              key={project.name}
              variants={{
                hidden: reduce
                  ? { opacity: 0 }
                  : { opacity: 0, y: 30, filter: "blur(10px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.75, ease },
                },
              }}
              className={cn(project.featured && "lg:col-span-1")}
            >
              <TiltCard max={4} className="h-full rounded-[1.75rem]">
                <div className="group flex h-full flex-col rounded-[1.75rem] border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-sm transition-colors duration-500 hover:border-white/[0.16] sm:p-5">
                  <Cover project={project} index={i} />

                  <div className="flex flex-1 flex-col px-2 pb-1 pt-6">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-medium tracking-tight text-white">
                        {project.name}
                      </h3>
                      {project.status && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-[var(--faint)]">
                          <Lock className="h-2.5 w-2.5" />
                          {project.status}
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-pretty text-sm leading-relaxed text-[var(--muted)]">
                      {project.summary}
                    </p>

                    {/* highlights */}
                    <ul className="mt-5 space-y-2">
                      {project.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2.5 text-[0.82rem] leading-snug text-[var(--muted)]"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-indigo/80" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* stack */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-white/[0.07] bg-white/[0.02] px-2 py-1 font-mono text-[0.68rem] text-[var(--faint)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* actions */}
                    <div className="mt-7 flex items-center gap-2.5 border-t border-white/5 pt-5">
                      {project.demo ? (
                        <MagneticButton
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="primary"
                          strength={0.3}
                          className="px-4 py-2 text-xs"
                          icon={<ArrowUpRight className="h-3.5 w-3.5" />}
                        >
                          Live Demo
                        </MagneticButton>
                      ) : null}
                      {project.github ? (
                        <MagneticButton
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="secondary"
                          strength={0.3}
                          className="px-4 py-2 text-xs"
                          icon={<Github className="h-3.5 w-3.5" />}
                        >
                          Code
                        </MagneticButton>
                      ) : null}
                      {!project.github && !project.demo && (
                        <span className="text-xs text-[var(--faint)]">
                          Private repository — available on request
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
