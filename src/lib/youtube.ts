export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
}

/**
 * Fetch latest videos from a YouTube channel using the Data API v3.
 *
 * Flow: resolve handle → get uploads playlist → list latest items.
 * Results are cached via Next.js revalidation (ISR).
 */
export async function getLatestVideos(
  handle: string, // e.g. "@dnnshow"
  count = 8
): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return [];

  try {
    // 1. Resolve handle to channel ID
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?forHandle=${handle}&part=contentDetails&key=${apiKey}`,
      { next: { revalidate: 3600 } } // cache 1 hour
    );
    if (!channelRes.ok) return [];
    const channelData = await channelRes.json();
    const uploadsPlaylistId =
      channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) return [];

    // 2. Fetch latest uploads
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${uploadsPlaylistId}&part=snippet&maxResults=${count}&key=${apiKey}`,
      { next: { revalidate: 3600 } } // cache 1 hour
    );
    if (!playlistRes.ok) return [];
    const playlistData = await playlistRes.json();

    // 3. Map to our shape
    return (playlistData.items ?? []).map(
      (item: {
        snippet: {
          resourceId: { videoId: string };
          title: string;
          thumbnails: {
            high?: { url: string };
            medium?: { url: string };
            default?: { url: string };
          };
          publishedAt: string;
        };
      }) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail:
          item.snippet.thumbnails.high?.url ??
          item.snippet.thumbnails.medium?.url ??
          item.snippet.thumbnails.default?.url ??
          "",
        publishedAt: item.snippet.publishedAt,
        url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      })
    );
  } catch (err) {
    console.error("YouTube fetch error:", err);
    return [];
  }
}
