"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

type LenisContextValue = {
  /** The live Lenis instance — null until mounted, or for reduced-motion users. */
  lenis: Lenis | null;
  /** 0 → 1 document scroll progress, spring-smoothed. */
  progress: MotionValue<number>;
  /** Signed, normalised scroll velocity (roughly -1 → 1), spring-smoothed. */
  velocity: MotionValue<number>;
  /** Scroll direction as of the last frame. */
  direction: MotionValue<number>;
};

const LenisContext = createContext<LenisContextValue | null>(null);

/**
 * Read the shared Lenis state. Safe to call from any client component below
 * <SmoothScroll> — returns inert motion values when scrolling isn't smoothed.
 */
export function useLenis(): LenisContextValue {
  const ctx = useContext(LenisContext);
  if (!ctx) {
    throw new Error("useLenis must be used inside <SmoothScroll>");
  }
  return ctx;
}

/**
 * Buttery smooth scrolling (Lenis) wired into the GSAP ticker so ScrollTrigger
 * stays perfectly in sync, and published to the rest of the app as motion
 * values (progress / velocity / direction) so components can *react* to how
 * fast you're scrolling — skew, blur, speed-up, parallax.
 *
 * Disabled entirely for reduced-motion users, who then get native, instant
 * scrolling and inert (always-zero) velocity.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  const rawProgress = useMotionValue(0);
  const rawVelocity = useMotionValue(0);
  const direction = useMotionValue(0);

  // Springs keep velocity-driven effects from snapping when the wheel stops.
  const progress = useSpring(rawProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.0005,
  });
  const velocity = useSpring(rawVelocity, {
    stiffness: 160,
    damping: 26,
    mass: 0.4,
  });

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    // Lerp-based glide feels more continuous and "buttery" than a fixed
    // duration curve — the viewport eases toward the target every frame.
    //
    // `syncTouch` is deliberately OFF. It hands touch scrolling to JS on the
    // main thread, which throws away the browser's compositor-driven momentum
    // scrolling — the thing phones are actually good at. The result is the
    // rubber-banding lag you feel on mobile. Native touch scroll is already
    // smooth, so Lenis only smooths the wheel here; ScrollTrigger stays in
    // sync either way via the scroll listener below.
    const instance = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
    });

    const onScroll = (e: Lenis) => {
      ScrollTrigger.update();

      rawProgress.set(e.progress);
      direction.set(e.direction);

      // Lenis reports px/frame; ~40px is a brisk flick. Clamp so a trackpad
      // slam can't blow out downstream transforms.
      //
      // This stays a motion value on purpose. Writing it to a CSS custom
      // property on <html> every frame invalidates style for the whole
      // document on every frame of every scroll; motion values drive
      // transforms directly and skip style recalc entirely.
      rawVelocity.set(Math.max(-1, Math.min(1, e.velocity / 40)));
    };

    instance.on("scroll", onScroll);

    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links → smooth-scroll via Lenis.
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      instance.scrollTo(el as HTMLElement, {
        offset: -80,
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      });
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick);

    setLenis(instance);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
    };
  }, [rawProgress, rawVelocity, direction]);

  // Reduced-motion (or pre-mount) fallback: keep `progress` truthful using the
  // native scroll position so the progress bar still works.
  useEffect(() => {
    if (lenis) return;
    const onNativeScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      rawProgress.set(max > 0 ? window.scrollY / max : 0);
    };
    onNativeScroll();
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    window.addEventListener("resize", onNativeScroll);
    return () => {
      window.removeEventListener("scroll", onNativeScroll);
      window.removeEventListener("resize", onNativeScroll);
    };
  }, [lenis, rawProgress]);

  return (
    <LenisContext.Provider value={{ lenis, progress, velocity, direction }}>
      {children}
    </LenisContext.Provider>
  );
}
