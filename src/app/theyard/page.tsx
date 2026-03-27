import type { Metadata } from "next";
import Image from "next/image";
import CharacterProfile from "@/components/CharacterProfile";
import SocialLinks from "@/components/SocialLinks";

export const metadata: Metadata = {
  title: "The Yard",
  description:
    "Man's best friend. Man's worst critic. Tank and Lou give their thoughts on everything from current events to the unwritten rules of dog life.",
  openGraph: {
    title: "The Yard",
    description:
      "Man's best friend. Man's worst critic. Straight talk from Tank and Lou.",
    type: "website",
    siteName: "Perfect Sense Productions",
    images: [
      {
        url: "/og-theyard.png",
        width: 1200,
        height: 630,
        alt: "The Yard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Yard",
    description: "Man's best friend. Man's worst critic.",
  },
};

const characters = [
  { name: "Tank", role: "Co-Host", image: "/images/characters/theyard/tank.png" },
  { name: "Lou", role: "Co-Host", image: "/images/characters/theyard/lou.png" },
];

const SHOW_COLOR = "#d4a24e";

export default function TheYardPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1a1208" }}>
      {/* ── Hero — Rustic bar, warm amber glow ── */}
      <section className="relative min-h-[85vh] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/theyard/hero.png"
            alt="The Yard — Tank and Lou"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Warm amber gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208] via-[#1a1208]/60 to-transparent" />
          {/* Warm vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, transparent 30%, #1a1208 100%)",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-16 md:pb-24">
          <h1
            className="text-6xl md:text-8xl font-[200] tracking-tight mb-4"
            style={{ color: "#d4a24e" }}
          >
            The Yard
          </h1>
          <p className="text-lg font-[200] italic text-[#d4a24e]/60 mb-8">
            Man&apos;s best friend. Man&apos;s worst critic.
          </p>
          <SocialLinks
            tiktok="https://tiktok.com/@theyardshow"
            instagram="https://instagram.com/theyardshow"
            youtube="https://youtube.com/@TheYardShow"
            color={SHOW_COLOR}
          />
        </div>
      </section>

      {/* ── About — Straight talk, no frills ── */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="border-l-2 border-[#d4a24e]/20 pl-8">
          <p className="text-[16px] font-[200] leading-[1.8] text-[#b89a6a] mb-6">
            Tank and Lou give their thoughts on everything from current events to the unwritten rules of dog life. Straight talk, unpretentious.
          </p>
        </div>
      </section>

      {/* ── The Hosts ── */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-[11px] font-[200] tracking-[0.3em] uppercase text-[#d4a24e]/40">
            The Hosts
          </h2>
          <div className="h-[1px] flex-1 bg-[#d4a24e]/10" />
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
          <h2 className="text-[11px] font-[200] tracking-[0.3em] uppercase text-[#d4a24e]/40">
            Latest Episodes
          </h2>
          <div className="h-[1px] flex-1 bg-[#d4a24e]/10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[9/16] rounded-2xl border border-[#d4a24e]/10 bg-[#d4a24e]/[0.02] flex items-center justify-center"
            >
              <span className="text-[13px] font-[200] text-[#444]">
                Coming Soon
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Follow CTA ── */}
      <section className="py-32 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-[200] text-white mb-4">
          Follow The Yard
        </h2>
        <p className="text-[15px] font-[200] text-[#666] mb-10 max-w-md mx-auto">
          Pull up a chair. We&apos;re talking.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {[
            { label: "TikTok", url: "https://tiktok.com/@theyardshow" },
            { label: "Instagram", url: "https://instagram.com/theyardshow" },
            { label: "YouTube", url: "https://youtube.com/@TheYardShow" },
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
