import { ArrowUp, Github, Linkedin } from "lucide-react";
import { navLinks, profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="container-px py-12">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[0.8rem] font-semibold text-ink-950">
              JR
            </span>
            <div className="leading-tight">
              <p className="text-sm font-medium text-white">{profile.name}</p>
              <p className="text-xs text-[var(--faint)]">{profile.role}</p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-[var(--muted)] transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-[var(--muted)] transition-colors hover:border-white/25 hover:text-white"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-[var(--muted)] transition-colors hover:border-white/25 hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="#home"
              aria-label="Back to top"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-[var(--muted)] transition-colors hover:border-white/25 hover:text-white"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-white/5 pt-6 text-xs text-[var(--faint)] sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {profile.name}. Crafted with care in{" "}
            {profile.location}.
          </p>
          <p className="font-mono">Built with Next.js · Framer Motion · GSAP</p>
        </div>
      </div>
    </footer>
  );
}
