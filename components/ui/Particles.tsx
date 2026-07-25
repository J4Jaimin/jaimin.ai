"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** Base alpha, so each dot twinkles at its own level. */
  a: number;
};

/**
 * Interactive particle constellation — a React port of Inspira UI's particle
 * background, extended with proximity links so it reads as a network graph
 * rather than dust. Dots drift slowly, lean away from the cursor, and draw
 * hairlines to nearby neighbours.
 *
 * Cheap by design: one canvas, no React state per frame, rAF paused whenever
 * the tab is hidden or the canvas scrolls out of view. Skipped entirely for
 * reduced-motion users and on small screens.
 */
export default function Particles({
  className,
  quantity = 70,
  /** Max px distance at which two particles are linked. */
  linkDistance = 130,
  /** Radius of the cursor's push field, in px. */
  cursorRadius = 150,
  color = "124, 134, 255",
}: {
  className?: string;
  quantity?: number;
  linkDistance?: number;
  cursorRadius?: number;
  color?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Phones get the aurora + grain only — a live canvas isn't worth the battery.
    if (reduce || window.innerWidth < 768) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let frame = 0;
    let running = true;
    let lastDraw = 0;
    const FRAME_MS = 1000 / 30;

    const pointer = { x: -9999, y: -9999 };
    const linkSq = linkDistance * linkDistance;

    const seed = () => {
      const count = Math.min(
        quantity,
        // Scale down on smaller viewports so density stays constant-ish.
        Math.round((width * height) / 16000)
      );
      particles = Array.from({ length: Math.max(24, count) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.4 + 0.5,
        a: Math.random() * 0.45 + 0.25,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // Cap at 1.5: this is soft, blurry decoration, so rendering it at full
      // retina density quadruples the fill cost for no visible gain.
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const draw = (now: number) => {
      if (!running) return;
      frame = requestAnimationFrame(draw);

      // Ambient drift reads identically at 30fps and costs half as much, which
      // leaves the main thread free for the scroll itself.
      if (now - lastDraw < FRAME_MS) return;
      lastDraw = now;

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap at the edges — no visible spawn/despawn popping.
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Cursor pushes dots gently outward, then they drift back.
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < cursorRadius && dist > 0.001) {
          const force = (1 - dist / cursorRadius) * 0.7;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.a})`;
        ctx.fill();
      }

      // Proximity links. This is O(n²), so keep the inner loop as cheap as
      // possible: compare squared distances (no sqrt), reject on cheap axis
      // checks first, and batch every line into a single path so the whole
      // constellation costs one stroke call instead of hundreds.
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          if (dx > linkDistance || dx < -linkDistance) continue;
          const dy = a.y - b.y;
          if (dy > linkDistance || dy < -linkDistance) continue;
          if (dx * dx + dy * dy > linkSq) continue;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
        }
      }
      ctx.strokeStyle = `rgba(${color}, 0.07)`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    resize();
    frame = requestAnimationFrame(draw);

    const onVisibility = () => (document.hidden ? stop() : start());

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    observer.observe(canvas);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [quantity, linkDistance, cursorRadius, color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none h-full w-full", className)}
    />
  );
}
