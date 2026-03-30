import { sql } from "@vercel/postgres";
import type {
  Show,
  Episode,
  Post,
  MetricSnapshot,
  AccountDaily,
  Platform,
  AssetType,
  AggregatedMetrics,
  EpisodeWithMetrics,
  PostWithMetrics,
  KPIReport,
  PlatformBreakdown,
  DailyTrend,
} from "./types";

/* ═══════════════════════════════════════════
   MIGRATION — run once to create tables
   ═══════════════════════════════════════════ */

export async function migrate() {
  await sql`
    CREATE TABLE IF NOT EXISTS shows (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(50) UNIQUE NOT NULL,
      name VARCHAR(100) NOT NULL,
      color VARCHAR(20) DEFAULT '#ffffff',
      youtube_handle VARCHAR(100),
      tiktok_handle VARCHAR(100),
      instagram_handle VARCHAR(100)
    )`;

  await sql`
    CREATE TABLE IF NOT EXISTS episodes (
      id SERIAL PRIMARY KEY,
      show_id INT REFERENCES shows(id) ON DELETE CASCADE,
      number INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      episode_type VARCHAR(50),
      launch_date DATE,
      created_at TIMESTAMP DEFAULT NOW()
    )`;

  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      episode_id INT REFERENCES episodes(id) ON DELETE CASCADE,
      platform VARCHAR(30) NOT NULL,
      asset_type VARCHAR(30) NOT NULL DEFAULT 'video',
      external_id VARCHAR(255),
      external_url VARCHAR(500),
      caption TEXT,
      posted_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW()
    )`;

  await sql`
    CREATE TABLE IF NOT EXISTS metrics (
      id SERIAL PRIMARY KEY,
      post_id INT REFERENCES posts(id) ON DELETE CASCADE,
      captured_at TIMESTAMP DEFAULT NOW(),
      views INT DEFAULT 0,
      likes INT DEFAULT 0,
      comments INT DEFAULT 0,
      shares INT DEFAULT 0,
      saves INT DEFAULT 0,
      avg_watch_pct DECIMAL(5,2),
      reach INT DEFAULT 0,
      impressions INT DEFAULT 0
    )`;

  await sql`
    CREATE TABLE IF NOT EXISTS account_daily (
      id SERIAL PRIMARY KEY,
      show_id INT REFERENCES shows(id) ON DELETE CASCADE,
      platform VARCHAR(30) NOT NULL,
      date DATE NOT NULL,
      followers INT DEFAULT 0,
      new_followers INT DEFAULT 0,
      profile_visits INT DEFAULT 0,
      UNIQUE(show_id, platform, date)
    )`;

  // Indexes for common queries
  await sql`CREATE INDEX IF NOT EXISTS idx_episodes_show ON episodes(show_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_posts_episode ON posts(episode_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_metrics_post ON metrics(post_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_metrics_captured ON metrics(captured_at)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_account_daily_show ON account_daily(show_id, date)`;
}

/* ═══════════════════════════════════════════
   SHOWS
   ═══════════════════════════════════════════ */

export async function getShows(): Promise<Show[]> {
  const { rows } = await sql`SELECT * FROM shows ORDER BY name`;
  return rows as Show[];
}

export async function getShowBySlug(slug: string): Promise<Show | null> {
  const { rows } = await sql`SELECT * FROM shows WHERE slug = ${slug}`;
  return (rows[0] as Show) ?? null;
}

export async function upsertShow(show: Omit<Show, "id">): Promise<Show> {
  const { rows } = await sql`
    INSERT INTO shows (slug, name, color, youtube_handle, tiktok_handle, instagram_handle)
    VALUES (${show.slug}, ${show.name}, ${show.color}, ${show.youtube_handle}, ${show.tiktok_handle}, ${show.instagram_handle})
    ON CONFLICT (slug) DO UPDATE SET
      name = EXCLUDED.name,
      color = EXCLUDED.color,
      youtube_handle = EXCLUDED.youtube_handle,
      tiktok_handle = EXCLUDED.tiktok_handle,
      instagram_handle = EXCLUDED.instagram_handle
    RETURNING *`;
  return rows[0] as Show;
}

/* ═══════════════════════════════════════════
   EPISODES
   ═══════════════════════════════════════════ */

export async function getEpisodesByShow(showId: number): Promise<Episode[]> {
  const { rows } = await sql`
    SELECT * FROM episodes WHERE show_id = ${showId} ORDER BY launch_date, number`;
  return rows as Episode[];
}

export async function getEpisode(id: number): Promise<Episode | null> {
  const { rows } = await sql`SELECT * FROM episodes WHERE id = ${id}`;
  return (rows[0] as Episode) ?? null;
}

export async function createEpisode(ep: {
  show_id: number;
  number: number;
  title: string;
  episode_type?: string;
  launch_date?: string;
}): Promise<Episode> {
  const { rows } = await sql`
    INSERT INTO episodes (show_id, number, title, episode_type, launch_date)
    VALUES (${ep.show_id}, ${ep.number}, ${ep.title}, ${ep.episode_type ?? null}, ${ep.launch_date ?? null})
    RETURNING *`;
  return rows[0] as Episode;
}

/* ═══════════════════════════════════════════
   POSTS
   ═══════════════════════════════════════════ */

export async function getPostsByEpisode(episodeId: number): Promise<Post[]> {
  const { rows } = await sql`
    SELECT * FROM posts WHERE episode_id = ${episodeId} ORDER BY posted_at`;
  return rows as Post[];
}

export async function createPost(post: {
  episode_id: number;
  platform: Platform;
  asset_type: AssetType;
  external_id?: string;
  external_url?: string;
  caption?: string;
  posted_at?: string;
}): Promise<Post> {
  const { rows } = await sql`
    INSERT INTO posts (episode_id, platform, asset_type, external_id, external_url, caption, posted_at)
    VALUES (${post.episode_id}, ${post.platform}, ${post.asset_type},
            ${post.external_id ?? null}, ${post.external_url ?? null},
            ${post.caption ?? null}, ${post.posted_at ?? null})
    RETURNING *`;
  return rows[0] as Post;
}

export async function getPostByExternalId(externalId: string): Promise<Post | null> {
  const { rows } = await sql`SELECT * FROM posts WHERE external_id = ${externalId}`;
  return (rows[0] as Post) ?? null;
}

/* ═══════════════════════════════════════════
   METRICS
   ═══════════════════════════════════════════ */

export async function addMetricSnapshot(m: {
  post_id: number;
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  saves?: number;
  avg_watch_pct?: number;
  reach?: number;
  impressions?: number;
}): Promise<MetricSnapshot> {
  const { rows } = await sql`
    INSERT INTO metrics (post_id, views, likes, comments, shares, saves, avg_watch_pct, reach, impressions)
    VALUES (${m.post_id}, ${m.views ?? 0}, ${m.likes ?? 0}, ${m.comments ?? 0},
            ${m.shares ?? 0}, ${m.saves ?? 0}, ${m.avg_watch_pct ?? null},
            ${m.reach ?? 0}, ${m.impressions ?? 0})
    RETURNING *`;
  return rows[0] as MetricSnapshot;
}

export async function getLatestMetrics(postId: number): Promise<MetricSnapshot | null> {
  const { rows } = await sql`
    SELECT * FROM metrics WHERE post_id = ${postId}
    ORDER BY captured_at DESC LIMIT 1`;
  return (rows[0] as MetricSnapshot) ?? null;
}

export async function getMetricsHistory(postId: number): Promise<MetricSnapshot[]> {
  const { rows } = await sql`
    SELECT * FROM metrics WHERE post_id = ${postId}
    ORDER BY captured_at ASC`;
  return rows as MetricSnapshot[];
}

/* ═══════════════════════════════════════════
   ACCOUNT DAILY
   ═══════════════════════════════════════════ */

export async function upsertAccountDaily(a: {
  show_id: number;
  platform: string;
  date: string;
  followers: number;
  new_followers?: number;
  profile_visits?: number;
}): Promise<AccountDaily> {
  const { rows } = await sql`
    INSERT INTO account_daily (show_id, platform, date, followers, new_followers, profile_visits)
    VALUES (${a.show_id}, ${a.platform}, ${a.date}, ${a.followers},
            ${a.new_followers ?? 0}, ${a.profile_visits ?? 0})
    ON CONFLICT (show_id, platform, date) DO UPDATE SET
      followers = EXCLUDED.followers,
      new_followers = EXCLUDED.new_followers,
      profile_visits = EXCLUDED.profile_visits
    RETURNING *`;
  return rows[0] as AccountDaily;
}

export async function getAccountHistory(
  showId: number,
  platform?: string
): Promise<AccountDaily[]> {
  if (platform) {
    const { rows } = await sql`
      SELECT * FROM account_daily
      WHERE show_id = ${showId} AND platform = ${platform}
      ORDER BY date ASC`;
    return rows as AccountDaily[];
  }
  const { rows } = await sql`
    SELECT * FROM account_daily WHERE show_id = ${showId} ORDER BY date ASC`;
  return rows as AccountDaily[];
}

/* ═══════════════════════════════════════════
   AGGREGATION & REPORTING
   ═══════════════════════════════════════════ */

function aggregateMetrics(snapshots: (MetricSnapshot | null)[]): AggregatedMetrics {
  const valid = snapshots.filter((s): s is MetricSnapshot => s !== null);
  const totals = valid.reduce(
    (acc, m) => ({
      views: acc.views + m.views,
      likes: acc.likes + m.likes,
      comments: acc.comments + m.comments,
      shares: acc.shares + m.shares,
      saves: acc.saves + m.saves,
    }),
    { views: 0, likes: 0, comments: 0, shares: 0, saves: 0 }
  );

  const watchPcts = valid
    .map((m) => m.avg_watch_pct)
    .filter((p): p is number => p !== null);
  const avgWatch = watchPcts.length > 0
    ? watchPcts.reduce((a, b) => a + b, 0) / watchPcts.length
    : null;

  const totalEngagement = totals.likes + totals.comments + totals.shares + totals.saves;

  return {
    ...totals,
    avg_watch_pct: avgWatch,
    engagement_rate: totals.views > 0 ? (totalEngagement / totals.views) * 100 : 0,
    share_rate: totals.views > 0 ? (totals.shares / totals.views) * 100 : 0,
    comment_rate: totals.views > 0 ? (totals.comments / totals.views) * 100 : 0,
  };
}

export async function getEpisodesWithMetrics(showId: number): Promise<EpisodeWithMetrics[]> {
  const episodes = await getEpisodesByShow(showId);
  const show = (await sql`SELECT slug, name FROM shows WHERE id = ${showId}`).rows[0];

  const result: EpisodeWithMetrics[] = [];

  for (const ep of episodes) {
    const posts = await getPostsByEpisode(ep.id);
    const postsWithMetrics: PostWithMetrics[] = [];

    for (const post of posts) {
      const latest = await getLatestMetrics(post.id);
      postsWithMetrics.push({ ...post, latest_metrics: latest });
    }

    const totals = aggregateMetrics(postsWithMetrics.map((p) => p.latest_metrics));

    result.push({
      ...ep,
      show_slug: show?.slug ?? "",
      show_name: show?.name ?? "",
      posts: postsWithMetrics,
      totals,
    });
  }

  return result;
}

export async function getKPIReport(showId: number): Promise<KPIReport> {
  const episodes = await getEpisodesWithMetrics(showId);

  let totalViews = 0;
  let totalLikes = 0;
  let totalComments = 0;
  let totalShares = 0;
  let totalPosts = 0;
  const watchPcts: number[] = [];
  let topEp: { title: string; views: number } | null = null;

  for (const ep of episodes) {
    totalViews += ep.totals.views;
    totalLikes += ep.totals.likes;
    totalComments += ep.totals.comments;
    totalShares += ep.totals.shares;
    totalPosts += ep.posts.length;
    if (ep.totals.avg_watch_pct !== null) watchPcts.push(ep.totals.avg_watch_pct);
    if (!topEp || ep.totals.views > topEp.views) {
      topEp = { title: ep.title, views: ep.totals.views };
    }
  }

  // Platform breakdown for top platform
  const platformMap = new Map<string, number>();
  for (const ep of episodes) {
    for (const p of ep.posts) {
      if (p.latest_metrics) {
        const current = platformMap.get(p.platform) ?? 0;
        platformMap.set(p.platform, current + p.latest_metrics.views);
      }
    }
  }
  let topPlatform: { platform: string; views: number } | null = null;
  for (const [platform, views] of platformMap) {
    if (!topPlatform || views > topPlatform.views) {
      topPlatform = { platform, views };
    }
  }

  // Account followers
  const { rows: followerRows } = await sql`
    SELECT COALESCE(SUM(followers), 0) as total
    FROM account_daily
    WHERE show_id = ${showId}
    AND date = (SELECT MAX(date) FROM account_daily WHERE show_id = ${showId})`;
  const totalFollowers = Number(followerRows[0]?.total ?? 0);

  // Profile visits for follower conversion
  const { rows: visitRows } = await sql`
    SELECT COALESCE(SUM(profile_visits), 0) as total
    FROM account_daily WHERE show_id = ${showId}`;
  const totalVisits = Number(visitRows[0]?.total ?? 0);

  return {
    avg_watch_pct: watchPcts.length > 0
      ? watchPcts.reduce((a, b) => a + b, 0) / watchPcts.length
      : null,
    share_rate: totalViews > 0 ? (totalShares / totalViews) * 100 : 0,
    comment_rate: totalViews > 0 ? (totalComments / totalViews) * 100 : 0,
    follower_conversion: totalVisits > 0 ? (totalFollowers / totalVisits) * 100 : null,
    total_views: totalViews,
    total_followers: totalFollowers,
    total_episodes: episodes.length,
    total_posts: totalPosts,
    top_episode: topEp && topEp.views > 0 ? topEp : null,
    top_platform: topPlatform && topPlatform.views > 0 ? topPlatform : null,
  };
}

export async function getPlatformBreakdown(showId: number): Promise<PlatformBreakdown[]> {
  const { rows } = await sql`
    SELECT
      p.platform,
      COUNT(DISTINCT p.id) as post_count,
      COALESCE(SUM(m.views), 0) as views,
      COALESCE(SUM(m.likes), 0) as likes,
      COALESCE(SUM(m.comments), 0) as comments,
      COALESCE(SUM(m.shares), 0) as shares,
      COALESCE(SUM(m.saves), 0) as saves
    FROM posts p
    JOIN episodes e ON p.episode_id = e.id
    LEFT JOIN LATERAL (
      SELECT * FROM metrics WHERE post_id = p.id ORDER BY captured_at DESC LIMIT 1
    ) m ON true
    WHERE e.show_id = ${showId}
    GROUP BY p.platform
    ORDER BY views DESC`;

  return rows.map((r) => ({
    platform: r.platform as string,
    views: Number(r.views),
    likes: Number(r.likes),
    comments: Number(r.comments),
    shares: Number(r.shares),
    saves: Number(r.saves),
    post_count: Number(r.post_count),
  }));
}

export async function getDailyTrend(showId: number): Promise<DailyTrend[]> {
  const { rows } = await sql`
    SELECT
      DATE(m.captured_at) as date,
      COALESCE(SUM(m.views), 0) as views,
      COALESCE(
        CASE WHEN SUM(m.views) > 0
          THEN (SUM(m.likes + m.comments + m.shares + m.saves)::decimal / SUM(m.views)) * 100
          ELSE 0
        END, 0
      ) as engagement_rate
    FROM metrics m
    JOIN posts p ON m.post_id = p.id
    JOIN episodes e ON p.episode_id = e.id
    WHERE e.show_id = ${showId}
    GROUP BY DATE(m.captured_at)
    ORDER BY date ASC`;

  // Merge with follower data
  const { rows: followerRows } = await sql`
    SELECT date, SUM(followers) as followers
    FROM account_daily
    WHERE show_id = ${showId}
    GROUP BY date ORDER BY date ASC`;

  const followerMap = new Map(followerRows.map((r) => [r.date, Number(r.followers)]));

  return rows.map((r) => ({
    date: r.date as string,
    views: Number(r.views),
    followers: followerMap.get(r.date) ?? 0,
    engagement_rate: Number(Number(r.engagement_rate).toFixed(2)),
  }));
}
