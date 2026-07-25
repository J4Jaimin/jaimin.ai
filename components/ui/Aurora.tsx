import Particles from "./Particles";

/**
 * The ambient backdrop for the whole site: a fixed matte-black field with a few
 * slow, blurred aurora blobs, a whisper-thin grid, a cursor-reactive particle
 * constellation, and a vignette. Everything here is decorative and
 * non-interactive — it sits behind all content.
 */
export default function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      {/* Fine grid, faded toward the edges */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 78%)",
        }}
      />

      {/* Aurora blobs — soft blue / indigo / purple, very low opacity */}
      <div className="absolute -left-[12%] top-[-8%] h-[46vw] w-[46vw] rounded-full bg-accent-blue/[0.10] blur-[130px] animate-aurora-drift" />
      <div
        className="absolute right-[-10%] top-[18%] h-[42vw] w-[42vw] rounded-full bg-accent-purple/[0.09] blur-[140px] animate-aurora-drift"
        style={{ animationDelay: "-9s" }}
      />
      <div
        className="absolute bottom-[-14%] left-[28%] h-[40vw] w-[40vw] rounded-full bg-accent-indigo/[0.08] blur-[150px] animate-aurora-drift"
        style={{ animationDelay: "-16s" }}
      />

      {/* Particle constellation — drifts, links up, and leans off the cursor.
          Self-disables on touch/small screens and for reduced motion. */}
      <div className="absolute inset-0 opacity-70">
        <Particles quantity={68} />
      </div>

      {/* Top spotlight + vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_-8%,rgba(124,134,255,0.10),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_55%,rgba(0,0,0,0.55))]" />
    </div>
  );
}
