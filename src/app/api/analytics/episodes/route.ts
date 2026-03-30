import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/analytics/auth";
import { getShowBySlug, getEpisodesWithMetrics, createEpisode } from "@/lib/analytics/db";

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

    const episodes = await getEpisodesWithMetrics(show.id);
    return NextResponse.json(episodes);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  try {
    const { show_slug, number, title, episode_type, launch_date } = await req.json();

    if (!show_slug || number == null || !title) {
      return NextResponse.json(
        { error: "Missing required fields: show_slug, number, title" },
        { status: 400 }
      );
    }

    const show = await getShowBySlug(show_slug);
    if (!show) {
      return NextResponse.json({ error: "Show not found" }, { status: 404 });
    }

    const episode = await createEpisode({
      show_id: show.id,
      number,
      title,
      episode_type,
      launch_date,
    });

    return NextResponse.json(episode, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
