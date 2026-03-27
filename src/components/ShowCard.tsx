import Link from "next/link";
import Image from "next/image";

interface ShowCardProps {
  title: string;
  tagline: string;
  description: string;
  color: string;
  bg: string;
  image?: string;
  imagePosition?: string;
  social?: {
    tiktok: string;
    instagram: string;
    youtube: string;
  };
  name?: string;
  href?: string;
  bgColor?: string;
}

export default function ShowCard({
  title,
  name,
  tagline,
  description,
  color,
  bg,
  bgColor,
  href,
  image,
  imagePosition,
}: ShowCardProps) {
  const displayName = name || title;
  const background = bgColor || bg;

  const slug = href || (() => {
    const t = (name || title).toLowerCase();
    if (t.includes("dnn")) return "/dnn";
    if (t.includes("sit stay")) return "/sitstayspill";
    if (t.includes("yard")) return "/theyard";
    if (t.includes("processing")) return "/processing";
    return "/";
  })();

  return (
    <Link href={slug} className="block show-card group">
      <div
        className="rounded-2xl overflow-hidden h-full flex flex-col border border-white/5"
        style={{ background }}
      >
        {/* Image */}
        {image && (
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image
              src={image}
              alt={displayName}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              style={{ objectPosition: imagePosition || 'center' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, ${background} 0%, transparent 50%)`,
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-8 md:p-10 flex flex-col flex-1 justify-between">
          <div>
            <h3
              className="text-2xl md:text-3xl font-[200] tracking-[0.05em] mb-2"
              style={{ color }}
            >
              {displayName}
            </h3>
            <p
              className="text-[13px] font-[200] tracking-[0.1em] italic opacity-70"
              style={{ color }}
            >
              {tagline}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5">
            <span
              className="text-[12px] font-[200] tracking-[0.15em] uppercase opacity-50 group-hover:opacity-80 transition-opacity"
              style={{ color }}
            >
              View show →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
