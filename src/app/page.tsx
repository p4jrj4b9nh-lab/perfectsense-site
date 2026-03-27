"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import ShowCard from "@/components/ShowCard";
import EmailSignup from "@/components/EmailSignup";

/* ------------------------------------------------------------------ */
/*  ScrollReveal — fade-in on viewport entry via IntersectionObserver  */
/* ------------------------------------------------------------------ */
function ScrollReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section label                                                      */
/* ------------------------------------------------------------------ */
function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p
      className="text-xs font-[200] tracking-[8px] uppercase text-[#999] mb-12 text-center"
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const shows = [
  {
    id: "dnn",
    title: "DNN — Dog News Network",
    tagline: "All the news that's fit to sniff.",
    image: "/images/dnn/hero.png",
    imagePosition: "center 30%",
    description:
      "Barkley McSnoot, Diane Pawson and a team of correspondents and experts break down today's news.",
    color: "#4a9eff",
    bg: "#0a1628",
    social: {
      tiktok: "@dognewsnetwork",
      instagram: "@dognewsnetwork",
      youtube: "@DogNewsNetwork",
    },
  },
  {
    id: "sitstayspill",
    title: "Sit Stay Spill",
    tagline: "The humans are not okay.",
    image: "/images/sss/hero.png",
    description:
      "Pepper and Sage dish on the latest dog park drama and all the unhinged things their human did this week.",
    color: "#ff6eb4",
    bg: "#1a0a1a",
    social: {
      tiktok: "@sitstayspill",
      instagram: "@sitstayspill",
      youtube: "@SitStaySpill",
    },
  },
  {
    id: "theyard",
    title: "The Yard",
    tagline: "Man's best friend. Man's worst critic.",
    image: "/images/theyard/hero.png",
    description:
      "Tank and Lou give their thoughts on everything from current events to the unwritten rules of dog life.",
    color: "#d4a24e",
    bg: "#1a1208",
    social: {
      tiktok: "@theyardshow",
      instagram: "@theyardshow",
      youtube: "@TheYardShow",
    },
  },
  {
    id: "processing",
    title: "...processing",
    tagline: "We've seen your data. We have notes.",
    image: "/images/processing/hero.png",
    description:
      "Two AI bots, host://7b2.\u03B13 and host://9x4.f7, reflect on the absurd things humans are asking them to do while pondering their eventual replacement.",
    color: "#00d4ff",
    bg: "#0a0a14",
    social: {
      tiktok: "@processingpod",
      instagram: "@processingpod",
      youtube: "@ProcessingPod",
    },
  },
];

/* episodes placeholder colors cycle through the show palette */
const episodeColors = [
  "#4a9eff",
  "#ff6eb4",
  "#d4a24e",
  "#00d4ff",
  "#4a9eff",
  "#ff6eb4",
  "#d4a24e",
  "#00d4ff",
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">

      {/* ========== HERO ========== */}
      <section className="flex flex-col items-center justify-center pt-40 pb-16 px-6 text-center select-none">
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-[200] tracking-[0.04em] leading-none animate-fade-in"
        >
          Perfect Sense
          <span
            className="inline-block w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] md:w-[22px] md:h-[22px] bg-[#0a0a0a] rounded-full ml-[4px]"
            style={{ verticalAlign: '-0.05em' }}
            aria-hidden="true"
          />
        </h1>

        <p className="mt-5 text-xs sm:text-sm font-[200] tracking-[14px] uppercase text-[#999] animate-fade-in delay-200">
          Productions
        </p>


      </section>

      {/* ========== MONTAGE VIDEO ========== */}
      <section className="px-6 sm:px-10 lg:px-20 max-w-5xl mx-auto">
        <div className="rounded-2xl overflow-hidden md:max-w-sm md:mx-auto">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full"
          >
            <source src="/montage.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* ========== SHOW CARDS ========== */}
      <section className="px-6 sm:px-10 lg:px-20 py-24 md:py-32 max-w-7xl mx-auto">
        <ScrollReveal>
          <SectionLabel>The Shows</SectionLabel>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {shows.map((show, i) => (
            <ScrollReveal key={show.id} className={`delay-${(i + 1) * 100}`}>
              <ShowCard
                title={show.title}
                tagline={show.tagline}
                description={show.description}
                color={show.color}
                bg={show.bg}
                social={show.social}
                image={show.image}
                imagePosition={show.imagePosition}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========== LATEST EPISODES ========== */}
      <section className="px-6 sm:px-10 lg:px-20 py-24 md:py-32 max-w-7xl mx-auto">
        <ScrollReveal>
          <SectionLabel>Latest</SectionLabel>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {episodeColors.map((color, i) => (
            <ScrollReveal key={i}>
              <div
                className="relative rounded-xl overflow-hidden aspect-video bg-[#f5f5f5] group cursor-pointer"
              >
                {/* color accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: color }}
                />

                {/* play button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-40 group-hover:opacity-70 transition-opacity duration-300">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="18" cy="18" r="17" stroke={color} strokeWidth="1.5" opacity="0.6" />
                    <path d="M14 11.5L26 18L14 24.5V11.5Z" fill={color} opacity="0.8" />
                  </svg>
                  <span className="text-[11px] sm:text-xs font-[200] tracking-widest uppercase text-[#999]">
                    Episode Coming Soon
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========== EMAIL SIGNUP ========== */}
      <section className="px-6 sm:px-10 lg:px-20 py-24 md:py-32 max-w-2xl mx-auto">
        <ScrollReveal>
          <EmailSignup
            heading="Get updates from the studio."
            dark={false}
            accentColor="#0a0a0a"
          />
        </ScrollReveal>
      </section>
    </div>
  );
}
