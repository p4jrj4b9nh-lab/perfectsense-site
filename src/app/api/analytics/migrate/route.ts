import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/analytics/auth";
import { migrate, upsertShow, createEpisode, getShowBySlug, getEpisodesByShow } from "@/lib/analytics/db";
import { SHOWS, SSS_EPISODES } from "@/lib/analytics/types";

export async function POST(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  try {
    // Run migrations
    await migrate();

    // Seed shows
    const showResults: string[] = [];
    for (const show of SHOWS) {
      await upsertShow(show);
      showResults.push(show.slug);
    }

    // Seed SSS episodes
    const sssShow = await getShowBySlug("sss");
    let episodesCreated = 0;
    let episodesSkipped = 0;

    if (sssShow) {
      const existing = await getEpisodesByShow(sssShow.id);
      const existingNumbers = new Set(existing.map((e) => e.number));

      for (const ep of SSS_EPISODES) {
        if (existingNumbers.has(ep.number)) {
          episodesSkipped++;
          continue;
        }
        await createEpisode({
          show_id: sssShow.id,
          number: ep.number,
          title: ep.title,
          episode_type: ep.episode_type ?? undefined,
          launch_date: ep.launch_date ?? undefined,
        });
        episodesCreated++;
      }
    }

    return NextResponse.json({
      success: true,
      shows_upserted: showResults,
      sss_episodes_created: episodesCreated,
      sss_episodes_skipped: episodesSkipped,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
