/* ═══════════════════════════════════════════════════════════════════
   Analytics Analysis Engine

   Generates structured, actionable insights from raw metrics data.
   Designed to be consumed by Claude for conversational analysis.
   ═══════════════════════════════════════════════════════════════════ */

import {
  type EpisodeWithMetrics,
  type KPIReport,
  type PlatformBreakdown,
  type DailyTrend,
  type Show,
  type AccountDaily,
  KPI_TARGETS,
} from "./types";

/* ── Types ── */

export interface FullAnalysis {
  generated_at: string;
  show: Show;
  summary: string;
  health_score: number; // 0-100
  kpis: KPIAnalysis;
  episodes: EpisodeAnalysis;
  platforms: PlatformAnalysis;
  content_types: ContentTypeAnalysis;
  trends: TrendAnalysis;
  recommendations: Recommendation[];
  alerts: Alert[];
  raw_data: {
    kpi_report: KPIReport;
    platform_breakdown: PlatformBreakdown[];
    daily_trend: DailyTrend[];
    episodes: EpisodeWithMetrics[];
    account_history: AccountDaily[];
  };
}

export interface KPIAnalysis {
  overall_status: "exceeding" | "on_track" | "needs_attention" | "critical";
  metrics: {
    name: string;
    current: number | null;
    target: number;
    status: "exceeding" | "on_track" | "below" | "critical" | "no_data";
    delta_pct: number | null; // % above/below target
    insight: string;
  }[];
}

export interface EpisodeAnalysis {
  ranked: {
    rank: number;
    episode_number: number;
    title: string;
    episode_type: string | null;
    total_views: number;
    engagement_rate: number;
    share_rate: number;
    comment_rate: number;
    top_platform: string | null;
    insight: string;
  }[];
  best_performer: string | null;
  worst_performer: string | null;
  breakout_candidates: string[];
  content_insights: string[];
}

export interface PlatformAnalysis {
  ranked: {
    platform: string;
    views: number;
    engagement_rate: number;
    share_rate: number;
    avg_views_per_post: number;
    post_count: number;
    insight: string;
  }[];
  best_platform: string | null;
  cross_platform_insights: string[];
}

export interface ContentTypeAnalysis {
  by_type: {
    type: string;
    episode_count: number;
    avg_views: number;
    avg_engagement_rate: number;
    avg_share_rate: number;
    insight: string;
  }[];
  recommendation: string;
}

export interface TrendAnalysis {
  direction: "growing" | "stable" | "declining" | "insufficient_data";
  views_trend: string;
  engagement_trend: string;
  follower_trend: string;
  daily_insights: string[];
}

export interface Recommendation {
  priority: "high" | "medium" | "low";
  category: "content" | "platform" | "engagement" | "growth" | "timing";
  title: string;
  detail: string;
  based_on: string; // what data supports this
}

export interface Alert {
  severity: "critical" | "warning" | "info";
  message: string;
}

/* ── Helper Functions ── */

function kpiStatus(
  current: number | null,
  target: number
): "exceeding" | "on_track" | "below" | "critical" | "no_data" {
  if (current === null) return "no_data";
  const ratio = current / target;
  if (ratio >= 1.0) return "exceeding";
  if (ratio >= 0.7) return "on_track";
  if (ratio >= 0.4) return "below";
  return "critical";
}

function pctDelta(current: number | null, target: number): number | null {
  if (current === null) return null;
  return ((current - target) / target) * 100;
}

