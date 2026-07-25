/**
 * Barely-there film grain over the whole page. Set at a low opacity so it reads
 * as texture, never noise. Pointer-events off.
 *
 * `mix-blend-mode` is desktop-only: blending a full-viewport layer forces the
 * whole stacking context to be re-composited as content scrolls beneath it,
 * which is one of the costlier things you can put on a scrolling page. On
 * mobile the grain falls back to plain alpha, which looks near-identical.
 */
export default function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] opacity-[0.035] md:mix-blend-soft-light"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
      }}
    />
  );
}
