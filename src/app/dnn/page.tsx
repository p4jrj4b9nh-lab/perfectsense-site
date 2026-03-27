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
  {
    name: "Barkley McSnoot",
    role: "Lead Anchor",
    breed: "Great Dane",
    description:
      "The most trusted name in dog news. Unshakeable on-camera presence with a voice that commands attention.",
  },
  {
    name: "Diane Pawson",
    role: "Lead Anchor",
    breed: "Standard Poodle",
    description:
      "Sharp, precise, the kind of anchor who makes you feel like everything is under control even when it clearly isn't.",
  },
  {
    name: "Scraps McGraw",
    role: "Field Reporter",
    breed: "Mutt",
    description:
      "Reports live from the scene. Things go wrong. He commits anyway.",
  },
  {
    name: "Sir Nigel Barksworth",
    role: "International Correspondent",
    breed: "English Bulldog",
    description:
      "Reports from abroad with the gravitas of someone who has seen too much.",
  },
  {
    name: "Milton Greyhound",
    role: "Financial Analyst",
    breed: "Greyhound",
    description:
      "Tracks the treat economy with the intensity of a Wall Street trader.",
  },
  {
    name: "Vera Pawston",
    role: "Legal Analyst",
    breed: "German Shepherd",
    description:
      "Breaks down dog law with the precision of a Supreme Court clerk.",
  },
  {
    name: "Dr. Reed",
    role: "Health Correspondent",
    breed: "Golden Retriever",
    description:
      "Covers veterinary science and wellness with genuine concern for public health.",
  },
  {
    name: "Arlo",
    role: "Political Commentator (Progressive)",
    breed: "Border Collie",
    description:
      "Passionate, principled, absolutely certain he's right about everything.",
  },
  {
    name: "Steele",
    role: "Political Commentator (Conservative)",
    breed: "Rottweiler",
    description:
      "Tradition, order, discipline. The yard has rules for a reason.",
  },
  {
    name: "Duchess",
    role: "Lifestyle & Culture",
    breed: "Afghan Hound",
    description:
      "Covers culture and lifestyle from a position of effortless superiority.",
  },
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

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16 md:pb-24">
          {/* Breaking news bar */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block px-3 py-1 bg-red-600 text-white text-[10px] font-[400] tracking-[0.2em] uppercase">
              Live
            </span>
            <div className="h-[1px] flex-1 bg-[#4a9eff]/30" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {characters.map((c) => (
            <CharacterProfile key={c.name} {...c} color={SHOW_COLOR} />
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
