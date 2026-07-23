import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * Consistent section header — eyebrow label, large display title, optional lede.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tighter text-white sm:text-5xl lg:text-[3.4rem]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "max-w-xl text-pretty text-base leading-relaxed text-[var(--muted)]",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
