"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import BorderBeam from "@/components/ui/BorderBeam";
import Meteors from "@/components/ui/Meteors";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "Jaimin Rana",
    href: profile.socials.linkedin,
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "J4Jaimin",
    href: profile.socials.github,
    icon: Github,
  },
  {
    label: "Location",
    value: profile.location,
    href: undefined,
    icon: MapPin,
  },
];

export default function Contact() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project enquiry from ${form.name || "your site"}`);
    const body = encodeURIComponent(
      `Hi Jaimin,\n\n${form.message}\n\n— ${form.name}\n${form.email}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  return (
    <section id="contact" className="section scroll-mt-20">
      {/* soft local glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-[420px] max-w-4xl -translate-y-1/2 rounded-full bg-accent-indigo/[0.10] blur-[120px]"
      />

      <div className="container-px">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
          {/* ------------------------------------------------------- LEFT */}
          <div>
            <Reveal>
              <span className="eyebrow">Contact</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="heading-3d mt-5 text-balance text-4xl font-semibold leading-[1.02] tracking-tighter text-white sm:text-5xl lg:text-6xl">
                Let&rsquo;s build
                <br />
                something worth
                <br />
                <span className="text-gradient">remembering.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-[var(--muted)]">
                Have a backend that needs to scale, an API to design, or a system
                to untangle? I&rsquo;m {profile.availability.toLowerCase()} — tell
                me what you&rsquo;re building.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {channels.map((c) => {
                  const Icon = c.icon;
                  const inner = (
                    <>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-[var(--muted)] transition-colors duration-300 group-hover:text-white">
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[0.65rem] uppercase tracking-wider text-[var(--faint)]">
                          {c.label}
                        </span>
                        <span className="block truncate text-sm text-white/90">
                          {c.value}
                        </span>
                      </span>
                      {c.href && (
                        <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-[var(--faint)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                      )}
                    </>
                  );
                  return c.href ? (
                    <a
                      key={c.label}
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-4 transition-colors duration-300 hover:border-white/[0.16]"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div
                      key={c.label}
                      className="group flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-4"
                    >
                      {inner}
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <button
                onClick={copyEmail}
                className="group mt-4 inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-white"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Email copied" : "Copy email address"}
              </button>
            </Reveal>
          </div>

          {/* ------------------------------------------------------- RIGHT */}
          <Reveal delay={0.1} className="h-full">
            <form
              onSubmit={onSubmit}
              className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] glass-strong p-6 shadow-lift sm:p-8"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-blue/10 blur-3xl" />
              {/* the form is the page's main CTA — it gets a standing beam */}
              <BorderBeam size={240} duration={12} />
              <BorderBeam
                size={240}
                duration={12}
                delay={6}
                colorFrom="rgb(167 139 250)"
                colorTo="rgb(110 168 254)"
              />
              <div className="flex flex-1 flex-col gap-5">
                <Field label="Your name">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="peer w-full bg-transparent text-white outline-none placeholder:text-[var(--faint)]"
                  />
                </Field>
                <Field label="Email">
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="peer w-full bg-transparent text-white outline-none placeholder:text-[var(--faint)]"
                  />
                </Field>
                <Field label="Message" className="flex flex-1 flex-col">
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about the system you're building…"
                    className="peer w-full flex-1 resize-none bg-transparent text-white outline-none placeholder:text-[var(--faint)]"
                  />
                </Field>

                <div className="mt-1 flex items-center justify-between gap-4">
                  <p className="text-xs text-[var(--faint)]">
                    Opens in your mail app — no data stored.
                  </p>
                  <MagneticButton
                    type="submit"
                    variant="primary"
                    icon={
                      sent ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )
                    }
                  >
                    {sent ? "Ready to send" : "Send message"}
                  </MagneticButton>
                </div>
              </div>
            </form>
          </Reveal>
        </div>

        {/* Sign-off */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease }}
          className="relative mt-24 overflow-hidden py-10 text-center"
        >
          <Meteors number={8} />
          <p className="relative font-mono text-xs uppercase tracking-[0.3em] text-[var(--faint)]">
            Thanks for scrolling
          </p>
          <p className="relative mx-auto mt-4 max-w-2xl text-balance text-2xl font-medium tracking-tight text-white/80 sm:text-3xl">
            The best systems feel effortless.{" "}
            <span className="text-[var(--muted)]">
              I&rsquo;d love to build yours that way.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "group block rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 transition-colors duration-300 focus-within:border-accent-indigo/50 focus-within:bg-white/[0.04]",
        className
      )}
    >
      <span className="mb-1 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--faint)] transition-colors group-focus-within:text-accent-blue/90">
        {label}
      </span>
      {children}
    </label>
  );
}
