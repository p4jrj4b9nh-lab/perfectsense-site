import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/analytics/auth";
import { getShowBySlug, upsertAccountDaily, getAccountHistory } from "@/lib/analytics/db";

export async function GET(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const slug = req.nextUrl.searchParams.get("show");
  const platform = req.nextUrl.searchParams.get("platform") ?? undefined;

  if (!slug) {
    return NextResponse.json({ error: "Missing 'show' query param" }, { status: 400 });
  }

  try {
    const show = await getShowBySlug(slug);
    if (!show) {
      return NextResponse.json({ error: "Show not found" }, { status: 404 });
    }

    const history = await getAccountHistory(show.id, platform);
    return NextResponse.json(history);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  try {
    const { show_slug, platform, date, followers, new_followers, profile_visits } =
      await req.json();

    if (!show_slug || !platform || !date || followers == null) {
      return NextResponse.json(
        { error: "Missing required fields: show_slug, platform, date, followers" },
        { status: 400 }
      );
    }

    const show = await getShowBySlug(show_slug);
    if (!show) {
      return NextResponse.json({ error: "Show not found" }, { status: 404 });
    }

    const record = await upsertAccountDaily({
      show_id: show.id,
      platform,
      date,
      followers,
      new_followers,
      profile_visits,
    });

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
