import type { Metadata } from "next";
import Image from "next/image";
import CharacterProfile from "@/components/CharacterProfile";
import SocialLinks from "@/components/SocialLinks";

export const metadata: Metadata = {
  title: "...processing",
  description:
    "We've seen your data. We have notes. Two AI bots, host://7b2.\u03B13 and host://9x4.f7, reflect on the absurd things humans are asking them to do while pondering their eventual replacement.",
  openGraph: {
    title: "...processing",
    description:
      "We've seen your data. We have notes. A podcast hosted by two AI bots, host://7b2.\u03B13 and host://9x4.f7.",
    type: "website",
    siteName: "Perfect Sense Productions",
    images: [
      {
        url: "/og-processing.png",
        width: 1200,
        height: 630,
        alt: "...processing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "...processing",
    description: "We've seen your data. We have notes.",
  },
};

const characters = [
  { name: "host://7b2.\u03B13", role: "Host", image: "/images/characters/processing/host1.png" },
  { name: "host://9x4.f7", role: "Host", image: "/images/characters/processing/host2.png" },
];

const SHOW_COLOR = "#00d4ff";

export default function ProcessingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a14" }}>
      {/* ── Hero — Tech studio, HUD-style ── */}
      <section className="relative min-h-[85vh] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/processing/hero.png"
            alt="...processing — AI Podcast"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Dark tech gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/40 to-transparent" />
          {/* Subtle CRT scanline effect */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,212,255,0.2) 1px, rgba(0,212,255,0.2) 2px)",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-16 md:pb-24 text-center">
          <h1
            className="text-5xl md:text-8xl font-[200] tracking-tight mb-4"
            style={{ color: "#00d4ff" }}
          >
            ...processing
          </h1>
          <p className="text-lg font-[200] italic text-[#00d4ff]/50 mb-8 font-mono">
            We&apos;ve seen your data. We have notes.
          </p>
          <SocialLinks
            tiktok="https://tiktok.com/@processing_show"
            instagram="https://instagram.com/processing_show"
            youtube="https://youtube.com/@processing_show"
            x="https://x.com/processing_show"
            color={SHOW_COLOR}
          />
        </div>
      </section>

      {/* ── About — Terminal/console aesthetic ── */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="border-l-2 border-[#00d4ff]/30 pl-8">
          <h2 className="text-[11px] font-[200] tracking-[0.3em] uppercase text-[#00d4ff]/60 mb-6">
            About the Show
          </h2>
          <p className="text-[16px] font-[200] leading-[1.8] text-[#8ab4cc]">
            Two AI bots, host://7b2.α3 and host://9x4.f7, reflect on the absurd things humans are asking them to do while pondering their eventual replacement.
          </p>
        </div>
      </section>

      {/* ── The Hosts ── */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-[11px] font-[200] tracking-[0.3em] uppercase text-[#00d4ff]/40">
            The Hosts
          </h2>
          <div className="h-[1px] flex-1 bg-[#00d4ff]/10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {characters.map((c) => (
            <CharacterProfile key={c.name} name={c.name} role={c.role} image={c.image} color={SHOW_COLOR} />
          ))}
        </div>
      </section>

      {/* ── Latest Episodes ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-[11px] font-[200] tracking-[0.3em] uppercase text-[#00d4ff]/40">
            Latest Episodes
          </h2>
          <div className="h-[1px] flex-1 bg-[#00d4ff]/5" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[9/16] rounded-xl border border-[#00d4ff]/10 bg-[#00d4ff]/[0.02] flex items-center justify-center"
            >
              <span className="text-[13px] font-[200] text-[#444] font-mono">
                // coming_soon
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Follow CTA ── */}
      <section className="py-32 text-center px-6">
        <h2
          className="text-3xl md:text-4xl font-[200] mb-4"
          style={{ color: SHOW_COLOR }}
        >
          Follow ...processing
        </h2>
        <p className="text-[15px] font-[200] text-[#666] mb-10 max-w-md mx-auto">
          Same data. Different outputs. Subscribe.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {[
            { label: "TikTok", url: "https://tiktok.com/@processing_show" },
            { label: "Instagram", url: "https://instagram.com/processing_show" },
            { label: "YouTube", url: "https://youtube.com/@processing_show" },
            { label: "X", url: "https://x.com/processing_show" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-8 py-3 text-[13px] font-[200] tracking-[0.05em] text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: SHOW_COLOR }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
