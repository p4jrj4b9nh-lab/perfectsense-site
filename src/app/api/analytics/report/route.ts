import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/analytics/auth";
import {
  getShowBySlug,
  getKPIReport,
  getPlatformBreakdown,
  getDailyTrend,
  getEpisodesWithMetrics,
} from "@/lib/analytics/db";
import type { ShowDashboard } from "@/lib/analytics/types";

export async function GET(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const slug = req.nextUrl.searchParams.get("show");
  if (!slug) {
    return NextResponse.json({ error: "Missing 'show' query param" }, { status: 400 });
  }

  try {
    const show = await getShowBySlug(slug);
    if (!show) {
      return NextResponse.json({ error: "Show not found" }, { status: 404 });
    }

    const [kpis, platform_breakdown, daily_trend, episodes] = await Promise.all([
      getKPIReport(show.id),
      getPlatformBreakdown(show.id),
      getDailyTrend(show.id),
      getEpisodesWithMetrics(show.id),
    ]);

    const dashboard: ShowDashboard = {
      show,
      episodes,
      kpis,
      platform_breakdown,
      daily_trend,
    };

    return NextResponse.json(dashboard);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
