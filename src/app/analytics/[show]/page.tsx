import { notFound } from "next/navigation";
import {
  getShowBySlug,
  getKPIReport,
  getPlatformBreakdown,
  getEpisodesWithMetrics,
} from "@/lib/analytics/db";
import { KPI_TARGETS } from "@/lib/analytics/types";
import KPICard from "@/components/analytics/KPICard";
import MetricsTable from "@/components/analytics/MetricsTable";
import SyncButton from "@/components/analytics/SyncButton";

interface ShowPageProps {
  params: Promise<{ show: string }>;
}

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toLocaleString();
}

function platformLabel(p: string): string {
  const map: Record<string, string> = {
    tiktok: "TikTok",
    instagram_reels: "IG Reels",
    instagram_feed: "IG Feed",
    instagram_stories: "IG Stories",
    youtube_shorts: "YT Shorts",
  };
  return map[p] || p;
}

export default async function ShowDashboard({ params }: ShowPageProps) {
  const { show: slug } = await params;
  const show = await getShowBySlug(slug);

  if (!show) {
    notFound();
  }

  const [kpis, platforms, episodes] = await Promise.all([
    getKPIReport(show.id),
    getPlatformBreakdown(show.id),
    getEpisodesWithMetrics(show.id),
  ]);

  return (
    <div className="space-y-10">
      {/* Show Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: show.color }}
          />
          <h1 className="text-3xl font-[200] tracking-wide text-white/90">
            {show.name}
          </h1>
        </div>
        <SyncButton showSlug={show.slug} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <KPICard
          label="Avg Watch %"
          value={kpis.avg_watch_pct !== null ? kpis.avg_watch_pct.toFixed(1) : "--"}
          target={KPI_TARGETS.avg_watch_pct}
          suffix="%"
          color={show.color}
        />
        <KPICard
          label="Share Rate"
          value={kpis.share_rate.toFixed(2)}
          target={KPI_TARGETS.share_rate}
          suffix="%"
          color={show.color}
        />
        <KPICard
          label="Comment Rate"
          value={kpis.comment_rate.toFixed(2)}
          target={KPI_TARGETS.comment_rate}
          suffix="%"
          color={show.color}
        />
        <KPICard
          label="Total Views"
          value={fmt(kpis.total_views)}
          color={show.color}
        />
        <KPICard
          label="Followers"
          value={fmt(kpis.total_followers)}
          color={show.color}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
          <p className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-[300]">
            Episodes
          </p>
          <p className="text-xl font-[200] text-white/80 mt-1">
            {kpis.total_episodes}
          </p>
        </div>
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
          <p className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-[300]">
            Posts
          </p>
          <p className="text-xl font-[200] text-white/80 mt-1">
            {kpis.total_posts}
          </p>
        </div>
        {kpis.top_episode && (
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
            <p className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-[300]">
              Top Episode
            </p>
            <p className="text-sm font-[200] text-white/70 mt-1 truncate">
              {kpis.top_episode.title}
            </p>
            <p className="text-xs font-[200] text-white/30">
              {fmt(kpis.top_episode.views)} views
            </p>
          </div>
        )}
        {kpis.top_platform && (
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
            <p className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-[300]">
              Top Platform
            </p>
            <p className="text-sm font-[200] text-white/70 mt-1">
              {platformLabel(kpis.top_platform.platform)}
            </p>
            <p className="text-xs font-[200] text-white/30">
              {fmt(kpis.top_platform.views)} views
            </p>
          </div>
        )}
      </div>

      {/* Platform Breakdown */}
      {platforms.length > 0 && (
        <div>
          <h2 className="text-lg font-[200] tracking-wide text-white/60 mb-4">
            Platform Breakdown
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {platforms.map((p) => {
              const engRate =
                p.views > 0
                  ? (
                      ((p.likes + p.comments + p.shares + p.saves) / p.views) *
                      100
                    ).toFixed(1)
                  : "0.0";
              const shareRate =
                p.views > 0 ? ((p.shares / p.views) * 100).toFixed(2) : "0.00";

              return (
                <div
                  key={p.platform}
                  className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-[300] text-white/70">
                      {platformLabel(p.platform)}
                    </h3>
                    <span className="text-xs font-[200] text-white/30">
                      {p.post_count} posts
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs font-[200]">
                    <div>
                      <p className="text-white/30">Views</p>
                      <p className="text-white/70">{fmt(p.views)}</p>
                    </div>
                    <div>
                      <p className="text-white/30">Likes</p>
                      <p className="text-white/70">{fmt(p.likes)}</p>
                    </div>
                    <div>
                      <p className="text-white/30">Comments</p>
                      <p className="text-white/70">{fmt(p.comments)}</p>
                    </div>
                    <div>
                      <p className="text-white/30">Shares</p>
                      <p className="text-white/70">{fmt(p.shares)}</p>
                    </div>
                    <div>
                      <p className="text-white/30">Eng %</p>
                      <p className="text-white/70">{engRate}%</p>
                    </div>
                    <div>
                      <p className="text-white/30">Share %</p>
                      <p className="text-white/70">{shareRate}%</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Episode Performance Table */}
      <div>
        <h2 className="text-lg font-[200] tracking-wide text-white/60 mb-4">
          Episode Performance
        </h2>
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
          <MetricsTable episodes={episodes} />
        </div>
      </div>
    </div>
  );
}
