import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

// Space Grotesk — a technical grotesque for display & body; gives the site a
// distinct engineering character over a neutral default.
const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// JetBrains Mono — an actual IDE typeface, used for eyebrows, tags & metrics.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

// Playfair Display — a high-contrast luxury serif reserved solely for the
// hero name, a classy signature against the otherwise technical type system.
const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

import SmoothScroll from "@/components/providers/SmoothScroll";
import Aurora from "@/components/ui/Aurora";
import Grain from "@/components/ui/Grain";
import CursorSpotlight from "@/components/ui/CursorSpotlight";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { profile } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jaimin-rana.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
  keywords: [
    "Jaimin Rana",
    "Backend Developer",
    "Software Engineer",
    "Node.js",
    "Express",
    "MongoDB",
    "Redis",
    "API Architecture",
    "Ahmedabad",
  ],
  authors: [{ name: profile.name, url: profile.socials.github }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    siteName: profile.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    images: ["/og.png"],
  },
  icons: { icon: "/icon.svg" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060606",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans antialiased selection:bg-white/10">
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-ink-950"
        >
          Skip to content
        </a>

        <Aurora />
        <CursorSpotlight />

        <SmoothScroll>
          <ScrollProgress />
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>

        <Grain />
      </body>
    </html>
  );
}
