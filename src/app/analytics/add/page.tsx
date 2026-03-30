"use client";

import { useState, useEffect, useCallback } from "react";
import type { Episode, Post, Platform, AssetType } from "@/lib/analytics/types";
import { SHOWS } from "@/lib/analytics/types";

const PLATFORMS: Platform[] = [
  "tiktok",
  "instagram_reels",
  "instagram_feed",
  "instagram_stories",
  "youtube_shorts",
];

const ASSET_TYPES: AssetType[] = [
  "video",
  "carousel",
  "meme",
  "story",
  "quote_graphic",
];

const TABS = ["Log Post", "Record Metrics", "Account Stats"] as const;
type Tab = (typeof TABS)[number];

function platformLabel(p: string): string {
  const map: Record<string, string> = {
    tiktok: "TikTok",
    instagram_reels: "IG Reels",
    instagram_feed: "IG Feed",
    instagram_stories: "IG Stories",
    youtube_shorts: "YT Shorts",
  };
  return map[p] || p;
}

export default function AddDataPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Log Post");
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // Shared selections
  const [selectedShowSlug, setSelectedShowSlug] = useState<string>("");
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<number | "">("");
  const [selectedPostId, setSelectedPostId] = useState<number | "">("");

  // Post form
  const [postPlatform, setPostPlatform] = useState<Platform>("tiktok");
  const [postAssetType, setPostAssetType] = useState<AssetType>("video");
  const [postUrl, setPostUrl] = useState("");
  const [postDate, setPostDate] = useState("");

  // Metrics form
  const [metViews, setMetViews] = useState("");
  const [metLikes, setMetLikes] = useState("");
  const [metComments, setMetComments] = useState("");
  const [metShares, setMetShares] = useState("");
  const [metSaves, setMetSaves] = useState("");
  const [metWatch, setMetWatch] = useState("");

  // Account form
  const [accPlatform, setAccPlatform] = useState<string>("tiktok");
  const [accDate, setAccDate] = useState("");
  const [accFollowers, setAccFollowers] = useState("");
  const [accNewFollowers, setAccNewFollowers] = useState("");
  const [accVisits, setAccVisits] = useState("");

  // Load episodes when show changes
  const loadEpisodes = useCallback(async (slug: string) => {
    try {
      const res = await fetch(`/api/analytics/episodes?show=${slug}`);
      const data = await res.json();
      if (Array.isArray(data)) setEpisodes(data);
      else setEpisodes([]);
    } catch {
      setEpisodes([]);
    }
  }, []);

  useEffect(() => {
    if (selectedShowSlug) {
      loadEpisodes(selectedShowSlug);
      setSelectedEpisodeId("");
      setPosts([]);
      setSelectedPostId("");
    }
  }, [selectedShowSlug, loadEpisodes]);

  // Load posts when episode changes
  const loadPosts = useCallback(async (episodeId: number) => {
    try {
      const res = await fetch(`/api/analytics/posts?episode_id=${episodeId}`);
      const data = await res.json();
      if (Array.isArray(data)) setPosts(data);
      else setPosts([]);
    } catch {
      setPosts([]);
    }
  }, []);

  useEffect(() => {
    if (selectedEpisodeId) {
      loadPosts(selectedEpisodeId as number);
      setSelectedPostId("");
    }
  }, [selectedEpisodeId, loadPosts]);

  function clearMessage() {
    setTimeout(() => setMessage(null), 4000);
  }

  async function submitPost(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedEpisodeId) return;
    setLoading(true);

    try {
      const res = await fetch("/api/analytics/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          episode_id: selectedEpisodeId,
          platform: postPlatform,
          asset_type: postAssetType,
          external_url: postUrl || undefined,
          posted_at: postDate || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "Failed to create post" });
      } else {
        setMessage({ type: "success", text: "Post logged successfully" });
        setPostUrl("");
        setPostDate("");
        loadPosts(selectedEpisodeId as number);
      }
    } catch {
      setMessage({ type: "error", text: "Network error" });
    } finally {
      setLoading(false);
      clearMessage();
    }
  }

  async function submitMetrics(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedPostId) return;
    setLoading(true);

    try {
      const res = await fetch("/api/analytics/metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post_id: selectedPostId,
          views: parseInt(metViews) || 0,
          likes: parseInt(metLikes) || 0,
          comments: parseInt(metComments) || 0,
          shares: parseInt(metShares) || 0,
          saves: parseInt(metSaves) || 0,
          avg_watch_pct: metWatch ? parseFloat(metWatch) : undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "Failed to record metrics" });
      } else {
        setMessage({ type: "success", text: "Metrics recorded successfully" });
        setMetViews("");
        setMetLikes("");
        setMetComments("");
        setMetShares("");
        setMetSaves("");
        setMetWatch("");
      }
    } catch {
      setMessage({ type: "error", text: "Network error" });
    } finally {
      setLoading(false);
      clearMessage();
    }
  }

  async function submitAccount(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedShowSlug) return;
    setLoading(true);

    try {
      const res = await fetch("/api/analytics/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          show_slug: selectedShowSlug,
          platform: accPlatform,
          date: accDate,
          followers: parseInt(accFollowers) || 0,
          new_followers: parseInt(accNewFollowers) || 0,
          profile_visits: parseInt(accVisits) || 0,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "Failed to save account stats" });
      } else {
        setMessage({ type: "success", text: "Account stats saved successfully" });
        setAccFollowers("");
        setAccNewFollowers("");
        setAccVisits("");
      }
    } catch {
      setMessage({ type: "error", text: "Network error" });
    } finally {
      setLoading(false);
      clearMessage();
    }
  }

  const inputClass =
    "w-full px-3 py-2.5 bg-[#111] border border-white/10 rounded-lg text-white/80 font-[200] text-sm placeholder:text-white/20 focus:border-white/25 transition-colors";
  const labelClass =
    "text-[11px] uppercase tracking-[0.12em] text-white/40 font-[300] mb-1.5 block";
  const selectClass =
    "w-full px-3 py-2.5 bg-[#111] border border-white/10 rounded-lg text-white/80 font-[200] text-sm focus:border-white/25 transition-colors appearance-none";

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-[200] tracking-wide text-white/90 mb-1">
          Add Data
        </h1>
        <p className="text-sm font-[200] text-white/40">
          Log posts, record metrics, and track account stats
        </p>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1 bg-[#1a1a1a] rounded-lg p-1 border border-white/5">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setMessage(null);
            }}
            className={`flex-1 px-4 py-2 text-sm font-[200] rounded-md transition-colors ${
              activeTab === tab
                ? "bg-white/10 text-white/80"
                : "text-white/30 hover:text-white/50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Message */}
      {message && (
        <div
          className={`px-4 py-3 rounded-lg text-sm font-[200] ${
            message.type === "success"
              ? "bg-green-500/10 border border-green-500/20 text-green-400"
              : "bg-red-500/10 border border-red-500/20 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Show Selector (shared) */}
      <div>
        <label className={labelClass}>Show</label>
        <select
          value={selectedShowSlug}
          onChange={(e) => setSelectedShowSlug(e.target.value)}
          className={selectClass}
        >
          <option value="">Select a show...</option>
          {SHOWS.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* ─── Log Post ─── */}
      {activeTab === "Log Post" && (
        <form onSubmit={submitPost} className="space-y-5">
          <div>
            <label className={labelClass}>Episode</label>
            <select
              value={selectedEpisodeId}
              onChange={(e) =>
                setSelectedEpisodeId(
                  e.target.value ? parseInt(e.target.value) : ""
                )
              }
              className={selectClass}
            >
              <option value="">Select an episode...</option>
              {episodes.map((ep) => (
                <option key={ep.id} value={ep.id}>
                  #{ep.number} - {ep.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Platform</label>
              <select
                value={postPlatform}
                onChange={(e) => setPostPlatform(e.target.value as Platform)}
                className={selectClass}
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {platformLabel(p)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Asset Type</label>
              <select
                value={postAssetType}
                onChange={(e) => setPostAssetType(e.target.value as AssetType)}
                className={selectClass}
              >
                {ASSET_TYPES.map((a) => (
                  <option key={a} value={a}>
                    {a.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>URL (optional)</label>
            <input
              type="url"
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Posted At</label>
            <input
              type="datetime-local"
              value={postDate}
              onChange={(e) => setPostDate(e.target.value)}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !selectedEpisodeId}
            className="w-full py-3 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg text-white/70 font-[200] tracking-wide transition-colors disabled:opacity-30"
          >
            {loading ? "Saving..." : "Log Post"}
          </button>
        </form>
      )}

      {/* ─── Record Metrics ─── */}
      {activeTab === "Record Metrics" && (
        <form onSubmit={submitMetrics} className="space-y-5">
          <div>
            <label className={labelClass}>Episode</label>
            <select
              value={selectedEpisodeId}
              onChange={(e) =>
                setSelectedEpisodeId(
                  e.target.value ? parseInt(e.target.value) : ""
                )
              }
              className={selectClass}
            >
              <option value="">Select an episode...</option>
              {episodes.map((ep) => (
                <option key={ep.id} value={ep.id}>
                  #{ep.number} - {ep.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Post</label>
            <select
              value={selectedPostId}
              onChange={(e) =>
                setSelectedPostId(
                  e.target.value ? parseInt(e.target.value) : ""
                )
              }
              className={selectClass}
            >
              <option value="">Select a post...</option>
              {posts.map((p) => (
                <option key={p.id} value={p.id}>
                  {platformLabel(p.platform)} - {p.asset_type}
                  {p.posted_at
                    ? ` (${new Date(p.posted_at).toLocaleDateString()})`
                    : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Views</label>
              <input
                type="number"
                value={metViews}
                onChange={(e) => setMetViews(e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Likes</label>
              <input
                type="number"
                value={metLikes}
                onChange={(e) => setMetLikes(e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Comments</label>
              <input
                type="number"
                value={metComments}
                onChange={(e) => setMetComments(e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Shares</label>
              <input
                type="number"
                value={metShares}
                onChange={(e) => setMetShares(e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Saves</label>
              <input
                type="number"
                value={metSaves}
                onChange={(e) => setMetSaves(e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Avg Watch %</label>
              <input
                type="number"
                step="0.1"
                value={metWatch}
                onChange={(e) => setMetWatch(e.target.value)}
                placeholder="75.0"
                className={inputClass}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !selectedPostId}
            className="w-full py-3 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg text-white/70 font-[200] tracking-wide transition-colors disabled:opacity-30"
          >
            {loading ? "Saving..." : "Record Metrics"}
          </button>
        </form>
      )}

      {/* ─── Account Stats ─── */}
      {activeTab === "Account Stats" && (
        <form onSubmit={submitAccount} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Platform</label>
              <select
                value={accPlatform}
                onChange={(e) => setAccPlatform(e.target.value)}
                className={selectClass}
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {platformLabel(p)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Date</label>
              <input
                type="date"
                value={accDate}
                onChange={(e) => setAccDate(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Followers</label>
              <input
                type="number"
                value={accFollowers}
                onChange={(e) => setAccFollowers(e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>New Followers</label>
              <input
                type="number"
                value={accNewFollowers}
                onChange={(e) => setAccNewFollowers(e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Profile Visits</label>
              <input
                type="number"
                value={accVisits}
                onChange={(e) => setAccVisits(e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !selectedShowSlug || !accDate}
            className="w-full py-3 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg text-white/70 font-[200] tracking-wide transition-colors disabled:opacity-30"
          >
            {loading ? "Saving..." : "Save Account Stats"}
          </button>
        </form>
      )}
    </div>
  );
}
