import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/analytics/auth";
import { getMetricsHistory, addMetricSnapshot } from "@/lib/analytics/db";

export async function GET(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const postId = req.nextUrl.searchParams.get("post_id");
  if (!postId) {
    return NextResponse.json({ error: "Missing 'post_id' query param" }, { status: 400 });
  }

  try {
    const metrics = await getMetricsHistory(Number(postId));
    return NextResponse.json(metrics);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  try {
    const { post_id, views, likes, comments, shares, saves, avg_watch_pct, reach, impressions } =
      await req.json();

    if (!post_id) {
      return NextResponse.json({ error: "Missing required field: post_id" }, { status: 400 });
    }

    const snapshot = await addMetricSnapshot({
      post_id,
      views,
      likes,
      comments,
      shares,
      saves,
      avg_watch_pct,
      reach,
      impressions,
    });

    return NextResponse.json(snapshot, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  try {
    const { metrics } = await req.json();

    if (!Array.isArray(metrics) || metrics.length === 0) {
      return NextResponse.json(
        { error: "Body must contain a non-empty 'metrics' array" },
        { status: 400 }
      );
    }

    const results = [];
    for (const m of metrics) {
      if (!m.post_id) continue;
      const snapshot = await addMetricSnapshot({
        post_id: m.post_id,
        views: m.views,
        likes: m.likes,
        comments: m.comments,
        shares: m.shares,
        saves: m.saves,
        avg_watch_pct: m.avg_watch_pct,
      });
      results.push(snapshot);
    }

    return NextResponse.json({ updated: results.length, snapshots: results });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
