interface SocialLinksProps {
  tiktok?: string;
  instagram?: string;
  youtube?: string;
  color?: string;
  size?: "sm" | "md";
}

export default function SocialLinks({ tiktok, instagram, youtube, color = "#999", size = "md" }: SocialLinksProps) {
  const textSize = size === "sm" ? "text-[12px]" : "text-[14px]";
  const gap = size === "sm" ? "gap-4" : "gap-6";

  const links = [
    { label: "TikTok", url: tiktok },
    { label: "Instagram", url: instagram },
    { label: "YouTube", url: youtube },
  ].filter((l) => l.url);

  return (
    <div className={`flex items-center ${gap}`}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.url!}
          target="_blank"
          rel="noopener noreferrer"
          className={`${textSize} font-[200] tracking-[0.1em] hover:opacity-100 transition-opacity opacity-70`}
          style={{ color }}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
