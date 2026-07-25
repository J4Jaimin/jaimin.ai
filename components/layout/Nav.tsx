"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ScrambleText from "@/components/ui/ScrambleText";
import { navLinks, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export default function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Active-section tracking.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5"
      >
        <nav
          className={cn(
            "flex w-full max-w-container items-center justify-between rounded-full px-2.5 py-2.5 transition-all duration-500",
            scrolled
              ? "glass-strong shadow-lift"
              : "border border-transparent bg-transparent"
          )}
        >
          {/* Monogram / name */}
          <a
            href="#home"
            className="group ml-2 flex items-center gap-2.5 pr-4"
            aria-label={`${profile.name} — home`}
          >
            <span className="relative grid h-8 w-8 place-items-center rounded-full bg-white text-[0.8rem] font-semibold text-ink-950">
              JR
            </span>
            <span className="hidden text-sm font-medium tracking-tight text-white/90 sm:block">
              {profile.name}
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                    isActive
                      ? "text-white"
                      : "text-[var(--muted)] hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-inset ring-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <ScrambleText
                    text={link.label}
                    trigger="hover"
                    speed={0.8}
                    className="relative z-10"
                  />
                </a>
              );
            })}
          </div>

          {/* CTA + mobile trigger */}
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
            >
              Let&rsquo;s talk
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full text-white/80 transition-colors hover:text-white md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] md:hidden"
          >
            <div
              className="absolute inset-0 bg-ink-950/80 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-4 mt-4 overflow-hidden rounded-4xl glass-strong p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-medium text-white">{profile.name}</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full text-white/80 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1 }}
                    className="border-b border-white/5 py-4 text-2xl font-medium tracking-tight text-white/90 last:border-0"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-ink-950"
              >
                Let&rsquo;s talk
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
