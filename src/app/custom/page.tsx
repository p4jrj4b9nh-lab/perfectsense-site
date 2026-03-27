import type { Metadata } from "next";
import EmailSignup from "@/components/EmailSignup";

export const metadata: Metadata = {
  title: "Custom Videos",
  description:
    "Personalized video messages from any Perfect Sense Productions character. Birthday messages, roasts, pep talks, and more.",
};

export default function CustomPage() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center pt-24 max-w-3xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-[200] tracking-[0.04em] leading-none mb-6">
          Custom Videos
          <span
            className="inline-block w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[20px] md:h-[20px] bg-[#0a0a0a] rounded-full ml-1"
            style={{ verticalAlign: '-0.05em' }}
            aria-hidden="true"
          />
        </h1>
        <p className="text-base sm:text-lg font-[200] text-[#666] leading-[1.9] mb-10">
          Personalized video messages from any character.
        </p>
        <p className="text-xs font-[200] tracking-[6px] uppercase text-[#999]">
          Coming Soon
        </p>
      </section>

      {/* Email Signup */}
      <section className="px-6 sm:px-10 lg:px-20 py-24 md:py-32 max-w-2xl mx-auto">
        <EmailSignup heading="Join the waitlist." dark={false} accentColor="#0a0a0a" />
      </section>
    </div>
  );
}
