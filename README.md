# Jaimin Rana — Portfolio

A premium, minimal personal portfolio built to feel like a luxury digital product.
Matte-black canvas, soft aurora lighting, glassmorphism, and slow, purposeful motion.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · GSAP · Lenis · Geist · Lucide

## Sections

Home · Services · Work · Experience · Contact — one focused, scroll-driven page.

## Getting started

> Requires Node 18.18+ (developed on Node 18.19). `npm` is used below.

```bash
npm install
npm run dev        # http://localhost:3000
```

### Production

```bash
npm run build
npm run start
```

## Editing content

All copy lives in one typed file — [`lib/data.ts`](lib/data.ts):
profile, tagline, metrics, services, projects, experience, recognition, nav.
No content is hard-coded inside components, so updates are one place.

A few things worth confirming before you ship:

- **LinkedIn URL** — set to `https://www.linkedin.com/in/jaimin-r-56a756212`
  (the link you provided). Your résumé shows `linkedin.com/in/jaimin-rana`;
  if that vanity URL is live, swap it in `profile.socials.linkedin`.
- **Email** — `jaiminrana1102@gmail.com` (from your résumé), used by the
  contact form and mail links.
- **Résumé** — served from `public/resume.pdf` (the “Download Resume” button).
  Replace that file to update the download.

## Assets

The portrait and social card are generated from your source photos:

```bash
npm run optimize:images   # → public/portrait.webp, public/headshot.webp, blur placeholder
node scripts/make-og.mjs  # → public/og.png (1200×630 social card)
```

`scripts/optimize-images.mjs` reads the studio portraits from
`~/Documents/Personal/Profession_photo`. To use different photos, point the
`HERO_SRC` / `HEADSHOT_SRC` paths there and re-run.

## Design notes

- **Motion respects `prefers-reduced-motion`** — Lenis, tilt, parallax, and the
  cursor spotlight all switch off, leaving clean fades and native scrolling.
- **Cursor spotlight & magnetic buttons** are desktop / fine-pointer only.
- **Accents:** soft blue `#6ea8fe`, indigo `#7c86ff`, purple `#a78bfa`, whisper
  of cyan — tuned in `tailwind.config.ts` and `app/globals.css`.

## Deploy

Zero-config on **Vercel** (recommended). Optionally set `NEXT_PUBLIC_SITE_URL`
to your final domain so Open Graph/Twitter metadata resolves absolute URLs.
