"use client";

import { motion, useReducedMotion } from "framer-motion";
import TiltCard from "@/components/ui/TiltCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

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
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 backdrop-blur-sm transition-colors duration-500 hover:border-white/[0.16]">
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

                    <h3 className="text-lg font-medium tracking-tight text-white">
                      {service.title}
                    </h3>
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
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
