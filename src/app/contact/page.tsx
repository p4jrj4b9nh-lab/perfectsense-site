import type { Metadata } from "next";
import EmailSignup from "@/components/EmailSignup";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Perfect Sense Productions for brand partnerships, licensing, and press inquiries.",
};

const socials = [
  {
    label: "DNN — Dog News Network",
    tiktok: "https://tiktok.com/@dnn_show",
    instagram: "https://instagram.com/dnn_show",
    youtube: "https://youtube.com/@dnnshow",
  },
  {
    label: "Sit Stay Spill",
    tiktok: "https://tiktok.com/@sitstayspill_show",
    instagram: "https://instagram.com/sitstayspill_show",
    youtube: "https://youtube.com/@sitstayspill_show",
  },
  {
    label: "The Yard",
    tiktok: "https://tiktok.com/@the.yard12",
    instagram: "https://instagram.com/theyard_show",
    youtube: "https://youtube.com/@theyard_show",
  },
  {
    label: "...processing",
    tiktok: "https://tiktok.com/@processing_show",
    instagram: "https://instagram.com/processing.show",
    youtube: "https://youtube.com/@processing_show",
  },
];

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52V6.84a4.84 4.84 0 01-1-.15z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 00.5 6.19 31.64 31.64 0 000 12a31.64 31.64 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.84.55 9.38.55 9.38.55s7.54 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.64 31.64 0 0024 12a31.64 31.64 0 00-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      {/* Hero */}
      <section className="flex items-center justify-center min-h-[50vh] px-6 text-center pt-24">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-[200] tracking-[0.04em] leading-none">
          Contact
          <span
            className="inline-block w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[20px] md:h-[20px] bg-[#0a0a0a] rounded-full ml-1"
            style={{ verticalAlign: '-0.05em' }}
            aria-hidden="true"
          />
        </h1>
      </section>

      {/* GET IN TOUCH */}
      <section className="px-6 sm:px-10 lg:px-20 py-16 max-w-2xl mx-auto text-center">
        <p className="text-[11px] font-[200] tracking-[0.2em] uppercase text-[#999] mb-6">
          Get in Touch
        </p>
        <a
          href="mailto:hello@perfectsenseproductions.com"
          className="text-lg sm:text-xl font-[200] tracking-[0.02em] text-[#0a0a0a] hover:opacity-60 transition-opacity"
        >
          hello@perfectsenseproductions.com
        </a>
      </section>

      {/* FOLLOW US */}
      <section className="px-6 sm:px-10 lg:px-20 py-16 max-w-2xl mx-auto text-center border-t border-black/10">
        <p className="text-[11px] font-[200] tracking-[0.2em] uppercase text-[#999] mb-10">
          Follow Us
        </p>
        <div className="space-y-8">
          {socials.map((account) => (
            <div key={account.label}>
              <p className="text-sm font-[200] text-[#0a0a0a] mb-3">
                {account.label}
              </p>
              <div className="flex items-center justify-center gap-5">
                {account.tiktok && (
                  <a href={account.tiktok} target="_blank" rel="noopener noreferrer" className="text-[#666] hover:text-[#0a0a0a] transition-colors" aria-label={`${account.label} on TikTok`}>
                    <TikTokIcon />
                  </a>
                )}
                <a href={account.instagram} target="_blank" rel="noopener noreferrer" className="text-[#666] hover:text-[#0a0a0a] transition-colors" aria-label={`${account.label} on Instagram`}>
                  <InstagramIcon />
                </a>
                <a href={account.youtube} target="_blank" rel="noopener noreferrer" className="text-[#666] hover:text-[#0a0a0a] transition-colors" aria-label={`${account.label} on YouTube`}>
                  <YouTubeIcon />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STAY UPDATED */}
      <section className="px-6 sm:px-10 lg:px-20 py-16 md:py-24 max-w-2xl mx-auto text-center border-t border-black/10">
        <p className="text-[11px] font-[200] tracking-[0.2em] uppercase text-[#999] mb-8">
          Stay Updated
        </p>
        <div className="flex justify-center">
          <EmailSignup
            heading=""
            dark={false}
            accentColor="#0a0a0a"
          />
        </div>
      </section>
    </div>
  );
}
