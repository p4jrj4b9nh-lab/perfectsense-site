import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Perfect Sense Productions for brand partnerships, licensing, and press inquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      {/* Hero */}
      <section className="flex items-center justify-center min-h-[60vh] px-6 text-center pt-24">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-[200] tracking-[0.04em] leading-none">
          Contact
          <span
            className="inline-block w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[20px] md:h-[20px] bg-[#0a0a0a] rounded-full ml-1"
            style={{ verticalAlign: '-0.05em' }}
            aria-hidden="true"
          />
        </h1>
      </section>

      {/* Email Section */}
      <section className="px-6 sm:px-10 lg:px-20 py-16 md:py-24 max-w-xl mx-auto text-center">
        <p className="text-sm font-[200] text-[#999] mb-6">
          For business, licensing or press inquiries or just to say hi.
        </p>
        <a
          href="mailto:hello@perfectsenseproductions.com"
          className="text-lg sm:text-xl font-[200] tracking-[0.02em] text-[#0a0a0a] hover:opacity-60 transition-opacity"
        >
          hello@perfectsenseproductions.com
        </a>
      </section>
    </div>
  );
}
