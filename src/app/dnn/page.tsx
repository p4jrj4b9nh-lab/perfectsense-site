import type { Metadata } from "next";
import Image from "next/image";
import CharacterProfile from "@/components/CharacterProfile";
import SocialLinks from "@/components/SocialLinks";

export const metadata: Metadata = {
  title: "DNN — Dog News Network",
  description:
    "All the news that's fit to sniff. Barkley McSnoot, Diane Pawson and a team of correspondents and experts break down today's news.",
  openGraph: {
    title: "DNN — Dog News Network",
    description:
      "All the news that's fit to sniff. Broadcast journalism played completely straight.",
    type: "website",
    siteName: "Perfect Sense Productions",
    images: [
      {
        url: "/og-dnn.png",
        width: 1200,
        height: 630,
        alt: "DNN — Dog News Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DNN — Dog News Network",
    description: "All the news that's fit to sniff.",
  },
};

const characters = [
  { name: "Barkley McSnoot", role: "Lead Anchor", image: "/images/characters/dnn/barkely.png" },
  { name: "Diane Pawson", role: "Co-Anchor", image: "/images/characters/dnn/diane.png" },
  { name: "Scraps", role: "Field Correspondent", image: "/images/characters/dnn/scraps.png" },
  { name: "Rex Barkington", role: "Security Correspondent", image: "/images/characters/dnn/rex.png" },
  { name: "Milton Wrinkles", role: "Senior Economic Analyst", image: "/images/characters/dnn/milton.png" },
  { name: "Gus Sniffwell", role: "Investigative Reporter", image: "/images/characters/dnn/gus.png" },
  { name: "Cheddar", role: "Lifestyle Correspondent", image: "/images/characters/dnn/chedder.png" },
  { name: "Sunny", role: "Weatherman", image: "/images/characters/dnn/sunny.png" },
  { name: "Blitz", role: "Sports Reporter", image: "/images/characters/dnn/blitz.png" },
  { name: "Sloane", role: "Politics Reporter", image: "/images/characters/dnn/sloane.png" },
  { name: "Duchess", role: "Luxury Lifestyle Reporter", image: "/images/characters/dnn/duchess.png" },
  { name: "Coco", role: "Pop Culture Reporter", image: "/images/characters/dnn/coco.png" },
  { name: "Winston", role: "Food Critic", image: "/images/characters/dnn/winston.png" },
  { name: "Arlo Woofman", role: "Political Analyst", image: "/images/characters/dnn/arlo.png" },
  { name: "Steele Barkwell", role: "Political Analyst", image: "/images/characters/dnn/steele.png" },
  { name: "Chip", role: "Tech Correspondent", image: "/images/characters/dnn/chip.png" },
  { name: "Vera", role: "Legal Analyst", image: "/images/characters/dnn/vera.png" },
  { name: "Vita", role: "Health & Wellness Reporter", image: "/images/characters/dnn/vita_downdog.png" },
  { name: "Nigel", role: "Foreign Correspondent", image: "/images/characters/dnn/nigel.png" },
  { name: "Knox", role: "Business Analyst", image: "/images/characters/dnn/knox.png" },
];

const SHOW_COLOR = "#4a9eff";

export default function DNNPage() {
  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* ── Hero — Broadcast-style full-bleed image ── */}
      <section className="relative min-h-[85vh] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/dnn/hero.png"
            alt="DNN — Dog News Network"
            fill
            className="object-cover object-[center_20%]"
            priority
            sizes="100vw"
          />
          {/* Broadcast-style gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/40 to-transparent" />
          {/* Subtle blue scan line effect */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(74,158,255,0.3) 2px, rgba(74,158,255,0.3) 4px)",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16 md:pb-24 text-center">
          {/* Breaking news bar */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-block px-3 py-1 bg-red-600 text-white text-[10px] font-[400] tracking-[0.2em] uppercase">
              Live
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-[200] tracking-tight text-white mb-4">
            DNN
          </h1>
          <p className="text-xl md:text-2xl font-[200] text-white/70 mb-2">
            Dog News Network
          </p>
          <p className="text-lg font-[200] italic text-[#4a9eff]/80 mb-8">
            All the news that&apos;s fit to sniff.
          </p>
          <SocialLinks
            tiktok="https://tiktok.com/@dognewsnetwork"
            instagram="https://instagram.com/dognewsnetwork"
            youtube="https://youtube.com/@DogNewsNetwork"
            color={SHOW_COLOR}
          />
        </div>
      </section>

      {/* ── About — News ticker style ── */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="border-l-2 border-[#4a9eff]/30 pl-8">
          <h2 className="text-[11px] font-[200] tracking-[0.3em] uppercase text-[#4a9eff]/60 mb-6">
            About the Network
          </h2>
          <p className="text-[16px] font-[200] leading-[1.8] text-[#999] mb-6">
            Barkley McSnoot, Diane Pawson and a team of correspondents and experts break down today&apos;s news like only a dog can. Professional broadcast journalism played completely straight.
          </p>
        </div>
      </section>

      {/* ── The Cast ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-[11px] font-[200] tracking-[0.3em] uppercase text-[#666]">
            The Newsroom
          </h2>
          <div className="h-[1px] flex-1 bg-white/5" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {characters.map((c) => (
            <CharacterProfile key={c.name} name={c.name} role={c.role} image={c.image} color={SHOW_COLOR} />
          ))}
        </div>
      </section>

      {/* ── Latest Episodes ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-[11px] font-[200] tracking-[0.3em] uppercase text-[#666]">
            Latest Broadcasts
          </h2>
          <div className="h-[1px] flex-1 bg-white/5" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[9/16] rounded-2xl border border-[#4a9eff]/10 bg-[#4a9eff]/[0.02] flex items-center justify-center"
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
          Follow DNN
        </h2>
        <p className="text-[15px] font-[200] text-[#666] mb-10 max-w-md mx-auto">
          Stay informed. Stay sniffing.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {[
            { label: "TikTok", url: "https://tiktok.com/@dognewsnetwork" },
            { label: "Instagram", url: "https://instagram.com/dognewsnetwork" },
            { label: "YouTube", url: "https://youtube.com/@DogNewsNetwork" },
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
