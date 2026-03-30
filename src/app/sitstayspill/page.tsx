import type { Metadata } from "next";
import Image from "next/image";
import CharacterProfile from "@/components/CharacterProfile";
import SocialLinks from "@/components/SocialLinks";
import YouTubeEpisodes from "@/components/YouTubeEpisodes";

export const metadata: Metadata = {
  title: "Sit Stay Spill",
  description:
    "The humans are not okay. Pepper and Sage dish on the latest dog park drama and all the unhinged things their human did this week.",
  openGraph: {
    title: "Sit Stay Spill",
    description:
      "The humans are not okay. Pepper and Sage dish on dog park drama.",
    type: "website",
    siteName: "Perfect Sense Productions",
    images: [
      {
        url: "/og-sitstayspill.png",
        width: 1200,
        height: 630,
        alt: "Sit Stay Spill",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sit Stay Spill",
    description: "The humans are not okay.",
  },
};

const characters = [
  { name: "Pepper", role: "Co-Host", image: "/images/characters/sss/pepper.png" },
  { name: "Sage", role: "Co-Host", image: "/images/characters/sss/sage.png" },
];

const SHOW_COLOR = "#ff6eb4";

export default function SitStaySpillPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1a0a1a" }}>
      {/* ── Hero — Warm, intimate, velvet-couch vibe ── */}
      <section className="relative min-h-[85vh] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/sss/hero.png"
            alt="Sit Stay Spill — Pepper and Sage"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Warm pink gradient from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a1a] via-[#1a0a1a]/50 to-transparent" />
          {/* Soft vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, transparent 40%, #1a0a1a 100%)",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 pb-16 md:pb-24 text-center">
          <h1
            className="text-5xl md:text-7xl font-[200] tracking-tight mb-4"
            style={{
              background: "linear-gradient(135deg, #ff6eb4, #ff9ed2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Sit Stay Spill
          </h1>
          <p className="text-lg font-[200] italic text-[#ff6eb4]/60 mb-8">
            The humans are not okay.
          </p>
          <SocialLinks
            tiktok="https://tiktok.com/@sitstayspill_show"
            instagram="https://instagram.com/sitstayspill_show"
            youtube="https://youtube.com/@sitstayspill_show"
            color={SHOW_COLOR}
          />
        </div>
      </section>

      {/* ── About — Conversational, cozy ── */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="border-l-2 border-[#ff6eb4]/30 pl-8">
          <h2 className="text-[11px] font-[200] tracking-[0.3em] uppercase text-[#ff6eb4]/60 mb-6">
            About the Show
          </h2>
          <p className="text-[16px] font-[200] leading-[1.8] text-[#cc8aa8] mb-6">
            Pepper and Sage dish on the latest dog park drama and all the unhinged things their human did this week.
          </p>
        </div>
      </section>

      {/* ── The Hosts ── */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-[11px] font-[200] tracking-[0.3em] uppercase text-[#ff6eb4]/40">
            The Hosts
          </h2>
          <div className="h-[1px] flex-1 bg-[#ff6eb4]/10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {characters.map((c) => (
            <CharacterProfile key={c.name} name={c.name} role={c.role} image={c.image} color={SHOW_COLOR} />
          ))}
        </div>
      </section>

      {/* ── Latest Episodes ── */}
      <YouTubeEpisodes
        handle="@sitstayspill_show"
        color={SHOW_COLOR}
      />

      {/* ── Follow CTA ── */}
      <section className="py-32 text-center px-6">
        <h2
          className="text-3xl md:text-4xl font-[200] mb-4"
          style={{
            background: "linear-gradient(135deg, #ff6eb4, #ff9ed2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Follow Sit Stay Spill
        </h2>
        <p className="text-[15px] font-[200] text-[#666] mb-10 max-w-md mx-auto">
          Get the tea. Spill the tea. Repeat.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {[
            { label: "TikTok", url: "https://tiktok.com/@sitstayspill_show" },
            { label: "Instagram", url: "https://instagram.com/sitstayspill_show" },
            { label: "YouTube", url: "https://youtube.com/@sitstayspill_show" },
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
