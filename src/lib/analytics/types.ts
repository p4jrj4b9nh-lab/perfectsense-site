/* ── Analytics Engine – Type Definitions ── */

export interface Show {
  id: number;
  slug: string;
  name: string;
  color: string;
  youtube_handle: string | null;
  tiktok_handle: string | null;
  instagram_handle: string | null;
}

export interface Episode {
  id: number;
  show_id: number;
  number: number;
  title: string;
  episode_type: string | null; // 'dog_life' | 'hot_take' | 'arc' | etc.
  launch_date: string | null; // ISO date string
  created_at: string;
}

export type Platform =
  | "tiktok"
  | "instagram_reels"
  | "instagram_feed"
  | "instagram_stories"
  | "youtube_shorts";

export type AssetType = "video" | "carousel" | "meme" | "story" | "quote_graphic";

export interface Post {
  id: number;
  episode_id: number;
  platform: Platform;
  asset_type: AssetType;
  external_id: string | null;
  external_url: string | null;
  caption: string | null;
  posted_at: string | null;
  created_at: string;
}

export interface MetricSnapshot {
  id: number;
  post_id: number;
  captured_at: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  avg_watch_pct: number | null;
  reach: number;
  impressions: number;
}

export interface AccountDaily {
  id: number;
  show_id: number;
  platform: string;
  date: string;
  followers: number;
  new_followers: number;
  profile_visits: number;
}

/* ── Aggregated / Computed Types ── */

export interface EpisodeWithMetrics extends Episode {
  show_slug: string;
  show_name: string;
  posts: PostWithMetrics[];
  totals: AggregatedMetrics;
}

export interface PostWithMetrics extends Post {
  latest_metrics: MetricSnapshot | null;
}

export interface AggregatedMetrics {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  avg_watch_pct: number | null;
  engagement_rate: number; // (likes + comments + shares + saves) / views
  share_rate: number; // shares / views
  comment_rate: number; // comments / views
}

export interface ShowDashboard {
  show: Show;
  episodes: EpisodeWithMetrics[];
  kpis: KPIReport;
  platform_breakdown: PlatformBreakdown[];
  daily_trend: DailyTrend[];
}

export interface KPIReport {
  avg_watch_pct: number | null;
  share_rate: number;
  comment_rate: number;
  follower_conversion: number | null;
  total_views: number;
  total_followers: number;
  total_episodes: number;
  total_posts: number;
  top_episode: { title: string; views: number } | null;
  top_platform: { platform: string; views: number } | null;
}

export interface PlatformBreakdown {
  platform: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  post_count: number;
}

export interface DailyTrend {
  date: string;
  views: number;
  followers: number;
  engagement_rate: number;
}

/* ── KPI Targets (from launch plan) ── */

export const KPI_TARGETS = {
  avg_watch_pct: 75, // >75% of video length
  share_rate: 2, // >2% of views
  follower_conversion: 3, // >3% of profile visits
  comment_rate: 1, // >1% of views
} as const;

/* ── Show Registry ── */

export const SHOWS: Omit<Show, "id">[] = [
  {
    slug: "sss",
    name: "Sit Stay Spill",
    color: "#ff6eb4",
    youtube_handle: "@sitstayspill_show",
    tiktok_handle: "@sitstayspill_show",
    instagram_handle: "@sitstayspillshow",
  },
  {
    slug: "dnn",
    name: "DNN",
    color: "#4a9eff",
    youtube_handle: "@dnnshow",
    tiktok_handle: "@dnn_show",
    instagram_handle: "@dnn_show",
  },
  {
    slug: "theyard",
    name: "The Yard",
    color: "#d4a24e",
    youtube_handle: "@theyard_show",
    tiktok_handle: "@the.yard12",
    instagram_handle: "@theyard_show",
  },
  {
    slug: "processing",
    name: "...processing",
    color: "#00d4ff",
    youtube_handle: "@processing_show",
    tiktok_handle: "@processing_show",
    instagram_handle: "@processing.show",
  },
];

/* ── SSS Launch Slate Episodes ── */

export const SSS_EPISODES: Omit<Episode, "id" | "show_id" | "created_at">[] = [
  { number: 1, title: "The Other Dog", episode_type: "dog_life", launch_date: "2026-03-31" },
  { number: 2, title: "The Spin", episode_type: "dog_life", launch_date: "2026-04-04" },
  { number: 3, title: "W-A-L-K", episode_type: "dog_life", launch_date: "2026-03-31" },
  { number: 4, title: "The Pocket Pat", episode_type: "dog_life", launch_date: "2026-04-01" },
  { number: 5, title: "The Bench Dogs", episode_type: "dog_life", launch_date: "2026-04-02" },
  { number: 6, title: "The Walk", episode_type: "arc", launch_date: "2026-04-06" },
  { number: 7, title: "The Good Perfume", episode_type: "arc", launch_date: "2026-04-07" },
  { number: 8, title: "Cats", episode_type: "hot_take", launch_date: "2026-04-01" },
  { number: 9, title: "Good Girl", episode_type: "hot_take", launch_date: "2026-04-03" },
  { number: 10, title: "The Head Tilt", episode_type: "dog_life", launch_date: "2026-04-08" },
];
