"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: wire to backend or form service
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg font-[200] text-[#0a0a0a] mb-3">Message sent.</p>
        <p className="text-sm font-[200] text-[#999]">
          We&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-[11px] font-[200] tracking-[0.2em] uppercase text-[#999] mb-2"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full px-4 py-3 text-[14px] font-[200] bg-transparent border border-black/10 text-[#0a0a0a] placeholder:text-[#bbb] focus:border-black/30 transition-colors rounded-none"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-[11px] font-[200] tracking-[0.2em] uppercase text-[#999] mb-2"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-3 text-[14px] font-[200] bg-transparent border border-black/10 text-[#0a0a0a] placeholder:text-[#bbb] focus:border-black/30 transition-colors rounded-none"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-[11px] font-[200] tracking-[0.2em] uppercase text-[#999] mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What can we help with?"
          className="w-full px-4 py-3 text-[14px] font-[200] bg-transparent border border-black/10 text-[#0a0a0a] placeholder:text-[#bbb] focus:border-black/30 transition-colors rounded-none resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 text-[12px] font-[400] tracking-[0.15em] uppercase bg-[#0a0a0a] text-white hover:opacity-80 transition-opacity"
      >
        Send Message
      </button>
    </form>
  );
}
