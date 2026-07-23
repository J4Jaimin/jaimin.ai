const tech = [
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "Redis",
  "Docker",
  "AWS",
  "Python",
  "Prefect",
  "TypeScript",
  "REST APIs",
  "Mongoose",
  "Sequelize",
  "CI/CD",
];

/**
 * A slow, seamless marquee of the core stack — connective tissue between the
 * hero and the work, with edges masked into the background. CSS-only motion.
 */
export default function TechMarquee() {
  return (
    <div
      className="relative flex overflow-hidden border-y border-white/5 py-6"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <div className="flex shrink-0 animate-[marquee_38s_linear_infinite] items-center gap-10 pr-10 motion-reduce:animate-none">
        {tech.concat(tech).map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-mono text-sm uppercase tracking-[0.15em] text-white/35 transition-colors hover:text-white/70">
              {t}
            </span>
            <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
