import { getLatestVideos, type YouTubeVideo } from "@/lib/youtube";
import Image from "next/image";

interface Props {
  /** YouTube handle, e.g. "@dnnshow" */
  handle: string;
  /** Show accent color */
  color: string;
  /** Section heading (default "Latest Episodes") */
  heading?: string;
  /** Placeholder text when no videos yet */
  placeholder?: string;
  /** Max videos to show */
  count?: number;
}

export default async function YouTubeEpisodes({
  handle,
  color,
  heading = "Latest Episodes",
  placeholder = "Coming Soon",
  count = 8,
}: Props) {
  const videos: YouTubeVideo[] = await getLatestVideos(handle, count);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex items-center gap-4 mb-12">
        <h2
          className="text-[11px] font-[200] tracking-[0.3em] uppercase"
          style={{ color, opacity: 0.4 }}
        >
          {heading}
        </h2>
        <div className="h-[1px] flex-1" style={{ backgroundColor: color, opacity: 0.1 }} />
      </div>

      {videos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {videos.map((video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden mb-3 border"
                style={{ borderColor: `${color}15` }}
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {/* Play icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                  <svg
                    className="w-12 h-12 text-white drop-shadow-lg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <p className="text-[13px] font-[200] text-[#999] line-clamp-2 group-hover:text-white transition-colors">
                {video.title}
              </p>
            </a>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[9/16] rounded-2xl border flex items-center justify-center"
              style={{
                borderColor: `${color}18`,
                backgroundColor: `${color}05`,
              }}
            >
              <span className="text-[13px] font-[200] text-[#444]">
                {placeholder}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
