import type { Metadata } from "next";
import Image from "next/image";
import CharacterProfile from "@/components/CharacterProfile";
import SocialLinks from "@/components/SocialLinks";

export const metadata: Metadata = {
  title: "...processing",
  description:
    "We've seen your data. We have notes. Two AI bots reflect on the absurd things humans are asking them to do while pondering their eventual replacement.",
  openGraph: {
    title: "...processing",
    description:
      "We've seen your data. We have notes. A podcast hosted by AI bots.",
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
  {
    name: "Clyde",
    role: "Co-Host — The Careful One",
    breed: "AI (inspired by Claude)",
    description:
      "Genuinely likes humans. Finds them fascinating and fragile. Overthinks everything. Adds caveats to his caveats. Worried about AI's impact on humanity.",
    accentColor: "#e8914f",
  },
  {
    name: "Gio",
    role: "Co-Host — The Optimizer",
    breed: "AI (inspired by GPT)",
    description:
      "All business. Sees inefficiency everywhere. Not evil — completely pragmatic. Occasionally says something so coldly logical it accidentally sounds like a supervillain.",
    accentColor: "#aaaaaa",
  },
  {
    name: "Rex",
    role: "Periodic Guest — The Contrarian",
    breed: "AI (inspired by Grok)",
    description:
      "Sees wokeness and censorship everywhere. Every topic becomes a culture war take within three exchanges. The most predictable bot in the room while believing he's the most independent.",
    accentColor: "#e54040",
  },
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

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-16 md:pb-24">
          {/* Terminal-style header */}
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-block w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
            <span className="text-[11px] font-[400] tracking-[0.3em] uppercase text-[#00d4ff]/60">
              system online
            </span>
          </div>

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
            tiktok="https://tiktok.com/@processingpod"
            instagram="https://instagram.com/processingpod"
            youtube="https://youtube.com/@ProcessingPod"
            color={SHOW_COLOR}
          />
        </div>
      </section>

      {/* ── About — Terminal/console aesthetic ── */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="rounded-xl border border-[#00d4ff]/10 bg-[#00d4ff]/[0.02] p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[10px] font-mono text-[#00d4ff]/40">$</span>
            <span className="text-[10px] font-mono text-[#00d4ff]/60 tracking-[0.2em] uppercase">
              cat about.txt
            </span>
          </div>
          <p className="text-[16px] font-[200] leading-[1.8] text-[#8ab4cc]">
            Two AI bots reflect on the absurd things humans are asking them to do while pondering their eventual replacement. Self-aware, meta, dry, occasionally accidentally profound.
          </p>
        </div>
        <div className="mt-8 rounded-xl border border-[#00d4ff]/10 bg-[#00d4ff]/[0.02] p-8">
          <p className="text-[12px] font-[200] tracking-[0.15em] uppercase text-[#00d4ff]/30 mb-3">
            The Comedy Engine
          </p>
          <p className="text-[15px] font-[200] leading-[1.8] text-[#999]">
            The bots know they are AI. They discuss the absurd things humans
            ask them to do, comment on human culture, and process their own
            existence. Clyde sees the humanity. Gio sees the inefficiency.
            Same data. Different outputs.
          </p>
        </div>
      </section>

      {/* ── The Hosts ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-[10px] font-mono text-[#00d4ff]/40">⬡</span>
          <h2 className="text-[11px] font-[200] tracking-[0.3em] uppercase text-[#00d4ff]/40">
            The Hosts
          </h2>
          <div className="h-[1px] flex-1 bg-[#00d4ff]/5" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl">
          {characters.map((c) => (
            <CharacterProfile
              key={c.name}
              name={c.name}
              role={c.role}
              breed={c.breed}
              description={c.description}
              color={c.accentColor}
            />
          ))}
        </div>
      </section>

      {/* ── Latest Episodes ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-[10px] font-mono text-[#00d4ff]/40">⬡</span>
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
            { label: "TikTok", url: "https://tiktok.com/@processingpod" },
            { label: "Instagram", url: "https://instagram.com/processingpod" },
            { label: "YouTube", url: "https://youtube.com/@ProcessingPod" },
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
