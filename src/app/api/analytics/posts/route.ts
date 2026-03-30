import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/analytics/auth";
import { getPostsByEpisode, createPost } from "@/lib/analytics/db";

export async function GET(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const episodeId = req.nextUrl.searchParams.get("episode_id");
  if (!episodeId) {
    return NextResponse.json({ error: "Missing 'episode_id' query param" }, { status: 400 });
  }

  try {
    const posts = await getPostsByEpisode(Number(episodeId));
    return NextResponse.json(posts);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  try {
    const { episode_id, platform, asset_type, external_id, external_url, caption, posted_at } =
      await req.json();

    if (!episode_id || !platform || !asset_type) {
      return NextResponse.json(
        { error: "Missing required fields: episode_id, platform, asset_type" },
        { status: 400 }
      );
    }

    const post = await createPost({
      episode_id,
      platform,
      asset_type,
      external_id,
      external_url,
      caption,
      posted_at,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
