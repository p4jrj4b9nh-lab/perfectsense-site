import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/analytics/auth";
import {
  getShowBySlug,
  getEpisodesByShow,
  getPostsByEpisode,
  createPost,
  addMetricSnapshot,
} from "@/lib/analytics/db";
import type { Platform } from "@/lib/analytics/types";

const YT_BASE = "https://www.googleapis.com/youtube/v3";
const PLATFORM: Platform = "youtube_shorts";

interface YTPlaylistItem {
  snippet: {
    title: string;
    resourceId: { videoId: string };
  };
}

interface YTVideoStats {
  id: string;
  statistics: {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
  };
}

export async function GET(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const slug = req.nextUrl.searchParams.get("show");
  if (!slug) {
    return NextResponse.json({ error: "Missing 'show' query param" }, { status: 400 });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "YOUTUBE_API_KEY not configured" }, { status: 500 });
  }

  try {
    const show = await getShowBySlug(slug);
    if (!show) {
      return NextResponse.json({ error: "Show not found" }, { status: 404 });
    }

    if (!show.youtube_handle) {
      return NextResponse.json({ error: "Show has no youtube_handle" }, { status: 400 });
    }

    // 1. Resolve handle to channel ID
    const channelRes = await fetch(
      `${YT_BASE}/channels?forHandle=${encodeURIComponent(show.youtube_handle)}&part=contentDetails&key=${apiKey}`
    );
    const channelData = await channelRes.json();
    const channel = channelData.items?.[0];
    if (!channel) {
      return NextResponse.json(
        { error: `Could not resolve YouTube handle: ${show.youtube_handle}` },
        { status: 404 }
      );
    }

    // 2. Get uploads playlist ID
    const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;

    // 3. Fetch latest videos from playlist
    const playlistRes = await fetch(
      `${YT_BASE}/playlistItems?playlistId=${uploadsPlaylistId}&part=snippet&maxResults=20&key=${apiKey}`
    );
    const playlistData = await playlistRes.json();
    const playlistItems: YTPlaylistItem[] = playlistData.items ?? [];

    if (playlistItems.length === 0) {
      return NextResponse.json({ message: "No videos found", synced: 0 });
    }

    // 4. Get detailed statistics for all videos (batch up to 50)
    const videoIds = playlistItems.map((item) => item.snippet.resourceId.videoId);
    const statsRes = await fetch(
      `${YT_BASE}/videos?id=${videoIds.join(",")}&part=statistics,contentDetails&key=${apiKey}`
    );
    const statsData = await statsRes.json();
    const videoStats: YTVideoStats[] = statsData.items ?? [];
    const statsMap = new Map(videoStats.map((v) => [v.id, v.statistics]));

    // 5. Match videos to existing episodes by title similarity
    const episodes = await getEpisodesByShow(show.id);

    const results: { video_title: string; episode_title: string; views: number }[] = [];
    const unmatched: string[] = [];

    for (const item of playlistItems) {
      const videoTitle = item.snippet.title;
      const videoId = item.snippet.resourceId.videoId;
      const stats = statsMap.get(videoId);

      // Fuzzy match: check if episode title appears in video title (case insensitive)
      const matchedEpisode = episodes.find((ep) =>
        videoTitle.toLowerCase().includes(ep.title.toLowerCase())
      );

      if (!matchedEpisode) {
        unmatched.push(videoTitle);
        continue;
      }

      // 6. Upsert post - check if post already exists for this episode+platform
      const existingPosts = await getPostsByEpisode(matchedEpisode.id);
      let post = existingPosts.find(
        (p) => p.platform === PLATFORM && p.external_id === videoId
      );

      if (!post) {
        // Also check by platform only (might exist without external_id)
        post = existingPosts.find((p) => p.platform === PLATFORM);
      }

      if (!post) {
        post = await createPost({
          episode_id: matchedEpisode.id,
          platform: PLATFORM,
          asset_type: "video",
          external_id: videoId,
          external_url: `https://youtube.com/shorts/${videoId}`,
        });
      }

      // 7. Add metric snapshot
      const views = Number(stats?.viewCount ?? 0);
      const likes = Number(stats?.likeCount ?? 0);
      const comments = Number(stats?.commentCount ?? 0);

      await addMetricSnapshot({
        post_id: post.id,
        views,
        likes,
        comments,
      });

      results.push({
        video_title: videoTitle,
        episode_title: matchedEpisode.title,
        views,
      });
    }

    return NextResponse.json({
      synced: results.length,
      unmatched: unmatched.length,
      results,
      unmatched_titles: unmatched,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
