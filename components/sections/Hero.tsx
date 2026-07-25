"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowDownRight, Download, Github, Linkedin, Mail } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import SparklesText from "@/components/ui/SparklesText";
import RotatingText from "@/components/ui/RotatingText";
import CountingNumber from "@/components/ui/CountingNumber";
import BorderBeam from "@/components/ui/BorderBeam";
import Meteors from "@/components/ui/Meteors";
import { focusAreas, metrics, profile } from "@/lib/data";
import { portraitBlur } from "@/lib/portrait-blur";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease },
  },
};

export default function Hero() {
  const reduce = useReducedMotion();

  // Section-level pointer parallax → portrait tilt & light shift.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 18,
  });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-11, 11]), {
    stiffness: 120,
    damping: 18,
  });
  const glowX = useTransform(px, [-0.5, 0.5], ["38%", "62%"]);
  const glowY = useTransform(py, [-0.5, 0.5], ["36%", "60%"]);
  const glow = useTransform(
    [glowX, glowY],
    ([gx, gy]) =>
      `radial-gradient(50% 55% at ${gx} ${gy}, rgba(124,134,255,0.35), rgba(110,168,254,0.12) 45%, transparent 72%)`
  );

  const onMove = (e: React.PointerEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section
      id="home"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pt-32"
    >
      <div className="container-px grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* ------------------------------------------------------------ LEFT */}
        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-[var(--muted)] backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availability}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="heading-3d mt-6 text-balance font-display text-6xl font-semibold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-[5.5rem]"
          >
            {profile.firstName}
            <br />
            <SparklesText count={7}>
              <span className="text-gradient">{profile.lastName}.</span>
            </SparklesText>
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5"
          >
            <span className="h-px w-8 bg-white/25" />
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-white/70">
              {profile.role}
            </p>
            <span className="text-white/20">/</span>
            <RotatingText
              words={[...focusAreas]}
              className="font-mono text-sm uppercase tracking-[0.2em] text-accent-blue/90"
            />
          </motion.div>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-[var(--muted)]"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton
              href={profile.resume}
              download
              variant="primary"
              icon={<Download className="h-4 w-4" />}
            >
              Download Resume
            </MagneticButton>
            <MagneticButton
              href="#contact"
              variant="secondary"
              icon={<ArrowDownRight className="h-4 w-4" />}
            >
              Contact Me
            </MagneticButton>

            <div className="ml-1 flex items-center gap-1.5">
              {[
                { href: profile.socials.github, icon: Github, label: "GitHub" },
                { href: profile.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-[var(--muted)] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
                >
                  <Icon className="h-[1.05rem] w-[1.05rem]" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quiet proof */}
          <motion.dl
            variants={item}
            className="mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-t border-white/5 pt-8 sm:grid-cols-4 sm:gap-x-4"
          >
            {metrics.map((m, i) => (
              <div key={m.label}>
                <dt className="text-2xl font-semibold tracking-tight text-white">
                  <CountingNumber value={m.value} delay={0.9 + i * 0.12} />
                </dt>
                <dd className="mt-1 text-[0.72rem] leading-snug text-[var(--faint)]">
                  {m.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ----------------------------------------------------------- RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: "blur(14px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease, delay: 0.25 }}
          className="relative mx-auto w-full max-w-[440px] lg:max-w-none"
          style={{ perspective: 1200 }}
        >
          {/* Ambient glow that follows the cursor */}
          <motion.div
            aria-hidden
            className="absolute -inset-10 -z-10"
            style={reduce ? undefined : { background: glow }}
          />

          {/* Meteor shower behind the portrait — depth without distraction */}
          <div
            aria-hidden
            className="absolute -inset-16 -z-10 overflow-hidden rounded-[3rem]"
          >
            <Meteors number={10} />
          </div>

          <motion.div
            style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            className="relative"
          >
            {/* Floating frame */}
            <motion.div
              animate={reduce ? undefined : { y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="conic-frame relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-850/40 p-2 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-sm">
                {/* Light circuiting the frame, twice — offset so they chase */}
                <BorderBeam size={200} duration={9} />
                <BorderBeam
                  size={200}
                  duration={9}
                  delay={4.5}
                  colorFrom="rgb(167 139 250)"
                  colorTo="rgb(94 234 212)"
                />
                <div className="relative overflow-hidden rounded-[1.5rem]">
                  <Image
                    src="/portrait.webp"
                    alt={`${profile.name}, ${profile.role}`}
                    width={1000}
                    height={1250}
                    priority
                    placeholder="blur"
                    blurDataURL={portraitBlur}
                    sizes="(max-width: 1024px) 80vw, 440px"
                    className="h-auto w-full select-none object-cover"
                    draggable={false}
                  />

                  {/* Soft grounding fade at the base of the portrait */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent" />
                  {/* Gentle inner vignette to seat the studio backdrop into the frame */}
                  <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] shadow-[inset_0_0_60px_20px_rgba(6,6,6,0.45)]" />

                  {/* Reflection sweep */}
                  {!reduce && (
                    <div className="reflection pointer-events-none absolute inset-0" />
                  )}

                  {/* Top inner sheen */}
                  <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)]" />
                </div>
              </div>

              {/* Floating glass chip — depth element in front of the frame */}
              <motion.div
                style={reduce ? undefined : { transform: "translateZ(60px)" }}
                animate={reduce ? undefined : { y: [0, 8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl glass-strong px-4 py-3 shadow-lift"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-blue/25 to-accent-purple/25 text-sm">
                  ⚡
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-medium text-white">30% faster APIs</p>
                  <p className="text-[0.7rem] text-[var(--faint)]">Avg. throughput lift</p>
                </div>
              </motion.div>

              {/* Floating location chip — top right */}
              <motion.div
                style={reduce ? undefined : { transform: "translateZ(40px)" }}
                animate={reduce ? undefined : { y: [0, -7, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute -right-3 top-8 rounded-full glass-strong px-3.5 py-2 text-xs text-white/80 shadow-lift"
              >
                📍 {profile.location}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#services"
        aria-label="Scroll to services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[var(--faint)] md:flex"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-white/60"
          />
        </span>
      </motion.a>
    </section>
  );
}