function formatPlatform(p: string): string {
  const map: Record<string, string> = {
    tiktok: "TikTok",
    instagram_reels: "Instagram Reels",
    instagram_feed: "Instagram Feed",
    instagram_stories: "Instagram Stories",
    youtube_shorts: "YouTube Shorts",
  };
  return map[p] ?? p;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

/* ── Main Analysis Function ── */

export function generateAnalysis(
  show: Show,
  kpiReport: KPIReport,
  platformBreakdown: PlatformBreakdown[],
  dailyTrend: DailyTrend[],
  episodes: EpisodeWithMetrics[],
  accountHistory: AccountDaily[]
): FullAnalysis {
  const kpis = analyzeKPIs(kpiReport);
  const episodeAnalysis = analyzeEpisodes(episodes);
  const platformAnalysis = analyzePlatforms(platformBreakdown);
  const contentTypeAnalysis = analyzeContentTypes(episodes);
  const trendAnalysis = analyzeTrends(dailyTrend, accountHistory);
  const recommendations = generateRecommendations(
    kpis,
    episodeAnalysis,
    platformAnalysis,
    contentTypeAnalysis,
    trendAnalysis,
    kpiReport
  );
  const alerts = generateAlerts(kpis, kpiReport, episodes);
  const healthScore = calculateHealthScore(kpis, episodeAnalysis, trendAnalysis);

  const summary = generateSummary(
    show,
    healthScore,
    kpiReport,
    episodeAnalysis,
    platformAnalysis,
    trendAnalysis
  );

  return {
    generated_at: new Date().toISOString(),
    show,
    summary,
    health_score: healthScore,
    kpis,
    episodes: episodeAnalysis,
    platforms: platformAnalysis,
    content_types: contentTypeAnalysis,
    trends: trendAnalysis,
    recommendations,
    alerts,
    raw_data: {
      kpi_report: kpiReport,
      platform_breakdown: platformBreakdown,
      daily_trend: dailyTrend,
      episodes,
      account_history: accountHistory,
    },
  };
}

/* ── KPI Analysis ── */

function analyzeKPIs(report: KPIReport): KPIAnalysis {
  const metrics = [
    {
      name: "Average Watch Time",
      current: report.avg_watch_pct,
      target: KPI_TARGETS.avg_watch_pct,
    },
    {
      name: "Share Rate",
      current: report.share_rate,
      target: KPI_TARGETS.share_rate,
    },
    {
      name: "Comment Rate",
      current: report.comment_rate,
      target: KPI_TARGETS.comment_rate,
    },
    {
      name: "Follower Conversion",
      current: report.follower_conversion,
      target: KPI_TARGETS.follower_conversion,
    },
  ];

  const analyzed = metrics.map((m) => {
    const status = kpiStatus(m.current, m.target);
    const delta = pctDelta(m.current, m.target);
    let insight = "";

    if (status === "no_data") {
      insight = `No data yet for ${m.name}. Start tracking to establish a baseline.`;
    } else if (status === "exceeding") {
      insight = `${m.name} is ${delta!.toFixed(0)}% above target (${m.current!.toFixed(1)}% vs ${m.target}% target). This is a strength — analyze what's driving it and double down.`;
    } else if (status === "on_track") {
      insight = `${m.name} is approaching target (${m.current!.toFixed(1)}% vs ${m.target}% target). Close to breakout — small optimizations could push it over.`;
    } else if (status === "below") {
      insight = `${m.name} is below target (${m.current!.toFixed(1)}% vs ${m.target}% target). Review content hooks and posting strategy for this metric.`;
    } else {
      insight = `${m.name} is critically low (${m.current!.toFixed(1)}% vs ${m.target}% target). Immediate attention needed — this is limiting growth.`;
    }

    return { name: m.name, current: m.current, target: m.target, status, delta_pct: delta, insight };
  });

  const statuses = analyzed.map((m) => m.status).filter((s) => s !== "no_data");
  let overall: KPIAnalysis["overall_status"] = "on_track";
  if (statuses.length === 0) overall = "needs_attention";
  else if (statuses.every((s) => s === "exceeding")) overall = "exceeding";
  else if (statuses.some((s) => s === "critical")) overall = "critical";
  else if (statuses.filter((s) => s === "below" || s === "critical").length > statuses.length / 2)
    overall = "needs_attention";

  return { overall_status: overall, metrics: analyzed };
}

/* ── Episode Analysis ── */

function analyzeEpisodes(episodes: EpisodeWithMetrics[]): EpisodeAnalysis {
  const withViews = episodes.filter((e) => e.totals.views > 0);

  if (withViews.length === 0) {
    return {
      ranked: episodes.map((e, i) => ({
        rank: i + 1,
        episode_number: e.number,
        title: e.title,
        episode_type: e.episode_type,
        total_views: 0,
        engagement_rate: 0,
        share_rate: 0,
        comment_rate: 0,
        top_platform: null,
        insight: "No metrics data yet.",
      })),
      best_performer: null,
      worst_performer: null,
      breakout_candidates: [],
      content_insights: ["No episode data available yet. Metrics will populate as posts go live and data is recorded."],
    };
  }

  const ranked = [...withViews]
    .sort((a, b) => b.totals.views - a.totals.views)
    .map((e, i) => {
      // Find top platform for this episode
      const platformViews = new Map<string, number>();
      for (const p of e.posts) {
        if (p.latest_metrics) {
          const curr = platformViews.get(p.platform) ?? 0;
          platformViews.set(p.platform, curr + p.latest_metrics.views);
        }
      }
      let topPlatform: string | null = null;
      let topViews = 0;
      for (const [plat, views] of platformViews) {
        if (views > topViews) {
          topPlatform = plat;
          topViews = views;
        }
      }

      const avgViews = withViews.reduce((s, ep) => s + ep.totals.views, 0) / withViews.length;
      const viewsVsAvg = ((e.totals.views - avgViews) / avgViews) * 100;

      let insight = "";
      if (i === 0) {
        insight = `Top performer with ${formatNumber(e.totals.views)} views (${viewsVsAvg > 0 ? "+" : ""}${viewsVsAvg.toFixed(0)}% vs average).`;
        if (e.totals.share_rate > KPI_TARGETS.share_rate) {
          insight += ` High share rate (${e.totals.share_rate.toFixed(1)}%) — this content is being sent to friends.`;
        }
        if (e.totals.engagement_rate > 5) {
          insight += ` Strong engagement (${e.totals.engagement_rate.toFixed(1)}%) — audience is actively interacting.`;
        }
      } else if (i === withViews.length - 1 && withViews.length > 2) {
        insight = `Lowest performer with ${formatNumber(e.totals.views)} views (${viewsVsAvg.toFixed(0)}% vs average).`;
        if (e.totals.comment_rate > KPI_TARGETS.comment_rate) {
          insight += ` But comment rate is healthy (${e.totals.comment_rate.toFixed(1)}%) — smaller but engaged audience.`;
        }
      } else {
        insight = `${formatNumber(e.totals.views)} views, ${e.totals.engagement_rate.toFixed(1)}% engagement.`;
        if (e.totals.share_rate > KPI_TARGETS.share_rate * 1.5) {
          insight += ` Notably high share rate — content resonates beyond existing audience.`;
        }
      }

      if (topPlatform) {
        insight += ` Strongest on ${formatPlatform(topPlatform)}.`;
      }

      return {
        rank: i + 1,
        episode_number: e.number,
        title: e.title,
        episode_type: e.episode_type,
        total_views: e.totals.views,
        engagement_rate: e.totals.engagement_rate,
        share_rate: e.totals.share_rate,
        comment_rate: e.totals.comment_rate,
        top_platform: topPlatform,
        insight,
      };
    });

  // Also include episodes without views
  const noViews = episodes
    .filter((e) => e.totals.views === 0)
    .map((e, i) => ({
      rank: ranked.length + i + 1,
      episode_number: e.number,
      title: e.title,
      episode_type: e.episode_type,
      total_views: 0,
      engagement_rate: 0,
      share_rate: 0,
      comment_rate: 0,
      top_platform: null,
      insight: "No metrics data yet.",
    }));

  // Breakout candidates: high share rate or high engagement relative to views
  const breakouts = withViews
    .filter(
      (e) =>
        e.totals.share_rate > KPI_TARGETS.share_rate * 1.5 ||
        e.totals.engagement_rate > 8
    )
    .map((e) => e.title);

  // Content insights
  const contentInsights: string[] = [];
  const avgEngagement =
    withViews.reduce((s, e) => s + e.totals.engagement_rate, 0) / withViews.length;
  const avgShares =
    withViews.reduce((s, e) => s + e.totals.share_rate, 0) / withViews.length;

  if (avgShares > KPI_TARGETS.share_rate) {
    contentInsights.push(
      `Average share rate (${avgShares.toFixed(1)}%) exceeds target. The meme templates and shareable quotes are working.`
    );
  }

  const highCommentEps = withViews.filter(
    (e) => e.totals.comment_rate > KPI_TARGETS.comment_rate * 2
  );
  if (highCommentEps.length > 0) {
    contentInsights.push(
      `Episodes with highest comment engagement: ${highCommentEps.map((e) => `"${e.title}"`).join(", ")}. These topics spark debate — consider follow-up content.`
    );
  }

  return {
    ranked: [...ranked, ...noViews],
    best_performer: ranked.length > 0 ? ranked[0].title : null,
    worst_performer: ranked.length > 2 ? ranked[ranked.length - 1].title : null,
    breakout_candidates: breakouts,
    content_insights: contentInsights.length > 0
      ? contentInsights
      : ["Collect more data to generate content-specific insights."],
  };
}

/* ── Platform Analysis ── */

function analyzePlatforms(breakdown: PlatformBreakdown[]): PlatformAnalysis {
  if (breakdown.length === 0) {
    return {
      ranked: [],
      best_platform: null,
      cross_platform_insights: ["No platform data yet."],
    };
  }

  const ranked = breakdown.map((p) => {
    const totalEngagement = p.likes + p.comments + p.shares + p.saves;
    const engRate = p.views > 0 ? (totalEngagement / p.views) * 100 : 0;
    const shareRate = p.views > 0 ? (p.shares / p.views) * 100 : 0;
    const avgViewsPerPost = p.post_count > 0 ? p.views / p.post_count : 0;

    let insight = `${formatNumber(p.views)} total views across ${p.post_count} posts (${formatNumber(avgViewsPerPost)} avg/post).`;
    if (shareRate > KPI_TARGETS.share_rate) {
      insight += ` Strong share rate (${shareRate.toFixed(1)}%) — content is spreading organically here.`;
    }
    if (engRate > 5) {
      insight += ` High engagement (${engRate.toFixed(1)}%) — audience is active.`;
    }

    return {
      platform: formatPlatform(p.platform),
      views: p.views,
      engagement_rate: engRate,
      share_rate: shareRate,
      avg_views_per_post: avgViewsPerPost,
      post_count: p.post_count,
      insight,
    };
  });

  const cross: string[] = [];
  if (ranked.length >= 2) {
    const [first, second] = ranked;
    if (first.views > second.views * 2) {
      cross.push(
        `${first.platform} is driving ${((first.views / (first.views + second.views)) * 100).toFixed(0)}% of total views. Consider whether other platforms need adjusted hooks or posting times.`
      );
    }

    const highEngPlatform = [...ranked].sort(
      (a, b) => b.engagement_rate - a.engagement_rate
    )[0];
    if (highEngPlatform.platform !== ranked[0].platform) {
      cross.push(
        `${highEngPlatform.platform} has the highest engagement rate (${highEngPlatform.engagement_rate.toFixed(1)}%) despite not being the top view driver. The audience there is more engaged — prioritize community building on this platform.`
      );
    }
  }

  return {
    ranked,
    best_platform: ranked.length > 0 ? ranked[0].platform : null,
    cross_platform_insights: cross.length > 0 ? cross : ["Cross-platform comparison needs more data."],
  };
}

/* ── Content Type Analysis ── */

function analyzeContentTypes(episodes: EpisodeWithMetrics[]): ContentTypeAnalysis {
  const typeMap = new Map<
    string,
    { views: number[]; engagement: number[]; shares: number[]; count: number }
  >();

  for (const ep of episodes) {
    const type = ep.episode_type ?? "unknown";
    if (!typeMap.has(type)) {
      typeMap.set(type, { views: [], engagement: [], shares: [], count: 0 });
    }
    const entry = typeMap.get(type)!;
    if (ep.totals.views > 0) {
      entry.views.push(ep.totals.views);
      entry.engagement.push(ep.totals.engagement_rate);
      entry.shares.push(ep.totals.share_rate);
    }
    entry.count++;
  }

  const byType = Array.from(typeMap.entries()).map(([type, data]) => {
    const avg = (arr: number[]) => (arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
    const avgViews = avg(data.views);
    const avgEng = avg(data.engagement);
    const avgShare = avg(data.shares);

    let insight = "";
    if (data.views.length === 0) {
      insight = "No metrics data yet for this content type.";
    } else {
      insight = `${data.views.length} episodes with data. Avg ${formatNumber(avgViews)} views, ${avgEng.toFixed(1)}% engagement, ${avgShare.toFixed(1)}% share rate.`;
      if (avgShare > KPI_TARGETS.share_rate) {
        insight += ` Share rate above target — this type travels well.`;
      }
    }

    return {
      type,
      episode_count: data.count,
      avg_views: Math.round(avgViews),
      avg_engagement_rate: Number(avgEng.toFixed(2)),
      avg_share_rate: Number(avgShare.toFixed(2)),
      insight,
    };
  });

  // Sort by avg views descending
  byType.sort((a, b) => b.avg_views - a.avg_views);

  let recommendation = "Collect more data to determine optimal content mix.";
  const withData = byType.filter((t) => t.avg_views > 0);
  if (withData.length >= 2) {
    const topType = withData[0];
    const topShareType = [...withData].sort((a, b) => b.avg_share_rate - a.avg_share_rate)[0];

    if (topType.type === topShareType.type) {
      recommendation = `"${topType.type}" content is leading in both views and shares. Lean into this format for growth.`;
    } else {
      recommendation = `"${topType.type}" drives the most views, but "${topShareType.type}" has the highest share rate. Use ${topType.type} for reach and ${topShareType.type} for organic growth.`;
    }
  }

  return { by_type: byType, recommendation };
}

/* ── Trend Analysis ── */

function analyzeTrends(dailyTrend: DailyTrend[], accountHistory: AccountDaily[]): TrendAnalysis {
  if (dailyTrend.length < 2) {
    return {
      direction: "insufficient_data",
      views_trend: "Not enough daily data to determine trends.",
      engagement_trend: "Not enough daily data to determine trends.",
      follower_trend: "Not enough daily data to determine trends.",
      daily_insights: ["Need at least 2 days of data to analyze trends."],
    };
  }

  // Simple trend: compare first half to second half
  const mid = Math.floor(dailyTrend.length / 2);
  const firstHalf = dailyTrend.slice(0, mid);
  const secondHalf = dailyTrend.slice(mid);

  const avgViews = (arr: DailyTrend[]) =>
    arr.reduce((s, d) => s + d.views, 0) / arr.length;
  const avgEng = (arr: DailyTrend[]) =>
    arr.reduce((s, d) => s + d.engagement_rate, 0) / arr.length;

  const viewsFirst = avgViews(firstHalf);
  const viewsSecond = avgViews(secondHalf);
  const engFirst = avgEng(firstHalf);
  const engSecond = avgEng(secondHalf);

  const viewsChange = viewsFirst > 0 ? ((viewsSecond - viewsFirst) / viewsFirst) * 100 : 0;
  const engChange = engFirst > 0 ? ((engSecond - engFirst) / engFirst) * 100 : 0;

  let direction: TrendAnalysis["direction"] = "stable";
  if (viewsChange > 15) direction = "growing";
  else if (viewsChange < -15) direction = "declining";

  const viewsTrend =
    viewsChange > 0
      ? `Views trending up ${viewsChange.toFixed(0)}% (${formatNumber(viewsFirst)} → ${formatNumber(viewsSecond)} daily avg). Growth momentum is building.`
      : viewsChange < -10
        ? `Views trending down ${Math.abs(viewsChange).toFixed(0)}% (${formatNumber(viewsFirst)} → ${formatNumber(viewsSecond)} daily avg). Check if posting consistency dropped or if hooks need refreshing.`
        : `Views are stable around ${formatNumber(viewsSecond)} daily avg. Consistent but look for breakout opportunities.`;

  const engTrend =
    engChange > 10
      ? `Engagement trending up ${engChange.toFixed(0)}%. Audience is becoming more active — community is forming.`
      : engChange < -10
        ? `Engagement trending down ${Math.abs(engChange).toFixed(0)}%. Content may be reaching new viewers who are less engaged, or hooks are losing impact.`
        : `Engagement is stable at ${engSecond.toFixed(1)}%.`;

  // Follower trend
  let followerTrend = "No follower tracking data yet.";
  if (accountHistory.length >= 2) {
    const latest = accountHistory[accountHistory.length - 1];
    const totalNewFollowers = accountHistory.reduce((s, a) => s + a.new_followers, 0);
    followerTrend = `${totalNewFollowers} new followers tracked. Latest count: ${latest.followers}.`;
  }

  // Peak days
  const insights: string[] = [];
  const peakDay = dailyTrend.reduce((max, d) => (d.views > max.views ? d : max), dailyTrend[0]);
  insights.push(`Peak day: ${peakDay.date} with ${formatNumber(peakDay.views)} views.`);

  const peakEngDay = dailyTrend.reduce(
    (max, d) => (d.engagement_rate > max.engagement_rate ? d : max),
    dailyTrend[0]
  );
  if (peakEngDay.date !== peakDay.date) {
    insights.push(
      `Highest engagement day: ${peakEngDay.date} (${peakEngDay.engagement_rate.toFixed(1)}%) — different from peak view day. High-view content may reach casual viewers while peak engagement days indicate super-fan activity.`
    );
  }

  return {
    direction,
    views_trend: viewsTrend,
    engagement_trend: engTrend,
    follower_trend: followerTrend,
    daily_insights: insights,
  };
}

/* ── Recommendations ── */

function generateRecommendations(
  kpis: KPIAnalysis,
  episodes: EpisodeAnalysis,
  platforms: PlatformAnalysis,
  contentTypes: ContentTypeAnalysis,
  trends: TrendAnalysis,
  kpiReport: KPIReport
): Recommendation[] {
  const recs: Recommendation[] = [];

  // KPI-based recommendations
  for (const m of kpis.metrics) {
    if (m.status === "critical") {
      if (m.name === "Share Rate") {
        recs.push({
          priority: "high",
          category: "content",
          title: "Boost share rate — content isn't traveling",
          detail:
            "Share rate is below target. Review meme templates and quote graphics — are they getting posted? Test more provocative hooks, hot takes, and 'tag someone who...' CTAs. The carousel and meme assets exist for this exact purpose.",
          based_on: `Share rate: ${m.current?.toFixed(1)}% vs ${m.target}% target`,
        });
      }
      if (m.name === "Comment Rate") {
        recs.push({
          priority: "high",
          category: "engagement",
          title: "Drive comments — audience isn't talking",
          detail:
            "Comment rate is low. Pin comments with direct questions. Reply to every comment in character during the first 60 minutes. Use poll/quiz stickers in Stories. The 'which one are you' debates (Pepper vs Sage) should be seeded in pin comments.",
          based_on: `Comment rate: ${m.current?.toFixed(1)}% vs ${m.target}% target`,
        });
      }
      if (m.name === "Average Watch Time") {
        recs.push({
          priority: "high",
          category: "content",
          title: "Improve watch time — viewers are dropping off",
          detail:
            "Average watch time is below target. The opening hook needs to be stronger — viewers decide in the first 1-2 seconds. Consider reordering content so the most compelling line opens the video. Test shorter cuts if current videos exceed 45 seconds.",
          based_on: `Avg watch time: ${m.current?.toFixed(1)}% vs ${m.target}% target`,
        });
      }
    }
    if (m.status === "below") {
      if (m.name === "Follower Conversion") {
        recs.push({
          priority: "medium",
          category: "growth",
          title: "Profile visits aren't converting to follows",
          detail:
            "People are visiting the profile but not following. Check: Is the bio clear? Is the pinned post the strongest video? Is the profile pic readable at thumbnail size? Add 'new episode every morning' to bio if not already there.",
          based_on: `Follower conversion: ${m.current?.toFixed(1)}% vs ${m.target}% target`,
        });
      }
    }
  }

  // Episode-based recommendations
  if (episodes.breakout_candidates.length > 0) {
    recs.push({
      priority: "high",
      category: "content",
      title: `Double down on breakout content: ${episodes.breakout_candidates.join(", ")}`,
      detail:
        "These episodes have exceptional share/engagement rates. Create follow-up content in the same tone. Reshare as Stories with 'in case you missed this one' framing. Use the best quotes as standalone graphics. If one of these is a hot take, plan more hot takes.",
      based_on: "Episodes with share rate >3% or engagement >8%",
    });
  }

  if (episodes.worst_performer && episodes.best_performer) {
    recs.push({
      priority: "medium",
      category: "content",
      title: "Compare top and bottom performers",
      detail:
        `"${episodes.best_performer}" outperformed "${episodes.worst_performer}". Compare: hook strength, topic universality, emotional range, and which had stronger social assets. The gap tells you what the audience wants more of.`,
      based_on: "Episode performance ranking",
    });
  }

  // Platform recommendations
  if (platforms.ranked.length >= 2) {
    const weakPlatform = platforms.ranked[platforms.ranked.length - 1];
    if (weakPlatform.views > 0 && platforms.ranked[0].views > weakPlatform.views * 3) {
      recs.push({
        priority: "medium",
        category: "platform",
        title: `${weakPlatform.platform} is underperforming`,
        detail:
          `${weakPlatform.platform} has significantly fewer views than other platforms. Check: Are posts going up on time? Are captions/hashtags optimized for that platform? Each platform has different audience behavior — TikTok favors early morning posts, IG favors afternoon, YouTube favors consistent upload schedule.`,
        based_on: `${weakPlatform.platform}: ${formatNumber(weakPlatform.views)} views vs ${formatNumber(platforms.ranked[0].views)} on ${platforms.ranked[0].platform}`,
      });
    }
  }

  // Trend recommendations
  if (trends.direction === "declining") {
    recs.push({
      priority: "high",
      category: "growth",
      title: "Views are declining — check consistency and hooks",
      detail:
        "View counts are trending down. Common causes: missed posting schedule, weaker hooks in recent episodes, algorithm deprioritizing after initial boost. Ensure the 5-touchpoint daily stagger is being maintained and that the strongest hook opens each video.",
      based_on: trends.views_trend,
    });
  }

  // General engagement recommendation
  if (kpiReport.total_views > 0 && kpiReport.total_posts > 0) {
    recs.push({
      priority: "low",
      category: "engagement",
      title: "Maintain the comment reply cadence",
      detail:
        "Every reply to a comment counts as engagement on the post. Stay in character — Pepper (CAPS, emoji, energy) and Sage (short, dry, period). The first 60 minutes after posting are critical. Reply to everything.",
      based_on: "Standard engagement protocol",
    });
  }

  return recs;
}

/* ── Alerts ── */

function generateAlerts(
  kpis: KPIAnalysis,
  kpiReport: KPIReport,
  episodes: EpisodeWithMetrics[]
): Alert[] {
  const alerts: Alert[] = [];

  if (kpiReport.total_views === 0 && kpiReport.total_posts === 0) {
    alerts.push({
      severity: "info",
      message: "No metrics recorded yet. Log posts and record their metrics to start tracking.",
    });
  }

  const criticalKPIs = kpis.metrics.filter((m) => m.status === "critical");
  for (const m of criticalKPIs) {
    alerts.push({
      severity: "critical",
      message: `${m.name} is critically below target: ${m.current?.toFixed(1)}% vs ${m.target}% target.`,
    });
  }

  // Check for episodes without posts
  const noPostEpisodes = episodes.filter((e) => e.posts.length === 0);
  if (noPostEpisodes.length > 0) {
    const titles = noPostEpisodes.map((e) => `"${e.title}"`).join(", ");
    alerts.push({
      severity: "warning",
      message: `${noPostEpisodes.length} episodes have no posts logged: ${titles}. Log posts to start tracking.`,
    });
  }

  // Check for posts without metrics
  const noMetricPosts = episodes
    .flatMap((e) => e.posts)
    .filter((p) => !p.latest_metrics);
  if (noMetricPosts.length > 0) {
    alerts.push({
      severity: "info",
      message: `${noMetricPosts.length} posts have no metrics recorded yet. Record initial metrics 24 hours after posting.`,
    });
  }

  return alerts;
}

/* ── Health Score ── */

function calculateHealthScore(
  kpis: KPIAnalysis,
  episodes: EpisodeAnalysis,
  trends: TrendAnalysis
): number {
  let score = 50; // Baseline

  // KPI performance (up to ±30 points)
  for (const m of kpis.metrics) {
    if (m.status === "exceeding") score += 8;
    else if (m.status === "on_track") score += 4;
    else if (m.status === "below") score -= 4;
    else if (m.status === "critical") score -= 8;
  }

  // Episode spread (up to ±10 points)
  const withViews = episodes.ranked.filter((e) => e.total_views > 0);
  if (withViews.length > 0) {
    const views = withViews.map((e) => e.total_views);
    const maxView = Math.max(...views);
    const minView = Math.min(...views);
    // Good if spread isn't too extreme (all episodes performing, not just one viral hit)
    const spreadRatio = maxView > 0 ? minView / maxView : 0;
    score += Math.round(spreadRatio * 10);
  }

  // Trend (up to ±10 points)
  if (trends.direction === "growing") score += 10;
  else if (trends.direction === "declining") score -= 10;
  else if (trends.direction === "stable") score += 3;

  return Math.max(0, Math.min(100, score));
}

/* ── Summary Generator ── */

function generateSummary(
  show: Show,
  healthScore: number,
  kpiReport: KPIReport,
  episodes: EpisodeAnalysis,
  platforms: PlatformAnalysis,
  trends: TrendAnalysis
): string {
  const parts: string[] = [];

  parts.push(`## ${show.name} — Analytics Summary`);
  parts.push(`**Health Score: ${healthScore}/100**`);
  parts.push("");

  if (kpiReport.total_views === 0) {
    parts.push(
      "No performance data recorded yet. The show is set up with " +
        `${kpiReport.total_episodes} episodes loaded. Start logging posts and recording metrics to begin tracking.`
    );
    return parts.join("\n");
  }

  parts.push(
    `**Total Views:** ${formatNumber(kpiReport.total_views)} across ${kpiReport.total_posts} posts and ${kpiReport.total_episodes} episodes.`
  );

  if (kpiReport.total_followers > 0) {
    parts.push(`**Followers:** ${formatNumber(kpiReport.total_followers)}`);
  }

  if (episodes.best_performer) {
    parts.push(`**Top Episode:** "${episodes.best_performer}"`);
  }

  if (platforms.best_platform) {
    parts.push(`**Top Platform:** ${platforms.best_platform}`);
  }

  parts.push("");
  parts.push(`**Trend:** ${trends.views_trend}`);
  parts.push("");

  if (episodes.breakout_candidates.length > 0) {
    parts.push(
      `**Breakout Content:** ${episodes.breakout_candidates.map((t) => `"${t}"`).join(", ")} — high share rates indicate viral potential. Double down on this style.`
    );
  }

  return parts.join("\n");
}

/* ── Text Report Generator (for Claude consumption) ── */

export function generateTextReport(analysis: FullAnalysis): string {
  const lines: string[] = [];

  lines.push("═".repeat(60));
  lines.push(`  ${analysis.show.name.toUpperCase()} — PERFORMANCE ANALYSIS`);
  lines.push(`  Generated: ${new Date(analysis.generated_at).toLocaleString()}`);
  lines.push("═".repeat(60));
  lines.push("");
  lines.push(analysis.summary);
  lines.push("");

  // Alerts
  if (analysis.alerts.length > 0) {
    lines.push("─".repeat(40));
    lines.push("ALERTS");
    lines.push("─".repeat(40));
    for (const alert of analysis.alerts) {
      const icon = alert.severity === "critical" ? "[!!]" : alert.severity === "warning" ? "[!]" : "[i]";
      lines.push(`${icon} ${alert.message}`);
    }
    lines.push("");
  }

  // KPIs
  lines.push("─".repeat(40));
  lines.push("KPI PERFORMANCE");
  lines.push("─".repeat(40));
  lines.push(`Overall Status: ${analysis.kpis.overall_status.toUpperCase()}`);
  lines.push("");
  for (const m of analysis.kpis.metrics) {
    const val = m.current !== null ? `${m.current.toFixed(1)}%` : "N/A";
    const bar = m.status === "exceeding" ? "[+++]" : m.status === "on_track" ? "[++ ]" : m.status === "below" ? "[+  ]" : m.status === "critical" ? "[   ]" : "[---]";
    lines.push(`  ${bar} ${m.name}: ${val} (target: ${m.target}%)`);
    lines.push(`       ${m.insight}`);
  }
  lines.push("");

  // Episodes
  if (analysis.episodes.ranked.some((e) => e.total_views > 0)) {
    lines.push("─".repeat(40));
    lines.push("EPISODE RANKINGS");
    lines.push("─".repeat(40));
    for (const ep of analysis.episodes.ranked) {
      if (ep.total_views > 0) {
        lines.push(
          `  #${ep.rank} EP${ep.episode_number}: "${ep.title}" [${ep.episode_type ?? "?"}]`
        );
        lines.push(
          `     Views: ${formatNumber(ep.total_views)} | Eng: ${ep.engagement_rate.toFixed(1)}% | Share: ${ep.share_rate.toFixed(1)}% | Comment: ${ep.comment_rate.toFixed(1)}%`
        );
        lines.push(`     ${ep.insight}`);
      }
    }
    lines.push("");

    if (analysis.episodes.content_insights.length > 0) {
      lines.push("Content Insights:");
      for (const insight of analysis.episodes.content_insights) {
        lines.push(`  → ${insight}`);
      }
      lines.push("");
    }
  }

  // Platforms
  if (analysis.platforms.ranked.length > 0) {
    lines.push("─".repeat(40));
    lines.push("PLATFORM BREAKDOWN");
    lines.push("─".repeat(40));
    for (const p of analysis.platforms.ranked) {
      if (p.views > 0) {
        lines.push(`  ${p.platform}`);
        lines.push(
          `    Views: ${formatNumber(p.views)} | Posts: ${p.post_count} | Avg/Post: ${formatNumber(p.avg_views_per_post)} | Eng: ${p.engagement_rate.toFixed(1)}% | Share: ${p.share_rate.toFixed(1)}%`
        );
        lines.push(`    ${p.insight}`);
      }
    }
    if (analysis.platforms.cross_platform_insights.length > 0) {
      lines.push("");
      for (const insight of analysis.platforms.cross_platform_insights) {
        lines.push(`  → ${insight}`);
      }
    }
    lines.push("");
  }

  // Content Types
  if (analysis.content_types.by_type.some((t) => t.avg_views > 0)) {
    lines.push("─".repeat(40));
    lines.push("CONTENT TYPE ANALYSIS");
    lines.push("─".repeat(40));
    for (const t of analysis.content_types.by_type) {
      if (t.avg_views > 0) {
        lines.push(
          `  ${t.type}: ${t.episode_count} eps | Avg Views: ${formatNumber(t.avg_views)} | Eng: ${t.avg_engagement_rate}% | Share: ${t.avg_share_rate}%`
        );
        lines.push(`    ${t.insight}`);
      }
    }
    lines.push(`\n  Recommendation: ${analysis.content_types.recommendation}`);
    lines.push("");
  }

  // Trends
  if (analysis.trends.direction !== "insufficient_data") {
    lines.push("─".repeat(40));
    lines.push("TRENDS");
    lines.push("─".repeat(40));
    lines.push(`  Direction: ${analysis.trends.direction.toUpperCase()}`);
    lines.push(`  Views: ${analysis.trends.views_trend}`);
    lines.push(`  Engagement: ${analysis.trends.engagement_trend}`);
    lines.push(`  Followers: ${analysis.trends.follower_trend}`);
    for (const d of analysis.trends.daily_insights) {
      lines.push(`  → ${d}`);
    }
    lines.push("");
  }

  // Recommendations
  if (analysis.recommendations.length > 0) {
    lines.push("─".repeat(40));
    lines.push("RECOMMENDATIONS");
    lines.push("─".repeat(40));
    const sortedRecs = [...analysis.recommendations].sort((a, b) => {
      const order = { high: 0, medium: 1, low: 2 };
      return order[a.priority] - order[b.priority];
    });
    for (const rec of sortedRecs) {
      const tag = rec.priority === "high" ? "[HIGH]" : rec.priority === "medium" ? "[MED]" : "[LOW]";
      lines.push(`\n  ${tag} ${rec.title}`);
      lines.push(`  ${rec.detail}`);
      lines.push(`  (Based on: ${rec.based_on})`);
    }
    lines.push("");
  }

  lines.push("═".repeat(60));
  lines.push("END OF REPORT");
  lines.push("═".repeat(60));

  return lines.join("\n");
}
