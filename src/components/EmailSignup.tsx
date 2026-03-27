"use client";

import { useState } from "react";

interface EmailSignupProps {
  heading?: string;
  placeholder?: string;
  buttonText?: string;
  accentColor?: string;
  dark?: boolean;
}

export default function EmailSignup({
  heading = "Get updates from the studio.",
  placeholder = "your@email.com",
  buttonText = "Subscribe",
  accentColor = "#ffffff",
  dark = true,
}: EmailSignupProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: wire to Formspree, Mailchimp, etc.
    setSubmitted(true);
  };

  return (
    <div>
      <p className={`text-[13px] font-[200] tracking-[0.15em] mb-6 ${dark ? "text-[#999]" : "text-[#666]"}`}>
        {heading}
      </p>
      {submitted ? (
        <p className="text-[14px] font-[200]" style={{ color: accentColor }}>
          You&apos;re in. We&apos;ll be in touch.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className={`flex-1 px-4 py-3 text-[14px] font-[200] rounded-none border bg-transparent focus:border-white/40 transition-colors ${
              dark ? "border-white/10 text-white placeholder:text-[#555]" : "border-black/10 text-black placeholder:text-[#aaa]"
            }`}
          />
          <button
            type="submit"
            className="px-6 py-3 text-[12px] font-[400] tracking-[0.15em] uppercase transition-opacity hover:opacity-80"
            style={{ background: accentColor, color: accentColor === "#ffffff" ? "#0a0a0a" : "#ffffff" }}
          >
            {buttonText}
          </button>
        </form>
      )}
    </div>
  );
}
