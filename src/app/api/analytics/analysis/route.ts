import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/analytics/auth";
import {
  getShowBySlug,
  getShows,
  getKPIReport,
  getPlatformBreakdown,
  getDailyTrend,
  getEpisodesWithMetrics,
  getAccountHistory,
} from "@/lib/analytics/db";
import { generateAnalysis, generateTextReport } from "@/lib/analytics/analyze";

/**
 * GET /api/analytics/analysis?show=sss&format=text|json
 *
 * Returns full performance analysis for a show.
 * format=text returns a human-readable report (ideal for Claude).
 * format=json returns structured data.
 *
 * If show=all, returns analyses for all active shows.
 */
export async function GET(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const showSlug = req.nextUrl.searchParams.get("show");
  const format = req.nextUrl.searchParams.get("format") ?? "text";

  try {
    if (showSlug === "all") {
      const shows = await getShows();
      const results: Record<string, string | object> = {};

      for (const show of shows) {
        const [kpiReport, platformBreakdown, dailyTrend, episodes, accountHistory] =
          await Promise.all([
            getKPIReport(show.id),
            getPlatformBreakdown(show.id),
            getDailyTrend(show.id),
            getEpisodesWithMetrics(show.id),
            getAccountHistory(show.id),
          ]);

        const analysis = generateAnalysis(
          show,
          kpiReport,
          platformBreakdown,
          dailyTrend,
          episodes,
          accountHistory
        );

        results[show.slug] = format === "text" ? generateTextReport(analysis) : analysis;
      }

      if (format === "text") {
        const combined = Object.values(results).join("\n\n\n");
        return new NextResponse(combined, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      }
      return NextResponse.json(results);
    }

    if (!showSlug) {
      return NextResponse.json(
        { error: "Missing show parameter. Use ?show=sss or ?show=all" },
        { status: 400 }
      );
    }

    const show = await getShowBySlug(showSlug);
    if (!show) {
      return NextResponse.json({ error: `Show '${showSlug}' not found` }, { status: 404 });
    }

    const [kpiReport, platformBreakdown, dailyTrend, episodes, accountHistory] =
      await Promise.all([
        getKPIReport(show.id),
        getPlatformBreakdown(show.id),
        getDailyTrend(show.id),
        getEpisodesWithMetrics(show.id),
        getAccountHistory(show.id),
      ]);

    const analysis = generateAnalysis(
      show,
      kpiReport,
      platformBreakdown,
      dailyTrend,
      episodes,
      accountHistory
    );

    if (format === "text") {
      const report = generateTextReport(analysis);
      return new NextResponse(report, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json({ error: "Failed to generate analysis" }, { status: 500 });
  }
}
