"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const shows = [
  { name: "DNN", href: "/dnn", color: "#4a9eff" },
  { name: "Sit Stay Spill", href: "/sitstayspill", color: "#ff6eb4" },
  { name: "The Yard", href: "/theyard", color: "#d4a24e" },
  { name: "...processing", href: "/processing", color: "#00d4ff" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showsOpen, setShowsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-0 group">
          <span className="text-lg font-[200] tracking-[0.15em] text-[#0a0a0a]">
            Perfect Sense
          </span>
          <span className="inline-block w-[7px] h-[7px] bg-[#0a0a0a] rounded-full ml-[3px]" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {/* Shows dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setShowsOpen(!showsOpen)}
              className="text-[13px] font-[200] tracking-[0.1em] text-[#666] hover:text-[#0a0a0a] transition-colors flex items-center gap-1"
            >
              Shows
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transition-transform ${showsOpen ? "rotate-180" : ""}`}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {showsOpen && (
              <div className="absolute top-full left-0 mt-3 bg-white border border-black/5 rounded-lg shadow-lg py-2 min-w-[180px]">
                {shows.map((show) => (
                  <Link
                    key={show.href}
                    href={show.href}
                    onClick={() => setShowsOpen(false)}
                    className="block px-4 py-2 text-[13px] font-[200] text-[#666] hover:text-[#0a0a0a] hover:bg-[#f5f5f5] transition-colors"
                  >
                    {show.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/shop"
            className="text-[13px] font-[200] tracking-[0.1em] text-[#666] hover:text-[#0a0a0a] transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/custom"
            className="text-[13px] font-[200] tracking-[0.1em] text-[#666] hover:text-[#0a0a0a] transition-colors"
          >
            Custom Videos
          </Link>
          <Link
            href="/contact"
            className="text-[13px] font-[200] tracking-[0.1em] text-[#666] hover:text-[#0a0a0a] transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1px] bg-[#0a0a0a] transition-transform ${isOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-5 h-[1px] bg-[#0a0a0a] transition-opacity ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[1px] bg-[#0a0a0a] transition-transform ${isOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-black/5 px-6 py-8 space-y-6">
          <div className="space-y-1">
            <p className="text-[10px] font-[200] tracking-[0.3em] uppercase text-[#999] mb-3">Shows</p>
            {shows.map((show) => (
              <Link
                key={show.href}
                href={show.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-[15px] font-[200] transition-colors"
                style={{ color: show.color }}
              >
                {show.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-black/5 pt-4 space-y-1">
            {[
              { name: "Shop", href: "/shop" },
              { name: "Custom Videos", href: "/custom" },
              { name: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-[15px] font-[200] text-[#666] hover:text-[#0a0a0a] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
